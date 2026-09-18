# DMF Website - Production Deployment & Operations Guide

This guide documents the complete deployment workflow, environment requirements, safety mechanisms, and disaster recovery procedures for the **Dnyaneshwar Mulay Foundation (DMF)** production website (`https://dmfmop.org`).

---

## 1. System Architecture Overview

```
                      Internet (HTTPS)
                             │
                             ▼
                    Nginx Reverse Proxy
                     (Port 80 / 443)
                             │
        ┌────────────────────┴────────────────────┐
        ▼                                         ▼
Frontend Static SPA                      Express Backend API
/var/www/dmfmop-frontend/                http://127.0.0.1:5000
(Built React / Vite bundle)              (PM2 process: dmfmop-api)
                                                  │
                                                  ▼
                                            MongoDB Atlas
                                            (Cloud Database)
```

| Component | Production Location | Description |
|---|---|---|
| **Repository Root** | `/root/demo1` | Git repository workspace |
| **Backend Directory** | `/root/demo1/backend` | Node.js Express server |
| **Backend Config** | `/root/demo1/backend/.env` | Production secrets & environment variables (**Never commit**) |
| **Media Storage** | `/root/demo1/backend/uploads/` | Persistent uploaded images/documents (**Never delete**) |
| **Frontend Webroot** | `/var/www/dmfmop-frontend` | Static assets served by Nginx |
| **PM2 Process Name**| `dmfmop-api` | Managed background process for backend |
| **Local API Port** | `5000` | Listens on `127.0.0.1:5000` (internal only) |

---

## 2. Production Environment Requirements

The backend requires specific environment variables defined in `/root/demo1/backend/.env`.

### Environment Variables Matrix

| Variable | Required | Description | Example / Recommended Value |
|---|---|---|---|
| `PORT` | Optional | Port on which Express listens | `5000` (default) |
| `NODE_ENV` | Recommended | Environment flag | `production` |
| `MONGO_URI` | **YES** | MongoDB connection string | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/dmfmop?retryWrites=true&w=majority` |
| `JWT_SECRET` | **YES** | 256-bit cryptographic secret for admin tokens | 64-character hex string (generated via `openssl rand -hex 32`) |
| `RECAPTCHA_SECRET_KEY` | **YES** | Google reCAPTCHA server secret | Google reCAPTCHA Admin Console |
| `ALLOWED_ORIGINS` | **YES** | Comma-separated list of allowed origins | `https://dmfmop.org,https://www.dmfmop.org,http://localhost:5173` |

> [!IMPORTANT]
> **Strict Validation**: The backend will deliberately abort startup if `MONGO_URI`, `JWT_SECRET`, or `RECAPTCHA_SECRET_KEY` is missing or empty. If `ALLOWED_ORIGINS` is missing, production CORS requests will be blocked.

### How to Check Environment Variables Safely (Without Printing Secrets)

Run the preflight check on the server:

```bash
cd /root/demo1/backend
node scripts/preflight.js
```

**Expected output when valid:**
```
=== Production Environment Preflight ===

✓ PORT
✓ MONGO_URI
✓ JWT_SECRET
✓ RECAPTCHA_SECRET_KEY
✓ ALLOWED_ORIGINS

All required environment variables are present.
Deployment may proceed.
```

If any variable is missing, it will display `✗ <VARIABLE_NAME>` and exit with code `1`, preventing accidental restart with invalid configurations.

---

## 3. Automated Deployment (Recommended)

An automated deployment script `deploy.sh` is provided in the repository root. It executes the entire safe deployment lifecycle in order:

```
Production Preflight Check
           ↓
Check Git State (Fast-forward only)
           ↓
Fetch & Merge Latest Code
           ↓
Install Dependencies (Only if package.json changed)
           ↓
Build Frontend (npm run build)
           ↓
Restart Backend (pm2 restart dmfmop-api --update-env)
           ↓
Local Backend Health Check (http://127.0.0.1:5000/api/health)
           ↓
Deploy Frontend to /var/www/dmfmop-frontend
           ↓
Public Production Health Check (https://dmfmop.org/api/health)
           ↓
SUCCESS
```

### Running the Deployment Script

1. SSH into the production VPS:
   ```bash
   ssh root@72.61.240.244
   ```
2. Navigate to the project root:
   ```bash
   cd /root/demo1
   ```
3. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

*(If permissions need updating: `chmod +x deploy.sh`)*

---

## 4. Manual Deployment Workflow (Fallback)

If you ever need to perform manual deployment steps instead of using `deploy.sh`:

### Step 1: Verify Git Status & Untracked Files
```bash
cd /root/demo1
git status
```
Ensure `backend/.env` and `backend/uploads/` are untouched.

### Step 2: Fetch and Pull Code
```bash
git fetch origin main
git merge origin/main --ff-only
```

### Step 3: Run Preflight Check
```bash
cd /root/demo1/backend
node scripts/preflight.js
```
*Do not proceed if this check fails.*

### Step 4: Update Backend Dependencies & Restart
```bash
# If backend dependencies changed:
npm install --omit=dev

# Restart PM2 with updated environment variables
pm2 restart dmfmop-api --update-env
```

### Step 5: Verify Local Backend Health
```bash
curl -s http://127.0.0.1:5000/api/health
```
**Expected response (HTTP 200):**
```json
{"status":"ok","database":"connected","uptime":...,"timestamp":"..."}
```

### Step 6: Build and Deploy Frontend
```bash
cd /root/demo1

# If frontend dependencies changed:
npm install

# Build static bundle
npm run build

# Deploy to Nginx webroot
rm -rf /var/www/dmfmop-frontend/*
cp -a build/. /var/www/dmfmop-frontend/
```

### Step 7: Verify Public Health
```bash
curl -s https://dmfmop.org/api/health
```

