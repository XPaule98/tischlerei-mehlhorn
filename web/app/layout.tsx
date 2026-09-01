import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tischlerei Mehlhorn | Holzfenster, Türen & Bauelemente seit 1977",
    template: "%s | Tischlerei Mehlhorn",
  },
  description:
    "Tischlerei Mehlhorn – Über 45 Jahre Erfahrung. Eigene Fertigung von Holzfenstern, Haustüren, Wintergärten. Handel & Fachmontage von Kunststoff- und Aluminiumfenstern, Garagentoren, Rollladen.",
  keywords: [
    "Tischlerei",
    "Holzfenster",
    "Haustüren",
    "Wintergarten",
    "Bauelemente",
    "Tischlerei Mehlhorn",
    "Holzverarbeitung",
    "Fensterbau",
  ],
  authors: [{ name: "Tischlerei Mehlhorn" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Tischlerei Mehlhorn | Holzfenster, Türen & Bauelemente seit 1977",
    description:
      "Über 45 Jahre Erfahrung. Eigene Fertigung von Holzfenstern, Haustüren und Wintergärten. Fachmontage aller Bauelemente.",
    siteName: "Tischlerei Mehlhorn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
