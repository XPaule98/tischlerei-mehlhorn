import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: {
    default: "Tischlerei Mehlhorn | Handwerk & Bauelemente Schönheide",
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
    "Holz-Aluminium Fenster",
    "Haustüren Massivholz",
    "Wintergärten",
  ],
  authors: [{ name: "Tischlerei Ronny Mehlhorn" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sans.variable} scroll-smooth`}>
      <body className="antialiased bg-[#FFFFFF] text-[#1A1A1A] font-sans selection:bg-[#EAE6DF] selection:text-[#1A1A1A] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
