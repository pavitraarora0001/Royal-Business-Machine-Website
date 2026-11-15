# ENVIRONMENT VARIABLE MIGRATION CHECKLIST

**Project:** Royal Business Machine  
**Target Environments:** Vercel (Production & Preview) & Backend Host  
**Security Standard:** Strict zero-credential disclosure policy (no actual secret strings or passwords printed)

---

## 1. Overview & Security Rules

- **Zero Hardcoded Secrets:** Secret values (passwords, JWT keys, database connection strings, API private keys) must never be committed to Git or stored in client-accessible bundles.
- **Prefix Isolation:** Only variables prefixed with `NEXT_PUBLIC_` are bundled into the client-side JavaScript. All database URIs, JWT secrets, SMTP credentials, and backend API keys must **NEVER** use the `NEXT_PUBLIC_` prefix.
- **Environment Scoping:** Configure variables with deliberate scopes:
  - **Production:** Applies to deployments on the production branch / live custom domain.
  - **Preview:** Applies to pull requests and non-production branches (such as `redesign/premium-migration`).
  - **Development:** Local developers running `npm run dev`.

---

## 2. Frontend Environment Variables (Configure in Vercel Dashboard)

Navigate to **Vercel Dashboard → Project Settings → Environment Variables** and add the following keys:

| Variable Name | Environment Scopes | Required? | Description / Example Format | Notes |
| :--- | :---: | :---: | :--- | :--- |
| `BACKEND_API_URL` | Production, Preview, Dev | **Yes** | `https://api.royalbusinessmachine.com` | Target URL for Next.js rewrites proxy to backend |
| `NEXT_PUBLIC_API_URL` | Production, Preview, Dev | Optional | (Leave empty if using rewrites proxy) | Set only if calling backend directly from browser |
| `NEXT_PUBLIC_SITE_URL` | Production | **Yes** | `https://royalbusinessmachine.com` | Canonical root URL for SEO, sitemaps, OpenGraph |
| `NEXT_PUBLIC_SITE_URL` | Preview | **Yes** | `https://$VERCEL_URL` (or preview URL) | Dynamic preview domain for branch testing |

---

## 3. Backend Environment Variables (Configure on Backend Host)

Configure these variables in the backend hosting environment (e.g., Render, Railway, Hostinger VPS, or Docker container):

| Variable Name | Required? | Format / Pattern | Description |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Yes** | `production` | Enables production performance & security optimizations |
| `PORT` | **Yes** | `5000` (or host assigned) | Internal listening port |
| `MONGODB_URI` | **Yes** | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/royal_business` | MongoDB Atlas production connection string |
| `JWT_SECRET` | **Yes** | Strong 64-char random hex/base64 string | Secret key for signing client and admin access tokens |
| `JWT_EXPIRE` | **Yes** | `7d` | Access token lifespan |
| `JWT_REFRESH_SECRET` | **Yes** | Distinct 64-char random hex/base64 string | Secret key for signing refresh tokens |
| `JWT_REFRESH_EXPIRE` | **Yes** | `30d` | Refresh token lifespan |
| `FRONTEND_URL` | **Yes** | `https://royalbusinessmachine.com` | Allowed CORS origin (comma-separated for previews) |
| `EMAIL_HOST` | **Yes** | `smtp.gmail.com` or `smtp.hostinger.com` | SMTP server address |
| `EMAIL_PORT` | **Yes** | `587` (or `465` for SSL) | SMTP port |
| `EMAIL_USER` | **Yes** | `royalbusinessmachine@gmail.com` | Corporate sender email address |
| `EMAIL_PASSWORD` | **Yes** | Secure App Password | SMTP password (e.g., Google App Password) |
| `EMAIL_FROM` | **Yes** | `noreply@royalbusinessmachine.com` | "From" header email |
| `OTP_EXPIRE` | **Yes** | `5` | OTP validity window in minutes |
| `RAZORPAY_KEY_ID` | Optional | `rzp_live_...` | Razorpay live API key (for invoice payments) |
| `RAZORPAY_KEY_SECRET` | Optional | `rzp_live_secret_...` | Razorpay live API secret key |
| `MAX_FILE_SIZE` | **Yes** | `5242880` (5 MB in bytes) | Maximum allowed upload size |
| `UPLOAD_PATH` | **Yes** | `./uploads` (or cloud storage path) | Path for media uploads |
| `RATE_LIMIT_WINDOW` | **Yes** | `15` | Rate limiting window (minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | **Yes** | `100` | Max requests per IP per window |

---

## 4. Environment Checklist Verification Protocol

- [ ] All production secret values generated with cryptographically secure random entropy.
- [ ] No `.env` files staged or committed to Git.
- [ ] Vercel Preview environment configured with staging/preview API endpoints.
- [ ] Vercel Production environment configured with live canonical URLs.
- [ ] `BACKEND_API_URL` verified against backend health endpoint (`/health`).
- [ ] `FRONTEND_URL` verified against backend CORS whitelist.

---

*Checklist complete. Proceeding to Backend Migration Report.*
