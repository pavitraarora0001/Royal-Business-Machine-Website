# VERCEL CONFIGURATION & DEPLOYMENT ARCHITECTURE REPORT

**Project Name:** `royal-business-machine`  
**Framework:** Next.js (App Router, Turbopack)  
**Root Directory:** `frontend` (or repository root with configured build path)  
**Active Git Branch:** `redesign/premium-migration`  
**Target Domain:** `royalbusinessmachine.com`  

---

## 1. Vercel Project Settings Specification

When connecting the GitHub repository to Vercel, the project settings must be configured as follows:

| Configuration Key | Setting Value | Purpose / Rationale |
| :--- | :--- | :--- |
| **Project Name** | `royal-business-machine` | Vercel dashboard project identifier |
| **Framework Preset** | `Next.js` | Enables automatic Next.js build detection and edge routing |
| **Root Directory** | `frontend` | Points Vercel directly to the Next.js application directory |
| **Build Command** | `npm run build` (or Next.js default) | Generates optimized static pages and SSR endpoints |
| **Output Directory** | `.next` (Next.js default) | Standard Next.js production build output directory |
| **Install Command** | `npm install` | Installs dependencies defined in `frontend/package.json` |
| **Node.js Version** | `20.x` or `22.x` | Matches production runtime requirements |

---

## 2. Next.js Routing & API Proxy Rewrites

To ensure that the browser never suffers cross-origin resource sharing (CORS) blocks, mixed-content warnings, or exposes the backend server's direct URL, the Next.js application has been configured with **server-side rewrites** in [frontend/next.config.ts](file:///c:/Pavitra-Arora/Royal-Business-Machine-Website/frontend/next.config.ts):

```typescript
// frontend/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "royalbusinessmachine.com",
      },
    ],
  },
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
```

### How the Rewrites Proxy Works in Production:
1. When a user submits the Contact Form on `https://royalbusinessmachine.com/contact`, the browser makes a same-origin request to `https://royalbusinessmachine.com/api/contact`.
2. Vercel's edge layer transparently proxies this request to the backend service defined by `BACKEND_API_URL` (e.g. `https://api.royalbusinessmachine.com/api/contact`).
3. The response is returned to the user under `https://royalbusinessmachine.com`.
4. **Key Benefit:** **Zero CORS configuration required in the browser**, cookies and JWT tokens flow cleanly, and backend architecture details remain private.

---

## 3. Vercel Configuration File (`frontend/vercel.json`)

The application includes a [frontend/vercel.json](file:///c:/Pavitra-Arora/Royal-Business-Machine-Website/frontend/vercel.json) file defining enterprise security headers, caching directives, and clean URL rules:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 4. Frontend API Calls Refactoring Audit

All client-side components have been inspected and refactored to eliminate hardcoded `localhost:5000` strings:

1. **`frontend/src/app/contact/contact-client.tsx`:**
   - *Original:* `fetch("http://localhost:5000/api/contact", ...)`
   - *Refactored:* `fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/contact`, ...)`
2. **`frontend/src/app/login/login-client.tsx`:**
   - *Original:* `fetch("http://localhost:5000/api/auth/login", ...)`
   - *Refactored:* `fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/login`, ...)`
3. **`frontend/src/app/register/register-client.tsx`:**
   - *Original:* `fetch("http://localhost:5000/api/auth/register", ...)`
   - *Refactored:* `fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`, ...)`

---

## 5. Preview Deployment Lifecycle

Vercel provides unique preview deployment URLs (e.g. `https://royal-business-machine-git-redesign-*.vercel.app`) for every commit on branch `redesign/premium-migration`:
- All 23 pages, UI components, responsive layouts, and interactive filters can be visually and functionally tested on live Vercel edge infrastructure **before connecting the production domain**.
- Preview deployments automatically feature `X-Robots-Tag: noindex`, preventing duplicate search engine indexing during the pre-cutover verification phase.

---

*Report ready for review. Proceeding to Environment Variable Checklist.*
