# Current Feature Inventory

This document provides a comprehensive map of the existing application's functionality, tracing features across the frontend, API, and database.

## 1. Public Website Features
Visitors can access a wide array of informational pages and interactive endpoints.

- **Homepage (`/`)**: Landing page showcasing the organization's mission, impact, and quick links.
- **About (`/about`)**: Organizational history and vision.
- **Programs & Initiatives**: 
  - Missions (`/missions`)
  - Movement of Positivity (`/movement-of-positivity`)
  - Center of Excellence (`/international-center-of-excellence`, `/icoe`)
  - Words Beyond Borders (`/words-beyond-borders`)
  - She Leads (`/she-leads`)
  - Skill Reach (`/skill-reach`)
  - Shelter Home (`/shelter-home`)
  - DTNT Lives Matter (`/dtnt-lives-matter`)
- **Admissions (`/admission`)**: Gateway to various educational offerings.
  - GNM Admission (`/admission/gnm`)
  - Language Courses (`/admission/language-course`)
  - Technical Courses (`/admission/technical-course`)
  - Other Courses (`/admission/other-course`)
  - Nursing College (`/nursing-college`)
- **Competitive Exams Hub (`/competitive-exams-hub`)**: Details on exam prep.
- **CSR & Projects (`/csr`, `/projects`)**: Directory of initiatives and corporate social responsibility (CSR) programs.
- **Job Portal**: 
  - Job Placement (`/job-placement`)
  - Job Fair (`/job-fair`)
- **Engagement & Support**:
  - Donate (`/donate`)
  - Events (`/events`)
  - Media & Press (`/media`)
  - Join Us (`/join-us`)
  - Become a Partner (`/become-a-partner`)
  - Slot Booking (`/slot-booking`)
- **Utilities**: Privacy Policy (`/privacy-policy`)

---

## 2. Forms
The application relies heavily on user-submitted forms protected by CAPTCHA.

| Form Name | Route/Location | Database Model | Features / Behavior |
|---|---|---|---|
| **Corporate Onboarding** | `/csr` | `PartnerRequest` | Uploads PDF (private). Submits organization details. |
| **NGO Registration** | `/csr` | `PartnerRequest` | Uploads PDF (private). Evaluates partnership type. |
| **Project Pitch Form** | `/csr` | `Project` / `PartnerRequest` | Pitches new initiatives. |
| **Exam Registration** | `/competitive-exams-hub/register` | `CompetitiveExamAdmission` | Collects student details for exam mentorship. |
| **Join Us Form** | `/join-us` | `Joinee` | Volunteer/Membership intake form. |
| **Donation Form** | `/donate` | `Donation` | Collects donor info, amount, and message. Has Razorpay hooks. |
| **Slot Booking** | `/slot-booking` | `SlotBooking` | Books date/time slots for meetings/appointments. |
| **Become a Partner** | `/become-a-partner` | `PartnerRequest` | Partnership inquiry with detailed proposals. |
| **Job Application** | `/job-placement` | `JobApplication` | Connects applicants to `JobPosting` IDs. |
| **Admin Login** | `/admin` | N/A (Auth) | Authenticates staff using JWT. |
| **Media Subscribe** | `/media` | TBD | Collects email for newsletter updates. |

---

## 3. User/Visitor Features
- **Submit Applications**: Apply for jobs, courses, and competitive exams.
- **Donate**: Financially contribute to causes.
- **Book Appointments**: Schedule slots with organizational leaders.
- **Upload Secure Documents**: Submit pitch decks and organizational PDFs securely.
- **Download Public Resources**: Access brochures, PDFs, and read publications.
- **Watch Media**: View embedded video highlights and press coverage.
- **Multi-language Support**: Toggle languages via `FloatingLangToggle`.

---

## 4. Admin Features
The `/admin` route loads a monolithic `Admin.jsx` dashboard. Based on roles (`SUPER_ADMIN`, `DIRECTOR`, `OPERATION_HEAD`), admins can:

- **Dashboard Operations**: View aggregate analytics and statuses.
- **Content Management (CRUD)**: Create, Read, Update, Delete entities including Courses, Diploma Courses, Competitive Exams, Media, Videos, Publications, Press Coverage, Live Sessions, and Job Postings.
- **Status Workflows**: Update the `status` string (e.g., Pending ➡️ Approved) for Joinees, Admissions, Partner Requests, and Slot Bookings.
- **User Management**: Strictly reserved for `SUPER_ADMIN_STRICT`, allowing creation and modification of staff users and RBAC permissions.
- **Workspace Tasks & Attendance**: Check-in/out and task assignment among internal staff.

---

## 5. Authentication & Authorization
- **Mechanism**: JSON Web Tokens (JWT) issued on login, expected as a Bearer token in the `Authorization` header.
- **Roles**: Extensively relies on `SUPER_ADMIN`, `DIRECTOR`, `OPERATION_HEAD`, `STUDENT`.
- **Middleware**: 
  - `verifyToken`: Validates JWT signature.
  - `restrictTo('ROLE1', 'ROLE2')`: Enforces Role-Based Access Control (RBAC) on API routes.
- **Hidden Concept**: `SUPER_ADMIN_STRICT` is utilized for the highest-tier operations like role mutation and user deletion.

---