---

## 5. Media & Upload Storage Protection

The DMF website allows administrators to upload news images, press releases, gallery photos, and student documents.

- **Storage Location**: `/root/demo1/backend/uploads/`
- **Subdirectories**:
  - `backend/uploads/public/`: Publicly viewable images and press clips.
  - `backend/uploads/private/`: Restricted files requiring admin authentication.
- **Git Protection**: `backend/uploads/` is explicitly listed in `.gitignore`. Git operations (`pull`, `merge`, `checkout`) will not overwrite or delete media.

> [!WARNING]
> **NEVER** run commands such as `rm -rf backend/uploads` or `git clean -fdx`.
> Back up the uploads directory periodically:
> ```bash
> tar -czvf /root/backup_uploads_$(date +%F).tar.gz /root/demo1/backend/uploads/
> ```

---

## 6. PM2 Startup & VPS Reboot Persistence

To ensure that `dmfmop-api` automatically starts if the VPS reboots or PM2 daemon crashes:

### Verifying Current PM2 Status
```bash
pm2 status
```
Confirm `dmfmop-api` is `online`.

### Configuring Reboot Persistence
Execute the following commands once on the server:

```bash
# 1. Save the currently running process list and environments
pm2 save

# 2. Generate and configure systemd startup hook
pm2 startup systemd
```
*(If `pm2 startup` displays a sudo/systemctl command, copy and run the exact command it outputs).*

### Safe Verification (Without Rebooting)
Check systemd service status:
```bash
systemctl status pm2-root
```
It should show `active (running)` or `enabled`.

---

## 7. Nginx Cache Configuration for `index.html`

To prevent browsers from caching old single-page application (SPA) bundles while allowing hashed JS/CSS assets to remain cached, verify the Nginx configuration.

### Recommended Nginx Server Block Configuration

Edit the Nginx site configuration file (typically `/etc/nginx/sites-available/dmfmop` or `/etc/nginx/conf.d/dmfmop.conf`):

```nginx
server {
    server_name dmfmop.org www.dmfmop.org;
    root /var/www/dmfmop-frontend;

    # Static Assets (Vite hashes filenames with content hashes)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # SPA Root & Fallback: Prevent aggressive caching of HTML
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Reverse Proxy for Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Reverse Proxy for Public Media Uploads
    location /uploads/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Safe Verification & Reload Procedure
```bash
# 1. Test Nginx syntax
nginx -t

# 2. Only reload if test passes
systemctl reload nginx
```

---

## 8. External Uptime Monitoring Setup

The application exposes a dedicated health check endpoint:

**Primary Monitoring URL**: `https://dmfmop.org/api/health`

### Health Check Response Specification
- **Healthy Status Code**: `HTTP 200 OK`
- **Degraded/Unhealthy Status Code**: `HTTP 503 Service Unavailable`
- **Response Format**:
  ```json
  {
    "status": "ok",
    "database": "connected",
    "uptime": 1420,
    "timestamp": "2026-09-18T12:00:00.000Z"
  }
  ```

### Connecting to Monitoring Services (e.g., UptimeRobot, Better Stack, Pingdom)

1. Create a **New Monitor**:
   - **Monitor Type**: `HTTP(s)`
   - **Friendly Name**: `DMF Backend API`
   - **URL**: `https://dmfmop.org/api/health`
   - **Monitoring Interval**: `1 minute` or `5 minutes`
   - **Expected Status Code**: `200`
2. Configure Alert Contacts:
   - Email, SMS, or Telegram alerts when status is non-200 or response times out (> 10s).
3. (Optional) Create a **Second Monitor** for Frontend:
   - **URL**: `https://dmfmop.org/`
   - **Friendly Name**: `DMF Website Frontend`

---

## 9. Rollback & Failure Recovery Procedures

| Failure Scenario | Cause | Safe Recovery Action |
|---|---|---|
| **Preflight check fails (`✗ JWT_SECRET`)** | Missing environment variable in `backend/.env` | The deployment script aborts immediately. PM2 is NOT touched. Inspect `backend/.env` and add the missing key. Re-run `./deploy.sh`. |
| **Git merge conflict on pull** | Local files were edited on the server | Run `git status` to see modified tracked files. Do not run `git reset --hard` blindly. Discard local edits to generated files only (`git checkout -- build/ package-lock.json`). Never delete `backend/.env` or `backend/uploads/`. |
| **Frontend build fails (`npm run build`)** | Syntax or package error in code | Deployment aborts. The live frontend in `/var/www/dmfmop-frontend` is NOT touched and remains online. Fix the code locally, commit, push, and redeploy. |
| **Backend fails health check after restart** | Runtime crash, bad import, or DB connection error | Deployment stops before replacing frontend files. Check PM2 error logs: `pm2 logs dmfmop-api --err --lines 50`. To roll back code: `git checkout HEAD~1` then `pm2 restart dmfmop-api --update-env`. |
| **Database disconnected (`HTTP 503`)** | MongoDB Atlas IP whitelist or network issue | Check Atlas network access rules. Ensure VPS IP `72.61.240.244` is whitelisted. Backend will automatically reconnect when database becomes reachable. |

### How to Safely Roll Back to a Previous Git Commit

```bash
cd /root/demo1

# 1. View recent commit history
git log --oneline -n 5

# 2. Checkout previous known good commit (replace <commit-hash>)
git checkout <commit-hash>

# 3. Restart backend with that commit
pm2 restart dmfmop-api --update-env

# 4. Verify health
curl -s http://127.0.0.1:5000/api/health

# 5. Rebuild and deploy frontend
npm run build
rm -rf /var/www/dmfmop-frontend/*
cp -a build/. /var/www/dmfmop-frontend/
```
