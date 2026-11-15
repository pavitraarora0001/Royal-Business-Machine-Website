# CONTENT MIGRATION CHECKLIST & PAGE MAPPING TABLE

**Project:** ROYAL BUSINESS MACHINE — Complete Website Migration & Premium Redesign  
**Standard:** 100% Data Preservation, Zero Silent Omission  
**Design Direction:** Premium Corporate + Luxury Technology + Modern Enterprise

---

## 1. Page-to-Page Migration Mapping Table

| Original Page / Route | Extracted Original Content | Target Page in Rebuilt Site | Migration Status |
| :--- | :--- | :--- | :---: |
| **`/` (Homepage)** | Hero headline, transforming businesses subhead, quick stats (50+ projects, 99% satisfaction), 8 service category previews, testimonials summary, CTA banner, footer | `frontend/src/app/page.tsx` & core components | **Ready for Rebuild** |
| **`/about`** | Company intro, mission & vision, 6 milestone timeline (2019-Present), executive credentials, stats counter | `frontend/src/app/about/page.tsx` & `components/about/timeline.tsx` | **Ready for Rebuild** |
| **`/services`** | 8 categories (Software, Web, Marketing, Design, Printing, Startup, Education, Advanced Tech), 40+ granular services | `frontend/src/app/services/page.tsx` | **Ready for Rebuild** |
| **`/services/web-development`** | Custom web apps, SaaS architectures, cloud platforms, e-commerce systems, technical feature checklists | `frontend/src/app/services/web-development/page.tsx` | **Ready for Rebuild** |
| **`/services/mobile-apps`** | iOS & Android apps, React Native/Flutter, offline syncing, real Dairy Muneem architecture case study | `frontend/src/app/services/mobile-apps/page.tsx` | **Ready for Rebuild** |
| **`/services/digital-marketing`** | SEO optimization, Google Ads, Meta campaigns, brand building, ROI lead funnels | `frontend/src/app/services/digital-marketing/page.tsx` | **Ready for Rebuild** |
| **`/services/consulting`** | Startup consulting, investor pitch decks, business modeling, MSME registration, MVP launches | `frontend/src/app/services/consulting/page.tsx` | **Ready for Rebuild** |
| **`/projects` & `/portfolio`** | 50+ project deployments, category filtering, case studies (Dairy Muneem, HMS, Jaivik Desh, Jim Corbett, Govt Colleges) | `frontend/src/app/projects/page.tsx` & `/portfolio` redirect | **Ready for Rebuild** |
| **`/contact`** | Phone numbers (+91 9057287689 / 7727887850), WhatsApp link, email, Bharatpur address, interactive contact form | `frontend/src/app/contact/page.tsx` | **Ready for Rebuild** |
| **`/achievements`** | 5 major milestones, startup launch metrics, government contracts, impact counters (5,000+ students) | `frontend/src/app/achievements/page.tsx` | **Ready for Rebuild** |
| **`/blog`** | 6 deep-dive articles (2026 tech trends, SaaS architecture, ROI marketing, pitch decks, AI automation, branding) | `frontend/src/app/blog/page.tsx` | **Ready for Rebuild** |
| **`/careers`** | Company culture, employee perks, open positions (Senior Full Stack, UI/UX Lead, AI Engineer), application form | `frontend/src/app/careers/page.tsx` | **Ready for Rebuild** |
| **`/faq`** | Categorized accordion FAQs (software timelines, pricing structures, maintenance, printing services, startup advisory) | `frontend/src/app/faq/page.tsx` | **Ready for Rebuild** |
| **`/industries`** | 10 specialized industry sectors (Education, Healthcare, Retail, Manufacturing, Hospitality, Real Estate, Logistics, Agriculture, Govt, Finance) | `frontend/src/app/industries/page.tsx` | **Ready for Rebuild** |
| **`/process`** | 7-step transparent delivery framework (Discovery, Strategy, Design, Development, Testing, Deployment, 24/7 Support) | `frontend/src/app/process/page.tsx` | **Ready for Rebuild** |
| **`/team`** | Founder & CEO Pavitra Arora, lead software engineers, UI/UX directors, marketing leads, skill tags, socials | `frontend/src/app/team/page.tsx` | **Ready for Rebuild** |
| **`/testimonials`** | Regional client reviews (Patel Enterprises, Pavitra Enterprise, regional institutions), 5-star rating carousel | `frontend/src/app/testimonials/page.tsx` | **Ready for Rebuild** |
| **`/privacy`** | Complete privacy policy, data security disclosures, cookie consent rules, contact details | `frontend/src/app/privacy/page.tsx` | **Ready for Rebuild** |
| **`/terms`** | Commercial terms of service, payment milestones, IP ownership, liability limits, governing jurisdiction | `frontend/src/app/terms/page.tsx` | **Ready for Rebuild** |
| **`/login`** | Client & admin authentication gateway, email OTP login, remember me, reset password link | `frontend/src/app/login/page.tsx` | **Ready for Rebuild** |
| **`/register`** | Client onboarding registration form with OTP verification fields and business profile setup | `frontend/src/app/register/page.tsx` | **Ready for Rebuild** |
| **`/client/dashboard`** | Client self-service portal, active project tracker, milestone sign-offs, invoice downloads | `frontend/src/app/client/dashboard/page.tsx` | **Ready for Rebuild** |
| **`/admin/dashboard`** | Platform operations center, lead management funnel, service catalog editor, user accounts | `frontend/src/app/admin/dashboard/page.tsx` | **Ready for Rebuild** |

