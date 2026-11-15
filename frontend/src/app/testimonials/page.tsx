import type { Metadata } from "next";
import { TestimonialsClient } from "./testimonials-client";

export const metadata: Metadata = {
  title: "Client Testimonials & Institutional Reviews | Royal Business Machine",
  description:
    "Read verified reviews from enterprise leaders, regional colleges, and institutional partners who scaled with Royal Business Machine's digital infrastructure.",
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
