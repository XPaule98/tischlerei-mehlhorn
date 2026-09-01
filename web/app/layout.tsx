import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1C1815",
};

export const metadata: Metadata = {
  title: {
    default: "Tischlerei Ronny Mehlhorn | Meisterbetrieb Schönheide seit 1977",
    template: "%s | Tischlerei Mehlhorn",
  },
  description:
    "Tischlerei Ronny Mehlhorn in Schönheide (Erzgebirge) – Eigene Herstellung von Holz- & Holz-Alu-Fenstern (Gutmann Mira), Haustüren und Wintergärten sowie geprüfte Bauelementemontage.",
  keywords: [
    "Tischlerei Mehlhorn",
    "Ronny Mehlhorn",
    "Schönheide",
    "Erzgebirge",
    "Holzfenster",
    "Holz-Aluminium Fenster",
    "Gutmann Mira",
    "Haustüren Massivholz",
    "Wintergärten",
    "VEKA",
    "Gealan",
  ],
  authors: [{ name: "Tischlerei Ronny Mehlhorn" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Tischlerei Ronny Mehlhorn | Meisterbetrieb Schönheide seit 1977",
    description:
      "Meisterbetrieb in Schönheide (Erzgebirge). Eigene Herstellung von Holzfenstern, Haustüren und Wintergärten sowie Fachmontage aller Bauelemente.",
    siteName: "Tischlerei Mehlhorn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased bg-[#FAF8F5] text-[#1E1A17] font-sans selection:bg-[#E2D4C3] selection:text-[#1C1917] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
