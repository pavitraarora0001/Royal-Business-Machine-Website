import type { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us & Business Inquiries | Royal Business Machine",
  description:
    "Connect with Royal Business Machine in Bharatpur, Rajasthan. Call +91 9057287689 or initiate instant WhatsApp and email consultations for custom software and branding.",
};

export default function ContactPage() {
  return <ContactClient />;
}
