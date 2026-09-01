import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tischlerei-mehlhorn.de";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tischlerei Mehlhorn | Meisterbetrieb Schönheide (Erzgebirge)",
    template: "%s | Tischlerei Mehlhorn",
  },
  description:
    "Tischlerei Ronny Mehlhorn in Schönheide (Erzgebirge) – Eigene Fertigung von Holzfenstern, Holz-Aluminium-Fenstern (Gutmann Mira), Haustüren und Wintergärten seit 1977.",
  keywords: [
    "Tischlerei Mehlhorn",
    "Ronny Mehlhorn",
    "Schönheide",
    "Erzgebirge",
    "Holzfenster",
    "Holz-Aluminium Fenster Gutmann Mira",
    "Haustüren Massivholz",
    "Wintergärten Erzgebirge",
    "Schreinerei Schönheide",
    "Fensterbau Erzgebirge",
  ],
  authors: [{ name: "Tischlerei Ronny Mehlhorn" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Tischlerei Ronny Mehlhorn",
    title: "Tischlerei Mehlhorn | Meisterbetrieb Schönheide (Erzgebirge)",
    description:
      "Handgefertigte Holz- und Holz-Alu-Fenster, Haustüren und Wintergärten aus eigener Werkstatt in Schönheide.",
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
  "@type": "HomeAndConstructionBusiness",
  name: "Tischlerei Ronny Mehlhorn",
  image: `${siteUrl}/images/real/hero-bg.jpg`,
  "@id": `${siteUrl}/#organization`,
  url: siteUrl,
  telephone: "+49377552346",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Neuheider Straße 64 b",
    addressLocality: "Schönheide",
    postalCode: "08304",
    addressRegion: "Sachsen",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.5042,
    longitude: 12.5312,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "16:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#FFFFFF] text-[#1A1A1A] font-sans selection:bg-[#EAE6DF] selection:text-[#1A1A1A] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
