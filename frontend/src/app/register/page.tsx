import type { Metadata } from "next";
import { RegisterClient } from "./register-client";

export const metadata: Metadata = {
  title: "Client Account Registration | Royal Business Machine",
  description:
    "Register for the Royal Business Machine enterprise portal to track active software milestones, invoices, and service requests.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
