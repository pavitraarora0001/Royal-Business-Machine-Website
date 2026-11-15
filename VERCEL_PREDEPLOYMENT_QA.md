# VERCEL PRE-DEPLOYMENT QA & PREVIEW TESTING PROTOCOL

**Audited Application:** Royal Business Machine  
**Target Environment:** Vercel Preview Deployment URL (`https://<project-name>-git-*.vercel.app`)  
**Standard:** 100% Functional, Visual, and Security Verification Before Production Cutover  

---

## 1. Preview Deployment Testing Objective

Before pointing the live domain `royalbusinessmachine.com` to Vercel, the website must undergo an end-to-end verification pass on its dedicated **Vercel Preview URL**.

This guarantees that all edge functions, database pools, authentication tokens, and responsive layouts perform in a cloud environment identical to production.

---

## 2. Comprehensive 16-Point QA Checklist

### Section A: Visual Layouts & Viewports
- [ ] **1. Homepage Visual Ergonomics:**
  - Verify that the first line of the hero heading (`Transforming Businesses Through`) is rendered in solid charcoal (`#181C21`) with sharp WCAG AAA contrast.
  - Verify that the second line (`Technology & Innovation`) displays the smooth champagne gold gradient.
  - Verify that the Enterprise Architecture Showcase Card displays live product cards (NyayaSetu AI, Dairy Muneem, Anti-Paper Leak).
  - Verify that the 4-item trust row renders with distinct icons and original labels.
- [ ] **2. All 23 Discovered Pages Accessible:**
  - Verify HTTP 200 responses and bespoke editorial layouts on:
    - `/`, `/about`, `/team`, `/achievements`
    - `/services`, `/services/web-development`, `/services/mobile-apps`, `/services/digital-marketing`, `/services/consulting`
    - `/projects`, `/portfolio` (307 redirect to `/projects`), `/industries`, `/process`
    - `/testimonials`, `/blog`, `/faq`, `/careers`, `/contact`
    - `/privacy`, `/terms`, `/login`, `/register`, `/client/dashboard`, `/admin/dashboard`
- [ ] **3. Responsive Viewport Scaling:**
  - Test at **1920px (Desktop Large)** — 2-column grid, zero container stretching.
  - Test at **1440px (Standard Desktop)** — Balanced typography and padding.
  - Test at **1024px (Small Laptop / Tablet Landscape)** — Smooth column adjustment.
  - Test at **768px (Tablet Portrait)** — Stacked layout, touch-friendly CTA sizing.
  - Test at **390px (Mobile)** — Zero horizontal overflow (`overflow-x: hidden`), hamburger menu fully operational.

### Section B: Interactivity & Core User Flows
- [ ] **4. Navigation & Dropdowns:**
  - Desktop hover on `Services` reveals 4 sub-services + directory link.
  - Desktop hover on `Solutions` reveals Industries, Process, and Achievements.
  - Desktop hover on `Company` reveals Team, Testimonials, Blog, Careers, and FAQ.
  - Mobile drawer opens cleanly on hamburger click; links are responsive and navigate without page lock.
- [ ] **5. Dynamic Category Filters:**
  - On `/services`: Clicking tabs (e.g. `Design & Brand Identity`) dynamically updates the service list.
  - On `/projects`: Clicking filter pills (e.g. `Mobile Apps`) isolates Dairy Muneem while filtering out ERP software.
- [ ] **6. FAQ Accordions:**
  - Expanding an accordion reveals full answer text; collapsing smoothly hides it.
- [ ] **7. Floating WhatsApp Button:**
  - Positioned at `bottom-5 right-5` (or `bottom-7 right-7` on desktop).
  - Clicking launches WhatsApp chat to `+91 9057287689` with pre-filled greeting.

### Section C: Live Backend & Database Integrations
- [ ] **8. Contact Form Submission (Live API & DB):**
  - Fill out `/contact` form with name, email, phone, company, and message.
  - Verify automatic phone sanitization (e.g. `+91 9057287689` → `9057287689`).
  - Verify submission proxies via Next.js rewrites to backend.
  - Verify HTTP 201 response and document creation in MongoDB `contacts` collection.
- [ ] **9. Client Authentication Flow:**
  - Log in via `/login` using verified client account (`client.qa@royalbusinessmachine.com`).
  - Verify JWT access token is stored in `localStorage`.
  - Verify automatic redirection to `/client/dashboard`.
- [ ] **10. Admin Authentication Flow:**
  - Log in via `/login` using admin account (`admin.qa@royalbusinessmachine.com`).
  - Verify JWT token issued with `role: "admin"`.
  - Verify automatic redirection to `/admin/dashboard`.
- [ ] **11. User Registration Flow:**
  - Register fresh account on `/register`.
  - Verify user document created with hashed password in MongoDB `users` collection.
- [ ] **12. Protected Dashboard Authorization:**
  - Verify that client dashboard displays ongoing projects and support desk.
  - Verify that admin dashboard displays executive KPI cards, recent inquiries, and lead triage.

### Section D: Performance, Assets & SEO
- [ ] **13. Asset & Emblem Loading:**
  - Verify official logo (`/assets/logo/logo.png`) and favicon load without 404s.
  - Verify Next.js image optimization is active with no layout shifts.
- [ ] **14. SEO Manifests & Metadata:**
  - Navigate to `/sitemap.xml`: verify XML format indexing all 23 routes.
  - Navigate to `/robots.txt`: verify rules shielding `/admin/` and `/client/`.
  - Verify OpenGraph title and image tags on social sharing preview.
- [ ] **15. HTTPS & SSL:**
  - Confirm valid TLS/SSL certificate with zero mixed-content browser warnings.
- [ ] **16. Browser Console Health:**
  - Confirm 0 uncaught JavaScript runtime errors in Chrome DevTools console.

---

*Once all 16 checklist items pass on the Vercel preview URL, request user approval for final domain cutover.*
