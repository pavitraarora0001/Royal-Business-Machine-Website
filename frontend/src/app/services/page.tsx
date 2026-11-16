import type { Metadata } from "next";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "12 Enterprise Service Divisions & Solutions | Royal Business Machine",
  description:
    "Explore our 12 major service divisions: Software & Enterprise Solutions, Web & Mobile, AI Automation, Digital Marketing, CPaaS WhatsApp & SMS, Call Centre, UI/UX Studio, Cloud DevOps, Cybersecurity, Data Analytics, Training, and Consulting.",
  alternates: {
    canonical: "https://www.royalbusinessmachine.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
