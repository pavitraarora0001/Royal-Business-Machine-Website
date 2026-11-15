import mongoose from 'mongoose';
import User from './models/User.js';
import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';
import Blog from './models/Blog.js';
import PageContent from './models/PageContent.js';
import Setting from './models/Setting.js';
import ClientTestimonial from './models/ClientTestimonial.js';
import TeamMember from './models/TeamMember.js';
import Career from './models/Career.js';

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-business-machine');
    console.log('Connected to MongoDB. Seeding CMS & Website Data...');

    // 1. Super Admin User
    let superAdmin = await User.findOne({ email: 'admin@royalbusinessmachine.com' });
    if (!superAdmin) {
        superAdmin = new User({
            name: 'Pavitra Arora',
            email: 'admin@royalbusinessmachine.com',
            phone: '9057287689',
            password: 'Royal@Admin2026',
            role: 'super_admin',
            isVerified: true,
            company: 'Royal Business Machine'
        });
        await superAdmin.save();
        console.log('✓ Super Admin created: admin@royalbusinessmachine.com / Royal@Admin2026');
    } else {
        superAdmin.role = 'super_admin';
        superAdmin.isVerified = true;
        await superAdmin.save();
        console.log('✓ Super Admin verified');
    }

    // 2. Website Settings
    let setting = await Setting.findOne();
    if (!setting) {
        setting = await Setting.create({
            companyName: 'Royal Business Machine',
            tagline: 'Enterprise Technology, Software Architecture & High-Concurrency Systems',
            logoUrl: '/assets/logo/logo-horizontal.png',
            logoStackedUrl: '/assets/logo/logo-stacked.png',
            faviconUrl: '/icon.png',
            primaryPhone: '+91 9057287689',
            secondaryPhone: '+91 7727887850',
            whatsappNumber: '+91 9057287689',
            primaryEmail: 'royalbusinessmachine@gmail.com',
            secondaryEmail: 'contact@royalbusiness.com',
            address: {
                headquarters: 'Bharatpur, Rajasthan, India',
                regionalCenters: 'Bharatpur, Karauli, Alwar, Dholpur, Jaipur & National Deployments'
            },
            businessHours: 'Monday – Saturday: 09:00 AM – 07:00 PM IST',
            socialLinks: {
                linkedin: 'https://www.linkedin.com/company/royal-business-machine',
                twitter: 'https://twitter.com/royalbizmachine',
                github: 'https://github.com/pavitraarora0001',
                facebook: '#',
                instagram: '#'
            },
            footerContent: {
                copyrightNotice: '© 2018–2026 ROYAL BUSINESS MACHINE. All Rights Reserved.',
                disclaimer: 'Turnkey Enterprise Execution Partner across software, cloud, and physical infrastructure.'
            }
        });
        console.log('✓ Website settings seeded');
    }

    // 3. Services Data (8 core enterprise services)
    const initialServices = [
        {
            title: "Web & Enterprise Cloud Applications",
            category: "Web & SaaS Engineering",
            shortDescription: "Custom Next.js 16 platforms, SaaS portals, and high-concurrency microservices.",
            description: "End-to-end full-stack web architectures built with React, Next.js, and Node.js. Optimized for ultra-low latency, bank-grade encryption, and seamless database scaling.",
            icon: "Globe2",
            order: 1,
            priceType: "custom",
            features: ["Next.js 16 Server Components", "High-concurrency microservices", "Role-based access control (RBAC)", "Enterprise Redis & PostgreSQL"],
            technologies: ["Next.js", "React 19", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
            isFeatured: true,
            isActive: true
        },
        {
            title: "Mobile App Development",
            category: "Mobile Apps & Logistics",
            shortDescription: "Native and cross-platform iOS & Android mobile applications with offline sync.",
            description: "High-performance mobile solutions built for rural and urban deployments. Features background GPS tracking, biometric security, and offline computational engines.",
            icon: "Smartphone",
            order: 2,
            priceType: "custom",
            features: ["React Native & Flutter pipelines", "Offline-first data sync", "Biometric authentication", "Real-time SMS & Push dispatches"],
            technologies: ["React Native", "Flutter", "Node.js", "SQLite", "Firebase", "WebSockets"],
            isFeatured: true,
            isActive: true
        },
        {
            title: "Digital Marketing & Performance SEO",
            category: "Growth & Visibility",
            shortDescription: "Data-driven SEO campaigns, high-ROAS Meta/Google Ads, and conversion funnels.",
            description: "Architecting sustainable organic visibility and high-converting acquisition pipelines. From technical SEO audits to localized multi-lingual ad funnels.",
            icon: "Sparkles",
            order: 3,
            priceType: "custom",
            features: ["Technical Core Web Vitals audits", "Search Engine Optimization (SEO)", "PPC Google Ads funnels", "Conversion Rate Optimization (CRO)"],
            technologies: ["Google Analytics 4", "Search Console", "Meta Ads Manager", "Schema.org"],
            isFeatured: true,
            isActive: true
        },
        {
            title: "Startup & Venture Consulting",
            category: "Strategy & Advisory",
            shortDescription: "Investor pitch decks, financial models, MSME registrations, and MVP sprints.",
            description: "Mentorship and execution consulting led by Founder & CEO Pavitra Arora. Transforming raw product visions into fundable, scalable market assets.",
            icon: "Briefcase",
            order: 4,
            priceType: "custom",
            features: ["15-page institutional pitch decks", "TAM/SAM/SOM financial models", "4-week rapid MVP delivery", "Government grant advisory"],
            technologies: ["Financial Modeling", "Lean Canvas", "Figma", "Pitch Architecture"],
            isFeatured: true,
            isActive: true
        },
        {
            title: "Corporate Design & Brand Identity",
            category: "Design & UX",
            shortDescription: "Design systems, typography tokens, vector logos, and complete brand guidelines.",
            description: "Establishing prestige brand identities that demand authority. From luxury corporate palettes to comprehensive digital and physical collateral standards.",
            icon: "Layers",
            order: 5,
            priceType: "custom",
            features: ["Complete brand guidelines & stylebooks", "Vector logos & iconography", "High-fidelity Figma prototypes", "Design token systems"],
            technologies: ["Figma", "Adobe Illustrator", "Photoshop", "Design Tokens"],
            isActive: true
        },
        {
            title: "Physical Printing & Collateral Press",
            category: "Physical Infrastructure",
            shortDescription: "In-house commercial printing: 450+ GSM cards, gold foil embossing, and PVC cards.",
            description: "Commercial printing setup delivering tactile prestige. Metallic gold foil stamping, matte velvet lamination, NFC smart cards, and heavy-duty brochures.",
            icon: "Printer",
            order: 6,
            priceType: "custom",
            features: ["450+ GSM velvet visiting cards", "Embossed metallic gold foil stamping", "Student & employee PVC ID cards", "Packaging boxes & apparel tags"],
            technologies: ["Heidelberg Presses", "Spot UV", "Thermal Lamination", "NFC Chips"],
            isActive: true
        },
        {
            title: "Applied AI & E-Governance Solutions",
            category: "Applied AI",
            shortDescription: "Assistive legal AI (NyayaSetu), examination security, and smart public kiosks.",
            description: "Pioneering deterministic rule engines and vector retrieval for governance. Preventing paper leaks and automating citizen incident reporting.",
            icon: "Cpu",
            order: 7,
            priceType: "custom",
            features: ["BNS/IPC legal incident mapping", "Traceable candidate watermarking", "Deterministic rule engines", "Human-in-the-loop explainability"],
            technologies: ["Python", "FastEmbed", "PostgreSQL", "LangChain", "Vector DB"],
            isFeatured: true,
            isActive: true
        },
        {
            title: "Institutional Labs & Campus Hardware",
            category: "Campus Infrastructure",
            shortDescription: "Smart classrooms, turnkey computer laboratories, and institutional IT AMC contracts.",
            description: "Equipping schools and colleges with cutting-edge digital learning environments. Turnkey server setups, networking cabling, and AMC SLAs.",
            icon: "GraduationCap",
            order: 8,
            priceType: "custom",
            features: ["Smart interactive panels", "Gigabit local area networking", "Annual maintenance contracts (AMCs)", "Power backup UPS architectures"],
            technologies: ["Cisco Switches", "Cat6 Cabling", "Linux Terminals", "UPS Redundancy"],
            isActive: true
        }
    ];

    for (const s of initialServices) {
        const exists = await Service.findOne({ title: s.title });
        if (!exists) {
            await Service.create(s);
        }
    }
    console.log('✓ Services seeded');

    // 4. Portfolio Projects (16 authentic deployments)
    const initialProjects = [
        {
            title: "Dairy Muneem — Milk Procurement & Logistics App",
            category: "Mobile Apps",
            client: "Regional Dairy Cooperative & Procurement Centers",
            contractValue: "₹2,50,000 Contract",
            description: "End-to-end mobile logistics software featuring a real-time Milk Fat and SNF computational pricing engine, automated daily farmer ledger updates, and SMS slip generation.",
            challenge: "Manual dairy registers led to frequent calculation disputes, ledger errors, and delayed payments to rural dairy farmers.",
            solution: "Engineered an offline-first mobile app with dynamic FAT/SNF rate charts and instant thermal receipt printing.",
            results: "Reduced procurement calculation errors by 98%; operates offline seamlessly across 40+ rural collection centers.",
            technologies: ["React Native", "Node.js", "Express", "MongoDB", "SMS Gateway"],
            isFeatured: true,
            isActive: true,
            order: 1
        },
        {
            title: "HMS — Multi-Specialty Hospital Management System",
            category: "Enterprise Software",
            client: "Private Healthcare Group & Clinical Centers",
            contractValue: "₹3,50,000 Contract",
            description: "Centralized hospital ERP featuring electronic health records (EHR), OPD/IPD flows, doctor prescription pads, in-house pharmacy inventory, and lab report QR verification.",
            challenge: "Fragmented patient medical records caused long discharge delays and pharmacy stock discrepancies.",
            solution: "Deployed a centralized hospital management system with multi-role access for doctors, nurses, pharmacists, and billing desks.",
            results: "Cut patient discharge waiting times from 3 hours to under 25 minutes; eliminated paper chart losses entirely.",
            technologies: ["React", "Next.js", "PostgreSQL", "Docker", "HL7 Standard"],
            isFeatured: true,
            isActive: true,
            order: 2
        },
        {
            title: "Govt College Bharatpur — Official Institutional Portal",
            category: "Government & Education",
            client: "Government College, Bharatpur (Higher Education Dept)",
            contractValue: "₹50,000 Contract",
            description: "High-security institutional web portal featuring automated student noticeboard PDF dispatches, faculty directories, and admissions inquiry workflows.",
            challenge: "High traffic during examination result announcements frequently crashed legacy college websites.",
            solution: "Architected a Next.js static and dynamic portal with CDN caching and WCAG 2.1 accessibility compliance.",
            results: "Handled over 100,000 concurrent page requests during annual examination cycles with 100% server uptime.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WCAG 2.1 Accessibility", "Cloud CDN"],
            isFeatured: true,
            isActive: true,
            order: 3
        },
        {
            title: "NyayaSetu — AI Legal Awareness & FIR Assistant",
            category: "Enterprise Software",
            client: "E-Governance Pilot & Legal Aid Platforms",
            contractValue: "Proprietary IP",
            description: "AI-powered, SaaS e-governance platform mapping citizen incident narratives into verified IPC/BNS sections with structured FIR drafting assistance for police.",
            challenge: "Citizens struggle to formulate clear incident reports with relevant legal sections, burdening local police desks.",
            solution: "Built a deterministic legal rule engine combining embeddings with human-in-the-loop explainable FIR drafts.",
            results: "Significantly reduces FIR preparation times while maintaining strict human-in-the-loop legal explainability.",
            technologies: ["Python", "FastEmbed", "Next.js", "PostgreSQL", "Deterministic Rule Engine"],
            isFeatured: true,
            isActive: true,
            order: 4
        }
    ];

    for (const p of initialProjects) {
        const exists = await Portfolio.findOne({ title: p.title });
        if (!exists) {
            await Portfolio.create(p);
        }
    }
    console.log('✓ Portfolio projects seeded');

    // 5. Team Members
    const initialTeam = [
        {
            name: "Pavitra Arora",
            role: "Founder & Chief Executive Officer",
            badge: "Executive Leadership",
            bio: "Entrepreneur building India's integrated business infrastructure platform. 6+ years driving enterprise deployments, government college portals, and creator of NyayaSetu & Dairy Muneem.",
            skills: ["Business Strategy", "Institutional Execution", "SaaS Product Architecture", "Venture Growth"],
            socials: {
                linkedin: "https://www.linkedin.com/company/royal-business-machine",
                twitter: "https://twitter.com/royalbizmachine",
                mail: "mailto:royalbusinessmachine@gmail.com"
            },
            isFeatured: true,
            isActive: true,
            order: 1
        },
        {
            name: "A. Sterling",
            role: "Chief Technology Officer & Cloud Architect",
            badge: "Engineering",
            bio: "Specializing in high-concurrency microservices, cloud deployments on AWS/GCP, distributed databases, and high-security enterprise ERP systems.",
            skills: ["Next.js / React 19", "Node.js & Go", "PostgreSQL & Redis", "Cloud Security"],
            isFeatured: false,
            isActive: true,
            order: 2
        },
        {
            name: "Sarah Chen",
            role: "Lead Full-Stack Software Engineer",
            badge: "Core Engineering",
            bio: "Leads frontend engineering and mobile app development across iOS and Android ecosystems, with deep expertise in offline synchronization.",
            skills: ["React Native", "Flutter", "TypeScript", "Tailwind CSS"],
            isFeatured: false,
            isActive: true,
            order: 3
        }
    ];

    for (const t of initialTeam) {
        const exists = await TeamMember.findOne({ name: t.name });
        if (!exists) {
            await TeamMember.create(t);
        }
    }
    console.log('✓ Team members seeded');

    // 6. Careers
    const initialCareers = [
        {
            title: "Senior Full-Stack Software Engineer",
            department: "Engineering",
            location: "Bharatpur HQ / Hybrid",
            type: "Full-Time",
            experience: "3+ Years",
            desc: "Lead the architecture and implementation of Next.js 16, React 19, and Node.js microservices for our enterprise ERP and portal clients.",
            requirements: [
                "Extensive experience with TypeScript, Next.js, and Node.js",
                "Proficiency with PostgreSQL, MongoDB, and Redis caching",
                "Knowledge of Docker containers and CI/CD pipelines"
            ],
            isActive: true,
            order: 1
        },
        {
            title: "UI/UX Product Designer",
            department: "Design & Brand",
            location: "Bharatpur HQ / Hybrid",
            type: "Full-Time",
            experience: "2+ Years",
            desc: "Craft luxury design systems, intuitive user flows, and interactive Figma prototypes across our corporate and SaaS product lines.",
            requirements: [
                "Mastery of Figma, component libraries, and design tokens",
                "Portfolio demonstrating responsive web and mobile application ergonomics",
                "Understanding of frontend CSS framework constraints"
            ],
            isActive: true,
            order: 2
        }
    ];

    for (const c of initialCareers) {
        const exists = await Career.findOne({ title: c.title });
        if (!exists) {
            await Career.create(c);
        }
    }
    console.log('✓ Careers seeded');

    // 7. Client Testimonials
    const initialTestimonials = [
        {
            clientName: "Dr. Vikram Seth",
            company: "Regional Medical Institute & Multi-Specialty Clinics",
            designation: "Medical Director",
            testimonial: "Royal Business Machine delivered our complete Hospital Management System on schedule. Patient discharge waiting times dropped from 3 hours to under 25 minutes.",
            rating: 5,
            verifiedProject: "HMS Hospital Management System",
            isFeatured: true,
            isActive: true,
            order: 1
        },
        {
            clientName: "M. Choudhary",
            company: "Regional Dairy Cooperative Federation",
            designation: "Operations Head",
            testimonial: "Dairy Muneem operates flawlessly across 40+ rural collection centers, even with spotty cellular coverage. Farmer ledger disputes have been completely eliminated.",
            rating: 5,
            verifiedProject: "Dairy Muneem Logistics App",
            isFeatured: true,
            isActive: true,
            order: 2
        },
        {
            clientName: "Principal Officer",
            company: "Government College Bharatpur",
            designation: "Higher Education Administration",
            testimonial: "During peak examination announcements, our college website effortlessly sustained 100,000+ simultaneous visitors with zero server downtime. Exemplary engineering.",
            rating: 5,
            verifiedProject: "Official College Web Portal",
            isFeatured: true,
            isActive: true,
            order: 3
        }
    ];

    for (const item of initialTestimonials) {
        const exists = await ClientTestimonial.findOne({ clientName: item.clientName });
        if (!exists) {
            await ClientTestimonial.create(item);
        }
    }
    console.log('✓ Testimonials seeded');

    // 8. Blog Articles
    const initialBlogs = [
        {
            title: "Architecting High-Concurrency Portals with Next.js 16 and Redis",
            slug: "architecting-high-concurrency-portals-nextjs-16",
            excerpt: "How we scaled institutional education portals to sustain over 100,000 concurrent users without infrastructure downtime.",
            content: `Building web applications that survive viral traffic surges requires deliberate architectural decoupling. In our recent rollout for regional government institutions, we migrated legacy monolithic servers to a modern Next.js 16 architecture backed by edge CDN caching and distributed Redis layers.

Key architectural strategies implemented:
1. Static Site Generation (SSG) with on-demand incremental cache revalidation.
2. Intelligent database connection pooling preventing connection exhaustion under heavy load.
3. Edge rate limiting and bot filtering protecting serverless compute quotas.
4. WCAG 2.1 compliance ensuring all students with varying connectivity and accessibility needs can access results seamlessly.`,
            category: "Engineering & Cloud",
            tags: ["Next.js", "Redis", "Cloud Architecture", "Performance"],
            author: "Pavitra Arora",
            status: "published",
            publishedAt: new Date("2026-11-01"),
            isFeatured: true
        },
        {
            title: "Digitizing Rural Dairy Logistics: The Tech Behind Dairy Muneem",
            slug: "digitizing-rural-dairy-logistics-dairy-muneem",
            excerpt: "Overcoming intermittent rural network connectivity with offline-first mobile databases and dynamic Fat/SNF computational engines.",
            content: `In emerging agricultural markets, technology must work reliably even when cellular data is completely unavailable. Dairy Muneem was designed from the ground up as an offline-first mobile logistics application.

By implementing local SQLite encryption with background event queue synchronization, rural collection operators can calculate farmer payments in sub-second latency regardless of cellular coverage. Once an internet signal is detected, transactions securely sync to centralized PostgreSQL clusters.`,
            category: "Mobile Architecture",
            tags: ["React Native", "Offline First", "Logistics", "Fintech"],
            author: "Pavitra Arora",
            status: "published",
            publishedAt: new Date("2026-11-08"),
            isFeatured: true
        }
    ];

    for (const b of initialBlogs) {
        const exists = await Blog.findOne({ slug: b.slug });
        if (!exists) {
            await Blog.create(b);
        }
    }
    console.log('✓ Blogs seeded');

    // 9. Website CMS Managed Pages
    const pages = [
        {
            pageSlug: 'home',
            title: 'Royal Business Machine — Complete Business & Tech Solutions',
            subtitle: 'Empowering India’s Businesses with Scalable Software, Mobile Apps & Complete Digital Infrastructure',
            sections: [
                {
                    sectionKey: 'hero',
                    title: 'Empowering India’s Businesses with Scalable Software',
                    subtitle: 'From custom enterprise software, mobile app logistics, to commercial printing and startup advisory, Royal Business Machine delivers complete execution under one roof.',
                    badge: 'Turnkey Technology Execution Partner',
                    ctaText: 'Schedule Strategy Call',
                    ctaLink: '/contact',
                    secondaryCtaText: 'Explore Proven Solutions',
                    secondaryCtaLink: '/services',
                    isVisible: true,
                    order: 1
                },
                {
                    sectionKey: 'stats',
                    title: 'Proven Track Record',
                    subtitle: 'Demonstrated enterprise execution across public and private sectors.',
                    isVisible: true,
                    order: 2,
                    customData: {
                        deployments: '50+',
                        revenue: '₹1.8 Cr+',
                        retention: '99%',
                        studentsTrained: '5,000+'
                    }
                },
                {
                    sectionKey: 'services_preview',
                    title: 'Enterprise Services & Capabilities',
                    subtitle: 'Comprehensive digital engineering, physical infrastructure, and strategic consulting.',
                    isVisible: true,
                    order: 3
                },
                {
                    sectionKey: 'case_studies',
                    title: 'Flagship Deployments & Impact',
                    subtitle: 'Real-world software architectures driving enterprise outcomes across India.',
                    isVisible: true,
                    order: 4
                },
                {
                    sectionKey: 'cta_banner',
                    title: 'Ready to Transform Your Business with Scalable Technology?',
                    subtitle: 'Partner with ROYAL BUSINESS MACHINE for custom software, mobile applications, digital marketing funnels, and institutional infrastructure.',
                    ctaText: 'Schedule Strategy Call',
                    ctaLink: '/contact',
                    isVisible: true,
                    order: 5
                }
            ]
        },
        {
            pageSlug: 'about',
            title: 'About Royal Business Machine — History, Mission & Leadership',
            subtitle: 'Founded by Pavitra Arora, Royal Business Machine has grown from a regional technology consultancy into an enterprise infrastructure leader.',
            sections: [
                {
                    sectionKey: 'hero',
                    title: 'Engineering Digital Infrastructure for India’s Growth',
                    subtitle: 'From local roots in Bharatpur, Rajasthan to nationwide deployments, we combine software craftsmanship with physical production capacity.',
                    badge: 'Our Journey & Heritage',
                    isVisible: true,
                    order: 1
                },
                {
                    sectionKey: 'timeline',
                    title: 'Our Evolution & Growth Milestones',
                    subtitle: 'Key turning points in building an integrated technology enterprise.',
                    isVisible: true,
                    order: 2
                }
            ]
        },
        {
            pageSlug: 'services',
            title: 'Enterprise Services & Solutions Catalog',
            subtitle: '40+ specialized deliverables spanning software engineering, cloud, mobile apps, printing and venture advisory.',
            sections: [
                {
                    sectionKey: 'header',
                    title: 'Enterprise Solutions & Services',
                    subtitle: 'Tailored technology and infrastructure packages for emerging businesses, institutions, and startups.',
                    badge: 'Comprehensive Capabilities',
                    isVisible: true,
                    order: 1
                }
            ]
        },
        {
            pageSlug: 'projects',
            title: 'Enterprise Portfolio & Client Case Studies',
            subtitle: 'Explore authentic, high-impact software architectures, mobile apps, and government college portals.',
            sections: [
                {
                    sectionKey: 'header',
                    title: 'Proven Deployments & Case Studies',
                    subtitle: 'Real implementations with verified business outcomes.',
                    badge: 'Verified Deployments (50+)',
                    isVisible: true,
                    order: 1
                }
            ]
        },
        {
            pageSlug: 'contact',
            title: 'Contact Royal Business Machine Headquarters',
            subtitle: 'Direct operations desk for project scoping, confidential proposals, and executive strategy calls.',
            sections: [
                {
                    sectionKey: 'header',
                    title: 'Contact Royal Business Machine',
                    subtitle: 'Whether you require enterprise custom software or physical printing, our team is ready to scope your project.',
                    badge: 'Direct Operations Channel',
                    isVisible: true,
                    order: 1
                }
            ]
        }
    ];

    for (const p of pages) {
        const exists = await PageContent.findOne({ pageSlug: p.pageSlug });
        if (!exists) {
            await PageContent.create(p);
        }
    }
    console.log('✓ CMS Managed Pages seeded');

    console.log('\n=========================================');
    console.log('✅ CMS SEEDING COMPLETE');
    console.log('=========================================');
    await mongoose.disconnect();
}

seed().catch(console.error);
