import { MetadataRoute } from "next";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio-data";
import { ALL_SERVICES } from "@/data/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.royalbusinessmachine.com";
  const now = new Date();

  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/industries", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/process", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/achievements", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/team", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/careers", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const staticEntries = coreRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Dynamic 17 Dedicated Service Routes
  const serviceEntries = ALL_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Case Studies (both /portfolio/ and /projects/ aliases)
  const portfolioEntries = PORTFOLIO_PROJECTS.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries];
}
