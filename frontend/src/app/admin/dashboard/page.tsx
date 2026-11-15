import type { Metadata } from "next";
import { AdminDashboardClient } from "./admin-client";

export const metadata: Metadata = {
  title: "Administrative Operations Center | Royal Business Machine",
  description:
    "Executive administration dashboard for monitoring lead funnels, client inquiries, revenue pipelines, and system health.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
