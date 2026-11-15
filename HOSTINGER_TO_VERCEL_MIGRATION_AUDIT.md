# ROYAL BUSINESS MACHINE — HOSTINGER TO VERCEL MIGRATION AUDIT

**Target Domain:** `https://royalbusinessmachine.com/` (`www.royalbusinessmachine.com`)  
**Current Hosting:** Hostinger (cPanel / Hostinger Cloud / VPS)  
**Target Hosting:** Vercel (Edge Network & Frontend Infrastructure) + Managed Cloud Backend/Database  
**Active Migration Branch:** `redesign/premium-migration`  
**Audit Date:** 15 November 2026  
**Security Standard:** Strict zero-credential disclosure policy (no secrets or private keys printed)

---

## 1. Executive Migration Summary

This audit assesses the technical architecture, dependencies, API contracts, database connections, and operational requirements for migrating Royal Business Machine from Hostinger to Vercel.

The goal is to transition the modernized 23-page enterprise platform onto Vercel's global edge network while ensuring **100% preservation of all existing functionality, original business information, authenticated user portals, database records, and SEO rankings.**

---

## 2. Infrastructure Inventory & Component Analysis

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CURRENT LOCAL / REPO ARCHITECTURE                    │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Frontend: Next.js 16.1.6         │ Port 3000 (Turbopack, App Router)   │
│ Backend: Node.js 18+ Express.js  │ Port 5000 (REST API, Swagger docs)  │
│ Database: MongoDB Local / Mongoose│ Port 27017 (7 core collections)    │
│ Media: Local disk /uploads       │ Persistent directory on disk        │
│ Domain Registrar: Hostinger      │ royalbusinessmachine.com            │
└──────────────────────────────────┴─────────────────────────────────────┘
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  TARGET PRODUCTION VERCEL ARCHITECTURE                 │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Frontend: Vercel Edge Network    │ Next.js 16.1.6 (Root: frontend)     │
│ API Proxy: Next.js Rewrites      │ /api/* → BACKEND_API_URL/api/*      │
│ Backend API: Managed Container   │ Render / Railway / Hostinger VPS    │
│ Database: MongoDB Atlas (Managed)│ Cluster M0/M10 (AWS Mumbai / ap-s-1)│
│ Media Storage: Persistent Cloud  │ S3 / Cloudinary / Vercel Blob       │
│ DNS Authority: Hostinger DNS     │ A & CNAME records pointed to Vercel │
└──────────────────────────────────┴─────────────────────────────────────┘
```

### Component 1: Next.js Frontend (`frontend/`)
- **Framework:** Next.js `16.1.6` (React `19.2.3`, TypeScript `5`).
- **Router:** App Router (`frontend/src/app`).
- **Styling:** Tailwind CSS `v4` with custom `@custom-variant dark`.
- **Pages & Routes:** 23 user-facing pages + `/portfolio` alias + `/sitemap.xml` + `/robots.txt`.
- **Static Optimization:** 29/29 routes statically prerendered at build time.
- **Vercel Compatibility:** **100% Native & Optimized**. Next.js was built by Vercel; deployment is zero-friction.

### Component 2: Node.js / Express Backend (`backend/`)
- **Server File:** `backend/server.js` (ES Modules, `type: "module"`).
- **Core Dependencies:** Express `4.18.2`, Mongoose `8.0.0`, JWT `9.0.2`, bcryptjs, Helmet, CORS, express-rate-limit, Nodemailer, Multer, Razorpay, PDFKit, Swagger.
- **API Surface (7 Route Groups):**
  1. `/api/auth` — Register, Login, Verify OTP, Refresh Token, Forgot Password, Reset Password.
  2. `/api/contact` — Public inquiry submission & admin triage.
  3. `/api/leads` — Business lead capture & quote scoping.
  4. `/api/services` — Service catalog management & CRUD.
  5. `/api/portfolio` — Project case studies & deployment listings.
  6. `/api/payments` — Razorpay order generation & payment verification.
  7. `/api/admin` — Executive system metrics, users, inquiries, audit logs.
- **Vercel Compatibility Assessment:**
  - Express can run as a Vercel Serverless Function via an adapter.
  - *However*, serverless environments pose challenges for:
    - **Local File Uploads:** `multer.diskStorage` writes to `./uploads`, which is read-only in serverless.
    - **In-Memory Rate Limiting:** `express-rate-limit` instances reset across serverless cold starts.
    - **Fire-and-forget Email Dispatch:** `sendContactNotification().catch(...)` can be frozen if not awaited before serverless response termination.
  - **Verdict:** Recommend deploying the frontend to Vercel and connecting to a persistent backend container (Render, Railway, or existing Hostinger VPS) via Next.js rewrites.

### Component 3: Database (`MongoDB`)
- **Current Connection:** Local MongoDB on `mongodb://localhost:27017/royal-business-machine`.
- **ODM:** Mongoose `8.0.0` with connection retry and pooling logic in `backend/config/database.js`.
- **Collections:** `Users`, `Contacts`, `Leads`, `Services`, `Portfolios`, `Payments`, `OTPs`.
- **Target Architecture:** MongoDB Atlas Free/Tier cluster (e.g., AWS Mumbai region `ap-south-1` for lowest latency to Indian clients).
- **Migration Path:** `mongodump` from current host → `mongorestore` to MongoDB Atlas cluster. Zero loss of user accounts or case studies.

### Component 4: DNS & Domain Authority
- **Registered Domain:** `royalbusinessmachine.com` & `www.royalbusinessmachine.com`.
- **Current Registrar & DNS:** Hostinger.
- **Safety Directive:** Maintain domain registration and DNS authority at Hostinger. Update ONLY the `A` and `CNAME` web records pointing to Vercel. **Preserve all MX, SPF, DKIM, and DMARC email records.**

---

## 3. Pre-Migration Dependency Audit Table

| Package / Resource | Version | Runtime Compatibility | Migration Action |
| :--- | :---: | :---: | :--- |
| `next` | `16.1.6` | Node 18.x – 22.x | Native Vercel deployment |
| `react` / `react-dom` | `19.2.3` | React 19 Server Components | Supported out of the box |
| `framer-motion` | `12.35.0` | Client components | Client hydration verified |
| `tailwindcss` | `4.0.0` | PostCSS plugin | Compiled with `@custom-variant dark` |
| `mongoose` | `8.0.0` | Node 18+ | Connects to MongoDB Atlas URI |
| `jsonwebtoken` | `9.0.2` | Universal Node.js | Stateless HMAC SHA-256 JWT validation |
| `nodemailer` | `6.9.7` | SMTP Transport | Connects via Gmail / Hostinger SMTP |
| `multer` | `1.4.5` | Disk / Memory storage | Move to cloud storage or keep on container |
| `razorpay` | `2.9.2` | REST API | Set production API keys |

---

## 4. Migration Risk Assessment & Mitigation

| Risk | Impact | Likelihood | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **CORS Failure on API Calls** | High | Low | Next.js rewrites proxy `/api/:path*` to backend on same origin. Zero CORS friction. |
| **Email Service Interruption** | Critical | Low | Leave MX, SPF, and TXT DNS records untouched at Hostinger. Only adjust web records. |
| **Cold Start Latency** | Medium | Medium | Decoupled container backend or connection caching in serverless. |
| **Hardcoded Localhost Leaks** | High | Resolved | All client fetch calls now use `NEXT_PUBLIC_API_URL` and relative paths. |
| **File Upload Loss** | Medium | Low | Persist uploads directory on backend host or migrate to S3 / Vercel Blob. |

---

*Phase 1 Audit Complete. Proceeding to architectural specifications and configuration reports.*
