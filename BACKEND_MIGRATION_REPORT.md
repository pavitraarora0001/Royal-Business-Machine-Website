# ROYAL BUSINESS MACHINE — BACKEND MIGRATION & ARCHITECTURE REPORT

**Backend Stack:** Node.js 18+ / Express.js (ES Modules)  
**Database:** MongoDB / Mongoose ODM  
**Target Architecture:** Decoupled Enterprise Deployment with Next.js Rewrites Proxy  
**Current Branch:** `redesign/premium-migration`  

---

## 1. Executive Architecture Assessment

The Royal Business Machine backend (`backend/server.js`) is an Express application structured into 7 distinct route domains, 7 Mongoose schemas, JWT/Refresh-token authentication middleware, input validators (`express-validator`), and integrated third-party services (Nodemailer, Razorpay, PDFKit, Swagger UI).

To determine the optimal hosting architecture between **Vercel Serverless** and a **Persistent Node.js Container**, each subsystem was evaluated against serverless constraints.

---

## 2. Technical Compatibility Comparison: Serverless vs. Persistent Container

| Subsystem / Requirement | Express on Vercel Serverless | Persistent Container (Render / Railway / VPS) | Recommendation & Impact |
| :--- | :--- | :--- | :--- |
| **API Endpoints & Routing** | Compatible via `@vercel/node` or serverless entry point | 100% Native Express execution | Both work; container has zero route translation overhead. |
| **Database Connection Pooling** | Reconnects on cold starts; requires cached `global.mongoose` promise | Persistent Mongoose pool (`maxPoolSize: 10`) maintained continuously | **Container is superior**; prevents connection spikes on MongoDB Atlas. |
| **File Uploads (`Multer`)** | **Incompatible with `diskStorage`** (filesystem is read-only except ephemeral `/tmp`) | Native disk storage (`./uploads`) supported with persistent volume | **Container supports current code without modification**; serverless requires S3/Blob refactor. |
| **Email & OTP Dispatch** | Unawaited asynchronous tasks may be frozen upon response exit | Event loop continues processing background promises reliably | **Container is superior**; guarantees email delivery even after HTTP response. |
| **Rate Limiting (`express-rate-limit`)** | Ineffective (in-memory store resets across lambdas; requires Redis) | In-memory IP tracking works natively across all requests | Container enforces security policies without adding Redis infrastructure. |
| **Execution Latency** | Subject to cold start latency (800ms–2500ms after idle periods) | Always warm (0ms cold start; sub-50ms response times) | Container provides consistent enterprise-grade responsiveness. |
| **Operational Cost** | Included in Vercel plan | Free tier or ~$5/month container | Negligible difference for enterprise reliability. |

---

## 3. Recommended Production Architecture

### **The Decoupled Enterprise Architecture (Best-in-Class):**

```
Browser Client (Client-Side Rendering & Hydration)
       │
       ▼
[ https://royalbusinessmachine.com ]
       │
       ├─► Vercel Edge CDN: Next.js Static Pages, Assets, Layouts (Sub-50ms TTFB)
       │
       └─► Vercel Rewrites Proxy (/api/*)
                 │  (Secure internal HTTPS proxy)
                 ▼
          [ Backend Service: Render / Railway / Hostinger VPS ]
                 │  (Node.js Express Daemon, Port 5000)
                 │
                 ├─► MongoDB Atlas (AWS Mumbai ap-south-1 Cluster)
                 ├─► Nodemailer (Gmail / Hostinger SMTP Gateway)
                 └─► Persistent Media Storage (/uploads)
```

### Key Advantages:
1. **Zero Frontend Code Rewrites:** The frontend communicates with `/api/...` directly on its own domain.
2. **Zero CORS Friction:** Browsers make same-origin requests; no cross-domain cookie or header blockers.
3. **No Cold Starts:** The Express backend runs as a continuous Node.js daemon.
4. **Existing Code Preservation:** `multer.diskStorage`, `express-rate-limit`, and asynchronous Nodemailer notifications work with 100% fidelity without rewriting controllers.

---

## 4. Backend Endpoints & API Contract Preservation

The following 19 API endpoints remain strictly preserved with identical request payloads and response contracts:

### A. Authentication & User Management (`/api/auth`)
- `POST /api/auth/register` — Client account registration with OTP trigger.
- `POST /api/auth/verify-otp` — Email verification and initial token issuance.
- `POST /api/auth/login` — Email/password authentication, returning `{ accessToken, refreshToken, user }`.
- `POST /api/auth/refresh-token` — Silent access token renewal.
- `POST /api/auth/forgot-password` — Password reset OTP dispatch.
- `POST /api/auth/reset-password` — Verified password change.
- `GET /api/auth/me` — Authenticated profile retrieval (Protected).

### B. Inquiries & Contact Submissions (`/api/contact`)
- `POST /api/contact` — Public inquiry intake with phone sanitization and IP logging.
- `GET /api/contact` — Admin inquiry review with pagination (Admin only).
- `PATCH /api/contact/:id` — Inquiry status triage (Admin only).

### C. Leads & Commercial Quotes (`/api/leads`)
- `POST /api/leads` — Lead generation intake from project scoping triggers.
- `GET /api/leads` — Pipeline review (Admin only).

### D. Services & Portfolio Catalog (`/api/services`, `/api/portfolio`)
- `GET /api/services` — Public catalog of all 8 service categories and 40+ deliverables.
- `GET /api/portfolio` — Public catalog of all 50+ enterprise case studies.
- `POST /api/services`, `POST /api/portfolio` — CRUD management (Admin only).

### E. Health & Documentation (`/health`, `/api-docs`)
- `GET /health` — Automated uptime and database heartbeat monitor.
- `GET /api-docs` — Interactive OpenAPI / Swagger UI documentation.

---

*Report complete. Proceeding to Database Migration Report.*