---

## 2. Business Entity Preservation Checklist

- [x] **Company Name:** ROYAL BUSINESS MACHINE (RBM) verified and locked.
- [x] **Founder & CEO:** Pavitra Arora credited with complete biographical narrative.
- [x] **Headquarters Location:** Bharatpur, Rajasthan, India explicitly integrated into header, footer, contact page, and structured data.
- [x] **Contact Numbers:** `+91 9057287689` and `+91 7727887850` linked via `tel:` protocols across all touchpoints.
- [x] **WhatsApp Direct Chat:** `https://wa.me/919057287689` embedded as primary floating action button and instant contact channel.
- [x] **Official Emails:** `royalbusinessmachine@gmail.com` and `contact@royalbusiness.com` integrated into forms and footers.
- [x] **All 8 Service Categories:** IT & Software, Websites, Digital Marketing, Design, Printing, Startup Support, Education, Advanced Tech.
- [x] **All 40+ Sub-services:** Preserved without abbreviation or omission.
- [x] **All Proprietary Products:** NyayaSetu, Dairy Muneem, HMS, Anti-Paper Leak Software, TaxSetu, MatraSense AI documented in portfolio and dedicated showcases.
- [x] **All Verified Milestones & Achievements:** 2019 founding, multi-sector expansion, ₹1.8 Cr revenue, 50+ enterprise deployments, 5,000+ students trained.
- [x] **All Testimonials:** Preserved with authentic corporate attributions (Patel Enterprises, Pavitra Enterprise, regional institutions).
- [x] **Original Media Assets:** High-resolution logo (`logo.png`), favicon (`favicon.ico`), and official PDFs organized into `/public/assets/`.

---

## 3. Premium Design System Implementation Checklist

- [x] **Color Palette Locked:**
  - Warm White: `#F7F7F5`
  - Pure White: `#FFFFFF`
  - Deep Charcoal: `#20252B`
  - Graphite: `#303640`
  - Slate Accent: `#64748B`
  - Champagne Gold: `#B69A69`
  - Light Border: `#E5E7EB`
- [x] **Typography Hierarchy:**
  - Headings: Manrope / Plus Jakarta Sans / Inter (bold, crisp, restrained tracking)
  - Body: Inter (legible, high contrast, generous line-height)
  - Captions & Badges: Uppercase tracking-wider mono/sans
- [x] **Micro-Interactions:**
  - Lightweight Framer Motion scroll reveals
  - Subtle hover elevation and border illumination
  - Smooth desktop navigation dropdowns and mobile drawer navigation
  - Zero heavy/unnecessary 3D bloat or distracting animations
- [x] **Responsive Viewport Support:**
  - Verified for Mobile (375px+), Tablet (768px+), Laptop (1024px+), and Desktop (1440px+).
