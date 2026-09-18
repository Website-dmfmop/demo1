# Production Root-Cause Diagnostic Report

**Target Domain:** `https://dmfmop.org`  
**Server IP:** `72.61.240.244`  
**Diagnosis Date:** September 18, 2026  
**Scope:** Investigation only — no code, database, or server state modifications were performed.

---

## Executive Summary

| Component / Issue | Status | Root Cause Summary |
| :--- | :--- | :--- |
| **Backend Service / API** | ❌ **502 Bad Gateway** | Node.js Express backend on port `5000` is stopped or crashing on startup. Nginx reverse proxy returns `502 Bad Gateway` for all `/api/*` requests. |
| **Admin Portal** | ❌ **Inaccessible** | `/admin` frontend loads, but login executes `POST /api/login` which fails with `502 Bad Gateway`. |
| **Media Page Images** | ❌ **Broken Images / Empty List** | 1. `GET /api/media` fails with `502 Bad Gateway`.<br>2. Uploaded items (`/uploads/*`) are proxied to Express, returning `502 Bad Gateway`.<br>3. Media files uploaded in development only exist on local developer disk (`.gitignore`), not on the server disk. |
| **Donation / ICOE Content** | ℹ️ **Deployed & Verified** | The production server **is running the latest code (`6f1ce96`)**. Any older content observed is strictly due to **browser caching** of `index.html`. |

---

## 1. Verify What Is Actually Deployed

* **Git Branch:** `main`
* **Latest GitHub Commit:** `6f1ce9601ee6672ce526ff7a08ee709afd680dc1` (*Update Donation account name to Dr. Dnyaneshwar Mule Foundation and support phone*)
* **Prior Major Commit:** `d7caa306397cd7011e6d317fac1a192f8ace0352` (*Update Donation page with official bank details and refocus ICOE on Foreign Languages and International Jobs*)
* **Live Served Asset:** `https://dmfmop.org/assets/index-BI6CmH56.js`
* **Verified Bundle Contents:**
  * Account Name: `Dr. Dnyaneshwar Mule Foundation` (**Confirmed Present**)
  * Account Number: `50200124275122` (**Confirmed Present**)
  * Support Phone: `+91 8999744563` (**Confirmed Present**)
  * Refocused ICOE Page: JLPT Framework, CEFR Framework, 2-Pillar Structure (**Confirmed Present**)
* **Deployment Disconnect:**
  * The frontend static bundle is deployed in `/var/www/dmfmop-frontend/` and served by Nginx.
  * The backend process (`/root/demo1/backend/server.js`) managed by PM2 is **down**, breaking all dynamic functionality.

---

## 2. Media Image Failure: Complete Flow & Trace

### Architecture
* Media metadata is stored in **MongoDB Atlas** (`mediaitems` collection).
* The collection currently contains **24 records**:
  * **15 records** reference static repository assets in `/Images/...` (e.g. `/Images/about_page_2.png`).
  * **9 records** reference user uploads in `/uploads/...` (e.g. `/uploads/1787219753751.JPG`).
* Image rendering logic in `src/pages/Media.jsx`:
  ```javascript
  src={item.src && item.src.startsWith('/uploads') ? `${API_URL}${item.src}` : item.src}
  ```
  In the deployed bundle, `API_URL` is `https://www.dmfmop.org`.

### Trace of Real Media Items

| Item Title | DB `src` Value | Generated URL | HTTP Status | Failure Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| *Guest Lecture in Bharati Vidyapeeth, Pune* | `/uploads/1787219753751.JPG` | `https://dmfmop.org/uploads/1787219753751.JPG` | **502 Bad Gateway** | Nginx proxies `/uploads/` to Node.js backend (`localhost:5000`), which is offline. |
| *Wheelchair Distribution to Swabhiman NGO* | `/uploads/1787219549513.jpeg` | `https://dmfmop.org/uploads/1787219549513.jpeg` | **502 Bad Gateway** | Backend offline; Nginx upstream connection refused. |
| *Wheelchair Distribution Drive* | `/uploads/1787206190451.jpeg` | `https://dmfmop.org/uploads/1787206190451.jpeg` | **502 Bad Gateway** | Backend offline; Nginx upstream connection refused. |
| *Medical Students Placed in Germany* | `/Images/about_page_2.png` | `https://dmfmop.org/Images/about_page_2.png` | **200 OK** | Static asset served directly by Nginx from `/var/www/dmfmop-frontend/Images/`. |

