import type { Metadata } from "next";
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  title: "Enterprise Portfolio & Case Studies (50+ Deployments)",
  description:
    "Explore verified deployments delivered by Royal Business Machine across healthcare (HMS), dairy logistics (Dairy Muneem), government colleges, e-commerce, and industrial enterprises.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
