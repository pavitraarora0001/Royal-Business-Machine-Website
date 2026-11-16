import type { Metadata } from "next";
import { ProductsClient } from "./products-client";
import { ALL_PRODUCTS } from "@/data/products-data";

export const metadata: Metadata = {
  title: "Enterprise Software Products & SaaS Platforms | Royal Business Machine",
  description:
    "Explore Royal Business Machine's proprietary software platforms, including Dairy Muneem, Royal HMS, CampusCore Institutional ERP, OmniStock POS, and AutoChat WhatsApp Suite.",
  keywords: [
    "enterprise software products",
    "dairy muneem app",
    "hospital management system",
    "college erp portal",
    "inventory pos software",
    "whatsapp automation engine",
    "bharatpur software company",
    "royal business machine products",
  ],
  openGraph: {
    title: "Enterprise Software Products & SaaS Platforms | Royal Business Machine",
    description:
      "Mission-critical vertical software platforms engineered for resilience: Dairy Muneem, Royal HMS, CampusCore ERP, and OmniStock.",
    url: "https://royalbusinessmachine.com/products",
  },
};

export default function ProductsPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ALL_PRODUCTS.map((prod, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: prod.name,
        operatingSystem: "Web / Android / iOS / Linux / Windows",
        applicationCategory: prod.category,
        description: prod.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability:
            prod.status === "AVAILABLE"
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-charcoal-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <ProductsClient />
    </main>
  );
}
