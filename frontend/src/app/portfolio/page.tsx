import type { Metadata } from "next";
import { ProjectsClient } from "../projects/projects-client";

export const metadata: Metadata = {
  title: "Enterprise Portfolio & Solutions (50+ Deployments) | Royal Business Machine",
  description:
    "Explore our technology, automation, and digital growth solutions across Application Development, AI & Automation, Digital Marketing, Web Solutions, and SEO.",
  alternates: {
    canonical: "https://www.royalbusinessmachine.com/projects",
  },
};

export default function PortfolioPage() {
  return <ProjectsClient />;
}
