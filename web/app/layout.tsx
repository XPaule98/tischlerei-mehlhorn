import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Tischlerei Mehlhorn | Meisterbetrieb für Holz & Bauelemente seit 1977",
    template: "%s | Tischlerei Mehlhorn",
  },
  description:
    "Tischlerei Mehlhorn – Über 45 Jahre Handwerkstradition. Eigene Herstellung von Holzfenstern, Haustüren, Wintergärten & Fachmontage aller Bauelemente.",
  keywords: [
    "Tischlerei",
    "Tischlerhandwerk",
    "Holzfenster",
    "Holz-Alu-Fenster",
    "Haustüren Massivholz",
    "Wintergarten",
    "Bauelemente",
    "Tischlerei Mehlhorn",
    "Ronny Mehlhorn",
  ],
  authors: [{ name: "Tischlerei Mehlhorn" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Tischlerei Mehlhorn | Meisterbetrieb für Holz & Bauelemente seit 1977",
    description:
      "Über 45 Jahre Handwerkstradition. Eigene Herstellung von Holzfenstern, Haustüren und Wintergärten sowie Fachmontage aller Bauelemente.",
    siteName: "Tischlerei Mehlhorn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#E2D4C3] selection:text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