## 6. Real-Time Features
Powered by **Socket.io** (`backend/socket.js` and `SocketContext.jsx`):
- **Workspace Chat**: Internal messaging tool for staff.
- **Presence**: Real-time tracking of online users (`workspace:presence`).
- **Typing Indicators**: `TYPING_START` and `TYPING_END` events.
- **Authentication**: Sockets authenticate using the JWT token injected during the handshake.

---

## 7. File Management
Managed by `multer` configured in `backend/middleware/upload.js`.
- **Public Files**: Saved to `/uploads/`. Includes course brochures, media thumbnails, and publications. Served statically.
- **Private Files**: Saved to `/uploads/private/`. Includes sensitive Partner Requests and Pitch Decks. Blocked from static access. Must be retrieved via authenticated endpoint `GET /api/private-uploads/:filename`.
- **Path Traversal Protection**: Enforced on the private file retrieval endpoint.

---

## 8. Content Management
Admins have full CRUD control over:
- Educational Content: Courses, Diploma Courses, Competitive Exams, Live Sessions.
- PR & Media: Image Galleries (Media), Videos, Publications, Press Links.
- Organization: Job Postings, Projects.

---

## 9. API Feature Inventory
Over 70 endpoints currently exist. A summarized view of the domains:

| DOMAIN | METHODS | AUTH REQUIRED | ROLES |
|---|---|---|---|
| **Admissions** | GET, POST, PUT, DELETE | GET/PUT/DEL | Admin Roles |
| **Courses** | GET, POST, PUT, DELETE | POST/PUT/DEL | Admin Roles |
| **CSR / Projects** | GET, POST, PUT, DELETE | POST/PUT/DEL | Admin Roles |
| **Donations** | GET, POST, DELETE | GET/DEL | Admin Roles |
| **Files** | GET | Private (Yes) / Public (No) | Admin Roles for Private |
| **Jobs** | GET, POST, PUT, DELETE | GET/PUT/DEL | Admin Roles |
| **Media / Press** | GET, POST, PUT, DELETE | POST/PUT/DEL | Admin Roles |
| **Partners** | GET, POST, PUT, DELETE | GET/PUT/DEL | Admin Roles |
| **Workspace / Chat** | GET, POST, PUT, DELETE | ALL | Authenticated Staff |

*(All POST forms exposed to the public are protected by `verifyCaptcha` middleware).*

---

## 10. Database Feature Inventory
Powered by **Mongoose**. Core models include:
- `Admission`, `CompetitiveExamAdmission`, `Joinee`: Tracks intake and registration (Public forms ➡️ Admin dashboard).
- `Course`, `CompetitiveExam`, `LiveSession`: Catalog of educational offerings (Admin forms ➡️ Public display).
- `Project`, `PartnerRequest`: CSR and B2B workflows.
- `Donation`: Tracks financial contributions.
- `MediaItem`, `VideoHighlight`, `Publication`, `PressCoverage`: PR content arrays.
- `JobPosting`, `JobApplication`: Recruitment tools.
- `SlotBooking`: Appointment scheduling.
- `User`, `RolePermission`, `Task`: Internal workspace management.
- `WorkspaceMessage`, `WorkspaceChatState`: Internal real-time communication.

---

## 11. Navigation & Information Architecture
- **Navbar**: Main global navigation. Includes Dropdowns for nested programs (Admissions, CSR, etc).
- **Floating Elements**: `FloatingLangToggle`, `CourseTeaserToast`, and `RegisterNowFloater` persist across the app layout.
- **Footer**: Standard sitewide links.

---

## 12. Existing Integrations
- **Google reCAPTCHA**: Used extensively on all public-facing POST requests (Donations, Admissions, Contact forms).
- **Socket.io**: Powers the internal workspace chat.
- **MongoDB**: Primary datastore.
- **Multer**: Disk storage for uploads.

---

## 13. Current Feature Problems (Observations)
- **Monolithic Frontend Admin**: `Admin.jsx` contains over 2000 lines of code, managing ~15 different domains in a single file. Highly unmaintainable.
- **Mass Assignment Vulnerabilities**: Route controllers directly pass `req.body` into `new Model()`, posing security risks if undocumented fields are injected by malicious users.
- **Missing Pagination**: Endpoints like `Donation.find().sort(...)` fetch the entire database table at once, risking memory bloat.
- **Error Handling Bypass**: The API route handlers catch errors and manually emit `res.status(500)` rather than utilizing the centralized `next(err)` Express pipeline.
- **Redundant CSR logic**: There are multiple endpoints hitting `csrRoutes.js` that seem to duplicate logic for `Project` vs `CSRPartner` forms.

---

## 14. Feature Inventory Summary

| FEATURE | CURRENT STATUS | RECOMMENDATION |
|---|---|---|
| **Public Information Pages** | Operational but fragmented across 20+ routes | IMPROVE (Consolidate routing) |
| **Public Forms (Donations/Admissions)** | Secure (CAPTCHA) but vulnerable to mass-assignment | IMPROVE (Add DTO/validation) |
| **Admin Dashboard** | Operational but severely monolithic | REFACTOR (Split into components) |
| **Workspace Chat (Socket.io)** | Operational | KEEP |
| **Role-Based Access Control** | Strictly implemented | KEEP |
| **File Management** | Good public/private split | KEEP |
| **Database Queries** | No pagination, fetching full tables | IMPROVE |
| **Error Handling** | Decentralized in catch blocks | IMPROVE |