---

## 3. Media Storage Architecture

* **Storage Engine:** Local filesystem (`backend/uploads/`).
* **Disk Persistence:** Persistent Ubuntu disk on VPS `72.61.240.244`.
* **Deployment Isolation:**
  * `backend/uploads/` is included in `.gitignore`. Files uploaded in local development were never pushed to production.
  * The frontend deploy step `rm -rf /var/www/dmfmop-frontend/*` does not delete `/root/demo1/backend/uploads/`.
  * However, because `/uploads` is routed through Express static middleware (`fileRoutes.js`), a dead backend process breaks all upload URLs with `502 Bad Gateway`.

---

## 4. Admin Portal Investigation

* **Route:** `https://dmfmop.org/admin`
* **Component:** `src/pages/Admin.jsx`
* **Authentication Endpoint:** `POST https://dmfmop.org/api/login`
* **Backend Handler:** `router.post('/login', ...)` in `backend/routes/workspaceRoutes.js`
* **Live Test Findings:**
  1. Navigating to `/admin` successfully renders the login form (HTTP 200 SPA shell).
  2. Entering credentials and submitting sends a request to `https://dmfmop.org/api/login`.
  3. Response received: **HTTP 502 Bad Gateway**.
  4. Frontend catch block displays: `Login failed`.
  5. If an existing token is in `sessionStorage`, background calls to `/api/permissions`, `/api/admissions`, and `/api/courses` all return `502 Bad Gateway`.

---

## 5. Backend & API Availability

All production API endpoints return **502 Bad Gateway**:

* `GET /api/media` -> `502 Bad Gateway`
* `GET /api/videos` -> `502 Bad Gateway`
* `GET /api/publications` -> `502 Bad Gateway`
* `GET /api/press` -> `502 Bad Gateway`
* `POST /api/login` -> `502 Bad Gateway`
* `GET /api/permissions` -> `502 Bad Gateway`
* `GET /api/courses` -> `502 Bad Gateway`
* `GET /api/admissions` -> `502 Bad Gateway`
* `GET /api/jobs` -> `502 Bad Gateway`
* `GET /uploads/` -> `502 Bad Gateway`

---

## 6. Environment Variable Audit & Startup Crash Cause

### Why the Backend Process Crashes
In recent commits (`8049773` and `d04072a`), strict environment validation was added to the backend startup:

```javascript
// backend/config/env.js
const validateEnv = () => {
    if (!process.env.JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
        process.exit(1);
    }
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('FATAL ERROR: RECAPTCHA_SECRET_KEY environment variable is not set.');
        process.exit(1);
    }
    if (!process.env.MONGO_URI) {
        console.error('FATAL ERROR: MONGO_URI environment variable is not set.');
        process.exit(1);
    }
};
```

And in `backend/server.js`:
```javascript
require('dotenv').config({ override: true });
const { validateEnv } = require('./config/env');
validateEnv();
```

### Environment Variable Status

| Variable | Target File | Status | Note |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | `/root/demo1/.env` | ✅ Present | Compiled as `https://www.dmfmop.org`. |
| `VITE_RECAPTCHA_SITE_KEY` | `/root/demo1/.env` | ✅ Present | Documented in `deployment-steps.md`. |
| `RECAPTCHA_SECRET_KEY` | `/root/demo1/backend/.env` | ✅ Present | Documented in `deployment-steps.md`. |
| `MONGO_URI` | `/root/demo1/backend/.env` | ⚠️ **Likely Missing** | Not in deployment guide. Triggers `process.exit(1)`. |
| `JWT_SECRET` | `/root/demo1/backend/.env` | ⚠️ **Likely Missing** | Not in deployment guide. Triggers `process.exit(1)`. |
| `ALLOWED_ORIGINS` | `/root/demo1/backend/.env` | ⚠️ **Likely Missing** | Defaults to `http://localhost:5173`. Must include `https://dmfmop.org`. |
| `PORT` | `/root/demo1/backend/.env` | Defaults to `5000` | Matched to Nginx upstream proxy. |

