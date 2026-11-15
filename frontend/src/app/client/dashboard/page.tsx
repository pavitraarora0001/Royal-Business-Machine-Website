import type { Metadata } from "next";
import { ClientDashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Client Project Portal & Dashboard | Royal Business Machine",
  description:
    "Enterprise client dashboard for tracking project milestones, deliverables, invoice histories, and direct technical support.",
};

export default function ClientDashboardPage() {
  return <ClientDashboardClient />;
}
