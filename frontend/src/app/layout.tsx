import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#20252B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://royalbusinessmachine.com"),
  title: {
    default: "Royal Business Machine | Enterprise Technology & Infrastructure",
    template: "%s | Royal Business Machine",
  },
  description:
    "Transforming businesses through bespoke software engineering, mobile apps, enterprise ERP/CRM systems, digital marketing, institutional execution, and premium physical branding. Founded by Pavitra Arora.",
  keywords: [
    "Royal Business Machine",
    "RBM",
    "Pavitra Arora",
    "IT solutions Bharatpur",
    "software development Rajasthan",
    "mobile app development",
    "enterprise ERP",
    "custom CRM",
    "digital marketing India",
    "commercial printing services",
    "startup consulting",
    "NyayaSetu",
    "Dairy Muneem",
  ],
  authors: [{ name: "Royal Business Machine", url: "https://royalbusinessmachine.com" }],
  creator: "Pavitra Arora",
  publisher: "Royal Business Machine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/assets/logo/favicon.ico",
    shortcut: "/assets/logo/favicon.ico",
    apple: "/assets/logo/logo.png",
  },
  openGraph: {
    title: "Royal Business Machine | Enterprise Technology & Infrastructure",
    description:
      "Integrated technology, institutional execution, and scalable digital solutions for modern enterprises and MSMEs across India.",
    url: "https://royalbusinessmachine.com",
    siteName: "Royal Business Machine",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Royal Business Machine Corporate Emblem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Business Machine | Technology & Enterprise Solutions",
    description:
      "Transforming businesses with bespoke software, mobile apps, institutional infrastructure, and full-scale branding.",
    images: ["/assets/logo/logo.png"],
    creator: "@royalbizmachine",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://royalbusinessmachine.com/#organization",
      "name": "Royal Business Machine",
      "alternateName": "RBM",
      "url": "https://royalbusinessmachine.com",
      "logo": "https://royalbusinessmachine.com/assets/logo/logo.png",
      "founder": {
        "@type": "Person",
        "name": "Pavitra Arora",
        "jobTitle": "Founder & CEO"
      },
      "foundingDate": "2019",
      "description":
        "Integrated technology & business infrastructure platform delivering custom software, ERP, mobile apps, digital marketing, and institutional execution.",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9057287689",
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-7727887850",
          "contactType": "customer support",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/royal-business-machine",
        "https://twitter.com/royalbizmachine",
        "https://www.instagram.com/royalbusinessmachine"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://royalbusinessmachine.com/#localbusiness",
      "name": "Royal Business Machine",
      "image": "https://royalbusinessmachine.com/assets/logo/logo.png",
      "telephone": "+91-9057287689",
      "email": "royalbusinessmachine@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bharatpur",
        "addressRegion": "Rajasthan",
        "postalCode": "321001",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹₹"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground flex flex-col min-h-screen selection:bg-gold-light selection:text-charcoal">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
