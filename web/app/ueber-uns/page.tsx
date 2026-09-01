import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutTimeline from "@/components/sections/AboutTimeline";
import { Check, ArrowRight, Award, History, Building2 } from "lucide-react";

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

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Compact, Informative Split Header – Immediate Visual Impact */}
        <section className="bg-gradient-to-b from-[#1E1A17] to-[#25201C] text-[#FAF8F5] pt-12 pb-12 border-b border-[#3A332D]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="text-craft-label text-[#D4B28C] block mb-1.5">
                  Familienbetrieb im Erzgebirge seit 1977
                </span>
                <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-4">
                  Tradition, Meisterhandwerk & moderner Bauelementebau
                </h1>
                <p className="text-[#D6CCC0] text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  Gegründet 1977 durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße 64 b, heute mit meisterhafter Präzision geführt durch Tischlermeister <strong>Ronny Mehlhorn</strong>.
                </p>

                {/* Key Facts Pills */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 px-3.5 py-2 rounded border border-white/10">
                    <History size={14} className="text-[#D4B28C]" />
                    Seit 1977 in Schönheide
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 px-3.5 py-2 rounded border border-white/10">
                    <Building2 size={14} className="text-[#D4B28C]" />
                    1992 Neubau Firmengebäude
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 px-3.5 py-2 rounded border border-white/10">
                    <Award size={14} className="text-[#D4B28C]" />
                    Inh. Ronny Mehlhorn
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/real/gebaeude-1.jpg"
                    alt="Firmengebäude Tischlerei Mehlhorn in Schönheide"
                    className="w-full h-[280px] sm:h-[320px] object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#1E1A17]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded text-xs">
                    Neuheider Straße 64 b, Schönheide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Werkstatt-Galerie & Fertigung */}
        <section className="py-12 md:py-16 bg-[#FAF8F5]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-craft-label block mb-1">Einblick in die Fertigung</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#1E1A17] font-normal">
                Unsere Werkstatt in Schönheide
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden border border-[#E6DED4] h-60 sm:h-72 shadow-sm bg-[#F3ECE2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-1.jpg" alt="Maschinenpark Tischlerei Mehlhorn" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden border border-[#E6DED4] h-60 sm:h-72 shadow-sm bg-[#F3ECE2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-2.jpg" alt="Hobelbank und Holzverarbeitung" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden border border-[#E6DED4] h-60 sm:h-72 shadow-sm bg-[#F3ECE2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-3.jpg" alt="Fensterbau und Endmontage" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Component */}
        <AboutTimeline />

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-white border-t border-[#E6DED4]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-craft-label block mb-1">Unser Qualitätsversprechen</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl text-[#1E1A17] font-normal mb-3">
                Werte, auf die Sie bauen können
              </h2>
              <p className="text-[#6B635B] text-sm sm:text-base">
                Verlässlichkeit, meisterliche Präzision und der respektvolle Umgang mit dem Naturbaustoff Holz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="craft-card rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="font-serif-heading text-3xl text-[#8C6D4F] block mb-3 font-normal">
                      {v.number}
                    </span>
                    <h3 className="font-serif-heading text-lg sm:text-xl font-medium text-[#1E1A17] mb-2.5">
                      {v.title}
                    </h3>
                    <p className="text-[#6B635B] text-xs sm:text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Box */}
            <div className="mt-14 bg-[#1C1815] text-[#FAF8F5] rounded-lg p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-craft-label text-[#D4B28C] block mb-1">Interesse geweckt?</span>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-normal mb-1.5">
                  Lassen Sie uns über Ihr Bauvorhaben sprechen
                </h3>
                <p className="text-[#A89F95] text-xs sm:text-sm max-w-xl">
                  Besuchen Sie uns in der Neuheider Straße 64 b in Schönheide oder vereinbaren Sie einen Vor-Ort-Termin.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link href="/leistungen" className="btn btn-outline text-xs py-2.5 px-4">
                  Leistungen ansehen
                </Link>
                <Link href="/kontakt" className="btn btn-wood text-xs py-2.5 px-4 font-medium">
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
