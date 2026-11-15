import type { Metadata } from "next";
import { LoginClient } from "./login-client";

export const metadata: Metadata = {
  title: "Client & Administrative Portal Login | Royal Business Machine",
  description:
    "Secure login gateway for Royal Business Machine enterprise clients, partners, and platform administrators.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