---

## 7. Production Smoke Test Summary

| URL Path | Expected Type | Actual Status | Result |
| :--- | :--- | :--- | :--- |
| `/` | `text/html` | **200 OK** | Hero section and layout load cleanly. |
| `/media` | `text/html` | **200 OK** | SPA page renders; gallery empty due to API 502. |
| `/donate` | `text/html` | **200 OK** | Shows official bank details & QR code. |
| `/icoe` | `text/html` | **200 OK** | Shows 2-pillar structure (Languages & Jobs). |
| `/admin` | `text/html` | **200 OK** | Renders login modal; login fails with 502. |
| `/api/media` | `application/json` | **502 Bad Gateway** | Node.js backend offline. |
| `/api/login` | `application/json` | **502 Bad Gateway** | Node.js backend offline. |
| `/Images/about_page_2.png` | `image/png` | **200 OK** | Static asset served directly by Nginx (264 KB). |
| `/uploads/1787219753751.JPG` | `image/jpeg` | **502 Bad Gateway** | Proxied to offline backend. |

---

## 8. Categorized Diagnosis

### Confirmed Facts
1. The production frontend build **is up to date** (`6f1ce96`).
2. The production Node.js backend service **is completely offline**, causing Nginx to return `502 Bad Gateway` for all `/api/*` and `/uploads/*` requests.
3. The Admin portal failure is an availability failure of `/api/login`, not a UI bug or credential corruption.
4. Uploaded media items (`/uploads/*`) are served via Node.js static middleware, causing them to fail when Node.js is down.

### Highly Likely Causes
1. PM2 backend process crashed immediately upon startup due to missing `MONGO_URI` and `JWT_SECRET` in `/root/demo1/backend/.env`.
2. Any client-side perception of the "old Donation page" is due to browser caching of `index.html`.

### Items Requiring Server Verification
1. Output of `pm2 status` and `pm2 logs backend --lines 50` on the server.
2. Checking if `/root/demo1/backend/.env` contains the required database and secret keys.
3. Verifying if `/root/demo1/backend/uploads/` on the server contains the uploaded image files.

---

## 9. Recommended Fix Plan (Safest to Riskiest)

### Phase 1: Zero-Risk Backend Recovery
1. SSH into the server:
   ```bash
   ssh root@72.61.240.244
   ```
2. Check PM2 error logs:
   ```bash
   pm2 logs --lines 30
   ```
3. Edit `/root/demo1/backend/.env` to ensure all required variables are set:
   ```ini
   PORT=5000
   MONGO_URI=<Production_MongoDB_Atlas_URI>
   JWT_SECRET=<Production_JWT_Secret>
   RECAPTCHA_SECRET_KEY=6LdM_gYtAAAAAIHAAqAybhl-cz9uDBOberVA8cbW
   ALLOWED_ORIGINS=https://dmfmop.org,https://www.dmfmop.org,http://localhost:5173
   ```
4. Restart the backend process:
   ```bash
   cd /root/demo1/backend
   npm install
   pm2 restart all
   ```
5. Verify backend health:
   ```bash
   curl -I http://127.0.0.1:5000/api/media
   ```

### Phase 2: Validate Admin and Media Functionality
1. Re-test `https://dmfmop.org/api/media` (expect `200 OK`).
2. Log into the Admin portal (`https://dmfmop.org/admin`).

### Phase 3: Media File Verification & Alignment
1. Check if uploaded files exist in `/root/demo1/backend/uploads/`:
   ```bash
   ls -la /root/demo1/backend/uploads/
   ```
2. If files are missing, re-upload them through the Admin portal or seed with assets from `/public/Images/`.

### Phase 4: Browser Caching Mitigation
1. In Nginx configuration (`/etc/nginx/sites-available/dmfmop`), ensure `index.html` is served with:
   ```nginx
   add_header Cache-Control "no-cache, no-store, must-revalidate";
   ```
2. This ensures users always see the latest deployed build without needing a manual `Ctrl + Shift + R` hard refresh.
