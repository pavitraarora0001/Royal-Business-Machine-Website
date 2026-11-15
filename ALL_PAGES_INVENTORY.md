# ALL PAGES INVENTORY — ROYAL BUSINESS MACHINE

**Project:** Royal Business Machine Enterprise Redesign  
**Audit Scope:** Complete Public Site, Portals, Legal & Specialty Pages  
**Total Identified Pages:** 23 Pages

---

## 1. Master Pages Directory

| # | Route URL | Page Title | Primary Purpose | Discovered Content Elements |
| :-: | :--- | :--- | :--- | :--- |
| **01** | `/` | Home | Corporate flagship landing page | Hero headline, animated value proposition, quick stats (50+ projects, 99% satisfaction), 8 core service previews, client proof, CTA banner, enterprise footer |
| **02** | `/about` | About Us | Company narrative & authority | Full business overview, mission, vision, core values, company timeline (2019–Present), executive leadership credentials, stats counters |
| **03** | `/services` | Our Services | Comprehensive service directory | 8 macro service categories, 40+ granular service items, tech stack details, category filtering, consultation CTAs |
| **04** | `/services/web-development` | Web Development | High-ticket web solutions | Custom web applications, enterprise dashboards, scalable SaaS portals, e-commerce architectures, security frameworks |
| **05** | `/services/mobile-apps` | Mobile Apps | iOS & Android engineering | Native apps, Flutter/React Native cross-platform, enterprise mobility, Dairy Muneem case study integration |
| **06** | `/services/digital-marketing` | Digital Marketing | ROI-driven growth engine | Search engine optimization (SEO), Google & Meta ads, high-converting social campaigns, B2B lead generation |
| **07** | `/services/consulting` | Startup & Business Consulting | Advisory & strategic execution | Startup launchpacks, pitch deck creation, financial models, institutional tender execution, MVP roadmap |
| **08** | `/projects` (and `/portfolio`) | Portfolio Showcase | Client proof & case studies | 50+ enterprise deployments, filterable categories (Websites, Software, Mobile Apps, Branding, Printing, Marketing), client names, impact metrics |
| **09** | `/contact` | Contact & Inquiries | Direct business communication | Interactive contact form, WhatsApp direct link, phone numbers, official email, Bharatpur HQ location map, response time SLA |
| **10** | `/achievements` | Achievements & Milestones | Track record of success | Five major milestones, startup scaling metrics, government contract highlights, impact timeline, performance badges |
| **11** | `/blog` | Insights & News | Thought leadership articles | 6 foundational in-depth articles covering 2026 tech trends, SaaS architecture, ROI marketing, pitch deck formulas, AI automation |
| **12** | `/careers` | Careers & Culture | Talent acquisition | Company culture, employee benefits & perks, open positions (Senior Full Stack, UI/UX Lead, AI/ML Engineer), resume application modal |
| **13** | `/faq` | FAQ | Customer guidance & trust | Interactive accordions addressing timelines, pricing, support, startup advisory, printing capabilities, tech stacks |
| **14** | `/industries` | Industries We Empower | Vertical-specific solutions | 10 specialized industries (Education, Healthcare, Retail, Manufacturing, Hospitality, Real Estate, Logistics, Agriculture, Government, Finance) |
| **15** | `/process` | 7-Step Delivery Process | Agile delivery transparency | 1. Discovery, 2. Strategy, 3. Design, 4. Development, 5. Testing, 6. Deployment, 7. 24/7 Support |
| **16** | `/team` | Leadership & Engineering | Trust and human expertise | Founder & CEO Pavitra Arora, technical directors, engineers, designers, project managers, social links & skill tags |
| **17** | `/testimonials` | Client Testimonials | Authentic client validation | 5-star rating reviews, quotes from regional enterprises (Patel Enterprises, Pavitra Enterprise, regional institutions), interactive slider |
| **18** | `/privacy` | Privacy Policy | Regulatory compliance | Data collection policies, user rights, cookies, analytics transparency, Indian IT Act compliance |
| **19** | `/terms` | Terms of Service | Commercial terms & agreements | Intellectual property, scope of service, payment milestones, liability limits, dispute resolution |
| **20** | `/login` | Client & Admin Login | Secure portal access | Email/password input, OTP authentication, remember me, password recovery link, RBAC redirect |
| **21** | `/register` | User Registration | Client onboarding | Full name, corporate email, phone, business name, password strength meter, email OTP verification |
| **22** | `/client/dashboard` | Client Portal | Active client management | Ongoing project milestones, deliverables, invoice history, payment verification, direct support ticket |
| **23** | `/admin/dashboard` | Admin Center | Operations control | Lead funnel metrics, inquiry logs, revenue analytics, service catalog management, user accounts |

---

## 2. Navigation & Information Architecture

```
Navbar (Global)
 ├── Home (/)
 ├── About (/about)
 ├── Services (/services)
 │    ├── Web Development (/services/web-development)
 │    ├── Mobile Apps (/services/mobile-apps)
 │    ├── Digital Marketing (/services/digital-marketing)
 │    └── Business Consulting (/services/consulting)
 ├── Portfolio (/projects)
 ├── Solutions
 │    ├── Industries (/industries)
 │    ├── Delivery Process (/process)
 │    └── Achievements (/achievements)
 ├── Company
 │    ├── Leadership Team (/team)
 │    ├── Insights & Blog (/blog)
 │    ├── Careers (/careers)
 │    ├── Client Testimonials (/testimonials)
 │    └── FAQ (/faq)
 ├── Contact (/contact)
 └── Client Portal (/login)

Footer (Global)
 ├── Brand Column: Logo, Tagline, Mission, Social Media Icons (LinkedIn, X, Instagram, Facebook)
 ├── Quick Navigation: About, Portfolio, Team, Careers, Blog, FAQ
 ├── Core Services: IT Development, Digital Marketing, Physical Printing, Startup Support, EdTech, AI Automation
 ├── Direct Contact: Phone (+91 9057287689 / 7727887850), Email (royalbusinessmachine@gmail.com), Bharatpur HQ
 └── Legal Bar: Copyright © 2026 Royal Business Machine, Privacy Policy, Terms of Service
```

---

## 3. Page Structure Standards

Every single reconstructed page implements:
1. **Dynamic SEO Metadata:** Bespoke `<title>`, `<meta description>`, Open Graph tags, canonical URLs, and schema markup.
2. **Unified Navigation & Footer:** Consistent header with smooth desktop dropdowns and responsive mobile drawer.
3. **Warm Luxury Design System:** Warm White (`#F7F7F5`), Deep Charcoal (`#20252B`), Slate (`#64748B`), and Champagne Gold (`#B69A69`) accents.
4. **Interactive Micro-animations:** Gentle scroll reveals and hover state transitions via Framer Motion without heavy computational overhead.
5. **Actionable CTAs:** Direct booking, phone dialing, WhatsApp chat handoff, or contact form trigger.
