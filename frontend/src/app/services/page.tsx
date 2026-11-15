import type { Metadata } from "next";
import { ServicesDirectoryClient } from "./services-client";

export const metadata: Metadata = {
  title: "Comprehensive Enterprise Services (8 Categories, 40+ Services)",
  description:
    "Explore 8 core service categories: Custom software, mobile apps, web development, SEO, digital marketing, in-house printing collateral, startup advisory, and advanced AI technologies.",
};

export default function ServicesPage() {
  return <ServicesDirectoryClient />;
}
