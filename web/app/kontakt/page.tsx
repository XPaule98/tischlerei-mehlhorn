import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Kontakt & Beratung | Tischlerei Ronny Mehlhorn Schönheide",
  description:
    "Treten Sie mit der Tischlerei Ronny Mehlhorn in Kontakt: Neuheider Straße 64 b, 08304 Schönheide. Telefon 037755 / 2346 oder direkt per Anfrageformular.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 bg-[#FAF8F5]">
        <Suspense fallback={<div className="p-12 text-center text-[#5E564E]">Wird geladen...</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
