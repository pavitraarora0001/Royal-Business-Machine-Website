import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://royalbusinessmachine.com";
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/services/web-development", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/mobile-apps", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/digital-marketing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/consulting", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/industries", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/process", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/achievements", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/team", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/careers", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
