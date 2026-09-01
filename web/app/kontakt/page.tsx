import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Kontakt & Angebot anfragen | Tischlerei Mehlhorn",
  description:
    "Treten Sie mit der Tischlerei Mehlhorn in Kontakt. Fordern Sie ein unverbindliches Angebot für Fenster, Haustüren, Wintergärten oder Montage an.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-[#121212] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-label text-[#E5DECE] block mb-3">Persönliche Beratung</span>
            <h1 className="text-display text-4xl md:text-6xl max-w-3xl mb-6">
              Wir freuen uns auf Ihr Projekt.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Ob konkretes Leistungsangebot, Vor-Ort-Aufmaß oder allgemeine Frage –
              schreiben Sie uns oder rufen Sie uns direkt in der Werkstatt an.
            </p>
          </div>
        </section>

        {/* Form and Contact Info */}
        <Suspense fallback={<div className="p-12 text-center">Wird geladen...</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
