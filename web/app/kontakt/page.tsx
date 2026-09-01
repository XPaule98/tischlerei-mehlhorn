import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/sections/ContactSection";
import { client } from "@/sanity/lib/client";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Kontakt & Beratung | Tischlerei Ronny Mehlhorn Schönheide",
  description:
    "Treten Sie mit der Tischlerei Ronny Mehlhorn in Kontakt: Neuheider Straße 64 b, 08304 Schönheide. Telefon 037755 / 2346 oder direkt per Anfrageformular.",
};

export default async function KontaktPage() {
  let cmsData = null;
  try {
    cmsData = await client.fetch(CONTACT_PAGE_QUERY, {}, { next: { revalidate: 30 } });
  } catch (e) {
    // Fallback
  }

  const badge = cmsData?.badge || "Meisterbetrieb in Schönheide";
  const title = cmsData?.title || "Kontakt & Vor-Ort-Beratung";
  const subtitle =
    cmsData?.subtitle ||
    "Besuchen Sie uns in der Neuheider Straße 64 b oder fordern Sie ein kostenloses Angebot für Ihr Projekt an.";
  const headerImageUrl = cmsData?.headerImageUrl || "/images/real/gebaeude-1.jpg";

  return (
    <>
      <Header />
      <main>
        {/* Dynamic PageHeader with Image Background */}
        <PageHeader
          breadcrumb="Kontakt & Anfragen"
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        <Suspense fallback={<div className="p-12 text-center text-[#555555]">Wird geladen...</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
