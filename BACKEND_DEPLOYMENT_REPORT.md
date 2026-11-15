# ROYAL BUSINESS MACHINE — PHASE 2: BACKEND DEPLOYMENT & INTEGRATION REPORT

**Project:** Royal Business Machine  
**Branch:** `redesign/premium-migration`  
**Current Date:** November 15, 2026  
**Status:** Audit & Pre-Deployment Preparation Completed — Awaiting User Approval  

---

## 1. Executive Summary

With the Next.js frontend deployed to Vercel Preview ([https://royal-business-machine-4c3sewp9u-pavitraarora0001s-projects.vercel.app](https://royal-business-machine-4c3sewp9u-pavitraarora0001s-projects.vercel.app)), this report delivers the complete architectural audit, database strategy, runtime compatibility analysis, and integration verification for the Express backend.

---

## 2. Complete Backend Directory Audit

The backend is built with modern ES Modules (`"type": "module"`) running on Express 4.18.2 with Mongoose 8.0.0.

```
backend/
├── config/
│   ├── database.js      # Mongoose connection pooling & event listeners
│   ├── multer.js        # Multi-directory disk storage upload configuration
│   └── swagger.js       # OpenAPI/Swagger 3.0 API documentation specs
├── controllers/
│   ├── adminController.js     # User management, inquiries, analytics
│   ├── authController.js      # Registration, OTP verify, JWT auth, refresh tokens
│   ├── contactController.js   # Inbound inquiry submission & notifications
│   ├── leadController.js      # Commercial opportunity pipeline
│   ├── paymentController.js   # Razorpay order generation & signature verify
│   ├── portfolioController.js # Case study data CRUD
│   └── serviceController.js   # Service catalog CRUD
├── middleware/
│   ├── auth.js          # JWT Bearer token protection & RBAC role guards
│   ├── errorHandler.js  # Centralized operational error & exception handler
│   └── validation.js    # Express-validator schemas (Indian phone, email, pass)
├── models/
│   ├── Contact.js       # Inquiries, tracking data, response states
│   ├── Lead.js          # Qualified leads & estimated budgets
│   ├── OTP.js           # 6-digit verification codes with TTL expiry
│   ├── Payment.js       # Transaction logs, Razorpay signatures
│   ├── Portfolio.js     # Case study schema
│   ├── Service.js       # Enterprise service catalog schema
│   └── User.js          # Accounts, bcrypt hashes, roles (client, admin, super_admin)
├── services/
│   ├── emailService.js  # Nodemailer SMTP transporter & templates
│   ├── otpService.js    # 6-digit cryptographically random OTP generation
│   ├── paymentService.js# Razorpay gateway integration
│   └── pdfService.js    # PDFKit dynamic invoice & brochure generation
├── tests/
│   └── auth.test.js     # Automated authentication & health integration tests
└── server.js            # Express app, helmet, CORS, rate limiter, routes, 404
```

---

## 3. MongoDB Current Location & Production Connectivity

### Current Location:
* **Host:** Local MongoDB instance (`mongodb://localhost:27017/royal-business-machine`) and Hostinger VPS.
* **Collections Active:** `users`, `contacts`, `leads`, `services`, `portfolios`, `payments`, `otps`.

### Production Connectivity Specification (MongoDB Atlas):
* **Recommended Tier:** MongoDB Atlas Shared M0 (Staging/Preview) / Dedicated M10 (High Availability Production).
* **Region:** AWS Mumbai (`ap-south-1`) for sub-20ms latency to regional users across Rajasthan, Delhi NCR, and nationwide.
* **Network Access Security:**
  * For serverless/cloud environments, allow `0.0.0.0/0` with strong SCRAM-SHA-256 user authentication and rotating credentials.
* **Connection String Format (Zero Secrets Disclosed):**
  ```env
  MONGODB_URI=mongodb+srv://<atlas-user>:<atlas-password>@<cluster-domain>.mongodb.net/royal-business-machine?retryWrites=true&w=majority&appName=RoyalBusinessMachine
  ```
* **Mongoose Pool Configuration:**
  Configured in `backend/config/database.js` with `maxPoolSize: 10`, `serverSelectionTimeoutMS: 5000`, `socketTimeoutMS: 45000`.

---

## 4. File Upload & Storage Requirements

### Current Implementation:
* `backend/config/multer.js` uses `multer.diskStorage` saving files into local filesystem paths:
  * `./uploads/services/`
  * `./uploads/portfolio/`
  * `./uploads/documents/`
* `server.js` serves uploaded files through `express.static('/uploads')`.

### Architectural Impact on Hosting Choice:
1. **On Serverless (Vercel Serverless Functions):**
   * The local filesystem is **read-only and ephemeral** (discarded after request lifecycle).
   * Local file uploads **cannot** persist.
   * If deployed serverless, file uploads must be refactored to cloud object storage (e.g., **AWS S3**, **Cloudinary**, or **Vercel Blob**).
2. **On Persistent Containers (Railway / Render / Hostinger VPS):**
   * Disk storage or mounted volumes persist across requests.
   * `multer.diskStorage` works natively without code refactoring.

---

## 5. Vercel Serverless Compatibility Assessment & Recommendation

| Capability / Feature | Vercel Serverless Function | Dedicated Container (Railway / Render / VPS) |
| :--- | :--- | :--- |
| **REST API Routes** | Compatible via `@vercel/node` wrapper | 100% Native Express |
| **Authentication & JWT** | Compatible (stateless tokens) | 100% Native |
| **Multer Local Uploads** | **Incompatible** (read-only filesystem) | **100% Compatible** (persistent disk) |
| **Nodemailer SMTP** | Compatible (if external SMTP accessible) | 100% Native |
| **PDFKit Generation** | Compatible (in-memory buffer stream) | 100% Native |
| **In-Memory Rate Limiting** | Resets on lambda cold start (needs Redis) | Continuous in-memory tracking |
| **Cold Starts** | 500ms – 2s latency on cold requests | 0ms (Always warm) |

### Hosting Architecture Recommendation:
* **Option A (Recommended for Complete Native Compatibility):**
  Deploy the Express backend as a containerized web service on **Railway**, **Render**, or the existing **Hostinger VPS** using the existing `Dockerfile`. This preserves local disk uploads, persistent rate-limiting, and zero cold-start latency.
* **Option B (Serverless Alternative):**
  Deploy as a separate Vercel project (`royal-business-machine-api`). Requires refactoring file uploads to AWS S3/Cloudinary/Vercel Blob and caching Mongoose connections across serverless lambda invocations.

---

## 6. Secure Environment Variables Specification

The backend requires the following environment variables (defined in `backend/.env.example`):

| Variable Name | Environment Target | Purpose |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations & error masking |
| `PORT` | `5000` (or assigned by host) | HTTP listen port |
| `MONGODB_URI` | Production Atlas URI | Cloud database connection string |
| `JWT_SECRET` | 64-char crypto string | Sign access tokens (7-day validity) |
| `JWT_REFRESH_SECRET` | 64-char crypto string | Sign refresh tokens (30-day validity) |
| `EMAIL_HOST` | e.g. `smtp.gmail.com` | SMTP relay server |
| `EMAIL_PORT` | `587` | SMTP port |
| `EMAIL_USER` | Authenticated email | Sender authentication username |
| `EMAIL_PASSWORD` | App-specific password | SMTP secret password |
| `EMAIL_FROM` | `info@royalbusinessmachine.com` | Sender header display |
| `FRONTEND_URL` | Vercel preview & custom domain | Origin whitelist for CORS |
| `RAZORPAY_KEY_ID` | Production/Test Razorpay ID | Payment processing |
| `RAZORPAY_KEY_SECRET` | Production/Test secret | Signature validation |

---

## 7. Dynamic CORS Configuration

In `backend/server.js`, CORS has been updated to dynamically allow requests from local development, the production domain, and **all Vercel Preview deployments**:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://royalbusinessmachine.com',
  'https://www.royalbusinessmachine.com',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

---

## 8. Automated API Health-Check & Integration Audit Results

All core backend endpoints were verified against MongoDB:

```
┌─────────┬─────────────────────────────────────────────┬────────┬──────┬──────────────────────────────┐
│ (index) │ Endpoint Under Test                         │ Status │ OK   │ Verification Detail          │
├─────────┼─────────────────────────────────────────────┼────────┼──────┼──────────────────────────────┤
│ 0       │ GET /health                                 │ 200    │ true │ Server status active         │
│ 1       │ POST /api/contact                           │ 201    │ true │ Inquiry saved to DB          │
│ 2       │ POST /api/auth/register                     │ 201    │ true │ User created, OTP sent       │
│ 3       │ POST /api/auth/verify-otp                   │ 200    │ true │ OTP verified, JWT issued     │
│ 4       │ POST /api/auth/login                        │ 200    │ true │ Credentials verified         │
│ 5       │ GET /api/auth/me (Authenticated)            │ 200    │ true │ JWT Bearer token authorized  │
│ 6       │ GET /api/admin/dashboard (RBAC Rejection)   │ 403    │ true │ Non-admin correctly rejected │
│ 7       │ GET /api/services                           │ 200    │ true │ Service catalog delivered    │
└─────────┴─────────────────────────────────────────────┴────────┴──────┴──────────────────────────────┘
```

**Automated Jest Test Suite:**
```bash
$ npm test
PASS tests/auth.test.js
  Authentication API Tests
    POST /api/auth/register
      ✓ should register a new user successfully (1041 ms)
      ✓ should fail with invalid email (18 ms)
      ✓ should fail with weak password (12 ms)
    POST /api/auth/login
      ✓ should fail with invalid credentials (15 ms)
    GET /health
      ✓ should return health status (9 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

---

## 9. Bug Fixes Applied to Backend During Phase 2

1. **Nodemailer Method Correction:**
   * In `backend/services/emailService.js`, corrected `nodemailer.createTransporter` to `nodemailer.createTransport`.
   * Added dev/test fallback logger to simulate email delivery without external SMTP dependencies during automated test execution.
2. **Error Handler Environment Coverage:**
   * In `backend/middleware/errorHandler.js`, updated condition to ensure `test` and non-production environments return full JSON error objects rather than hanging without a response.
3. **CORS Flexibility:**
   * Added regex matching for `*.vercel.app` domains to ensure seamless communication with Vercel Preview deployments.

---

## 10. Safety & Compliance Checklist

- [x] Did NOT assume `api.royalbusinessmachine.com` is operational.
- [x] Zero secrets or sensitive credentials exposed.
- [x] Production database records unmodified.
- [x] Hostinger deployment remains active and unaffected.
- [x] DNS records strictly untouched.
- [x] PR #2 remained unmerged.
- [x] Production deployment not executed.

---

## 11. Approval Request & Next Actions

Please approve the following decision before proceeding to live backend deployment:

* **Decision Required:** Choose the target hosting platform for the Express backend:
  1. **Option A (Recommended):** Deploy as a persistent Node.js container on **Railway** / **Render** / **Hostinger VPS** (supports existing Multer local disk storage, Nodemailer, and zero cold-start latency).
  2. **Option B:** Deploy as a separate **Vercel Serverless** project (requires adding Cloudinary / AWS S3 / Vercel Blob for persistent file uploads).
