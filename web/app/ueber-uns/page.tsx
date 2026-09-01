import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import AboutTimeline from "@/components/sections/AboutTimeline";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { History, Building2, Award } from "lucide-react";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Über uns | Tischlerei Ronny Mehlhorn Schönheide",
  description:
    "Erfahren Sie mehr über die Tischlerei Ronny Mehlhorn in Schönheide (Erzgebirge): Gegründet 1977 durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße, heute geführt von Tischlermeister Ronny Mehlhorn.",
};

const values = [
  {
    number: "01",
    title: "Meisterliche Fertigung in Schönheide",
    description:
      "Über 45 Jahre fundierte Handwerkserfahrung im Erzgebirge. Wir fertigen individuelle Holzfenster, Haustüren und Wintergärten direkt in unserer eigenen Werkstatt.",
  },
  {
    number: "02",
    title: "Ausgewählte Hölzer & langlebige Systeme",
    description:
      "Wir verarbeiten erstklassige Edelhölzer (Eiche, Lärche, Kiefer) und kombinieren sie auf Wunsch mit wartungsfreien Aluminium-Vorsatzschalen (System Gutmann Mira).",
  },
  {
    number: "03",
    title: "Moderner Maschinenpark & Handarbeit",
    description:
      "Unser 1992 erbautes Firmengebäude bietet die ideale Ausstattung für präzise Computerbearbeitung, kombiniert mit traditioneller Tischlerarbeit.",
  },
  {
    number: "04",
    title: "Zuverlässige Vor-Ort-Montage",
    description:
      "Von der ersten Fachberatung über das Aufmaß bis zum sauberen, normgerechten Einbau aller Bauelemente stehen wir persönlich für Qualität ein.",
  },
];

export default async function UeberUnsPage() {
  let cmsData = null;
  try {
    cmsData = await client.fetch(ABOUT_PAGE_QUERY, {}, { next: { revalidate: 30 } });
  } catch (e) {
    // Fallback
  }

  const badge = cmsData?.badge || "Familienbetrieb im Erzgebirge seit 1977";
  const title = cmsData?.headline || "Tradition, Meisterhandwerk & moderner Bauelementebau";
  const subtitle =
    cmsData?.introText ||
    "Gegründet 1977 durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße 64 b, heute mit meisterhafter Präzision geführt durch Tischlermeister Ronny Mehlhorn.";
  const headerImageUrl = cmsData?.headerImageUrl || "/images/real/werkstatt-2.jpg";

  return (
    <>
      <Header />
      <main>
        {/* Dynamic PageHeader with Atmospheric Image Background */}
        <PageHeader
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        >
          {/* Key Facts Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 px-3 py-1.5 rounded border border-white/10">
              <History size={13} className="text-[#D4B28C]" />
              Seit 1977
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 px-3 py-1.5 rounded border border-white/10">
              <Building2 size={13} className="text-[#D4B28C]" />
              1992 Neubau
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 px-3 py-1.5 rounded border border-white/10">
              <Award size={13} className="text-[#D4B28C]" />
              Inh. Ronny Mehlhorn
            </div>
          </div>
        </PageHeader>

        {/* Werkstatt-Galerie & Fertigung */}
        <section className="py-12 md:py-16 bg-[#FAF8F5]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-craft-label block mb-1">Einblick in die Fertigung</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#181818]">
                Unsere Werkstatt in Schönheide
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden border border-[#E8E8E6] h-60 sm:h-72 bg-[#F9F9F8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-1.jpg" alt="Maschinenpark Tischlerei Mehlhorn" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden border border-[#E8E8E6] h-60 sm:h-72 bg-[#F9F9F8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-2.jpg" alt="Hobelbank und Holzverarbeitung" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden border border-[#E8E8E6] h-60 sm:h-72 bg-[#F9F9F8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-3.jpg" alt="Fensterbau und Endmontage" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Component */}
        <AboutTimeline />

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-white border-t border-[#E8E8E6]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-craft-label block mb-1">Unser Qualitätsversprechen</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] mb-2">
                Werte, auf die Sie bauen können
              </h2>
              <p className="text-[#555555] text-xs sm:text-sm">
                Verlässlichkeit, meisterliche Präzision und der respektvolle Umgang mit dem Naturbaustoff Holz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="craft-card p-6 flex flex-col justify-between bg-white"
                >
                  <div>
                    <span className="text-2xl font-bold text-[#8C6D4F] block mb-2">
                      {v.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#181818] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 bg-[#181818] text-white rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60 block mb-1">Interesse geweckt?</span>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  Lassen Sie uns über Ihr Bauvorhaben sprechen
                </h3>
                <p className="text-white/70 text-xs sm:text-sm max-w-xl">
                  Besuchen Sie uns in der Neuheider Straße 64 b in Schönheide oder vereinbaren Sie einen Vor-Ort-Termin.
                </p>
              </div>
              <div className="flex gap-2.5 flex-shrink-0">
                <Link href="/leistungen" className="btn btn-outline text-xs py-2 px-3.5">
                  Leistungen ansehen
                </Link>
                <Link href="/kontakt" className="btn bg-white text-[#181818] hover:bg-white/90 text-xs py-2 px-3.5 font-semibold">
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
