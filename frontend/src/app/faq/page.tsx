import type { Metadata } from "next";
import { FaqClient } from "./faq-client";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Royal Business Machine",
  description:
    "Find answers to common questions about Royal Business Machine's custom software delivery timelines, pricing structures, maintenance AMCs, in-house printing, and startup consulting.",
};

export default function FaqPage() {
  return <FaqClient />;
}
