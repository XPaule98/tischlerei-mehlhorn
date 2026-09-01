import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutTimeline from "@/components/sections/AboutTimeline";
import { Check, ArrowRight } from "lucide-react";

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
      <main className="pt-24 md:pt-28">
        {/* Page Header */}
        <section className="bg-[#1C1815] text-[#FAF8F5] py-20 md:py-28 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-craft-label text-[#D4B28C] block mb-3">
              Familienbetrieb im Erzgebirge seit 1977
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Holzhandwerk mit Leidenschaft – Tischlerei Mehlhorn Schönheide.
            </h1>
            <p className="text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Gegründet 1977 durch Roland Mehlhorn, heute mit meisterhafter Präzision geführt durch Tischlermeister Ronny Mehlhorn.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="relative rounded-lg overflow-hidden border border-[#E6DED4] shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/real/gebaeude-1.jpg"
                    alt="Firmengebäude der Tischlerei Mehlhorn in Schönheide"
                    className="w-full h-[460px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#1E1A17] p-4 rounded border border-[#E6DED4] max-w-xs shadow-sm">
                    <div className="font-serif-heading text-lg font-medium">Werkstatt Schönheide</div>
                    <div className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider mt-0.5">Neuheider Straße 64 b</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-craft-label block mb-2">Familienbetrieb & Werkstatt</span>
                <h2 className="font-serif-heading text-3xl md:text-4xl text-[#1E1A17] font-normal mb-6">
                  Tradition trifft modernen Bauelementebau
                </h2>
                <div className="space-y-4 text-[#5E564E] text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    Was im <strong>Januar 1977</strong> durch Roland Mehlhorn in Schönheide als traditioneller Gestellbau begann, hat sich über Jahrzehnte zu einem gefragten Fachbetrieb für Holzbau und Bauelemente entwickelt.
                  </p>
                  <p>
                    <strong>1992</strong> folgte der Umzug in das neu erbaute Firmengebäude in der <strong>Neuheider Straße 64 b</strong> mit großzügigen Fertigungshallen für Fenster-, Türen- und Wintergartenbau.
                  </p>
                  <p>
                    Seit dem <strong>1. Juli 2012</strong> führt Sohn und Tischlermeister <strong>Ronny Mehlhorn</strong> die Tischlerei erfolgreich in zweiter Generation mit modernster Technik und unverändertem Meisteranspruch.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#E6DED4]">
                  <div className="flex items-center gap-3 text-sm text-[#1E1A17]">
                    <Check size={16} className="text-[#8C6D4F] flex-shrink-0" />
                    <span>Eigene Herstellung von Holz- & Holz-Alu-Fenstern (Gutmann Mira)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#1E1A17]">
                    <Check size={16} className="text-[#8C6D4F] flex-shrink-0" />
                    <span>Haustüren nach Maß & Wintergärten aus eigener Werkstatt</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#1E1A17]">
                    <Check size={16} className="text-[#8C6D4F] flex-shrink-0" />
                    <span>Kunststoff-Bauelemente führender Marken (VEKA, Gealan)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Werkstatt-Galerie */}
        <section className="py-12 bg-white border-y border-[#E6DED4]">
          <div className="container-site">
            <span className="text-craft-label block mb-2 text-center">Einblick in die Fertigung</span>
            <h3 className="font-serif-heading text-2xl md:text-3xl text-center text-[#1E1A17] font-normal mb-8">
              Unsere Werkstatt in Schönheide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded overflow-hidden border border-[#E6DED4] h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-1.jpg" alt="Maschinenpark Tischlerei Mehlhorn" className="w-full h-full object-cover" />
              </div>
              <div className="rounded overflow-hidden border border-[#E6DED4] h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-2.jpg" alt="Hobelbank und Holzverarbeitung" className="w-full h-full object-cover" />
              </div>
              <div className="rounded overflow-hidden border border-[#E6DED4] h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/real/werkstatt-3.jpg" alt="Fensterbau und Endmontage" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Component */}
        <AboutTimeline />

        {/* Values Section */}
        <section className="section-pad bg-white border-t border-[#E6DED4]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-craft-label block mb-2">Unser Qualitätsversprechen</span>
              <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
                Werte, auf die Sie bauen können
              </h2>
              <p className="text-[#6B635B] text-base">
                Verlässlichkeit, handwerkliche Präzision und der respektvolle Umgang mit dem Naturbaustoff Holz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="craft-card rounded-lg p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif-heading text-3xl text-[#8C6D4F] block mb-4 font-normal">
                      {v.number}
                    </span>
                    <h3 className="font-serif-heading text-xl font-medium text-[#1E1A17] mb-3">
                      {v.title}
                    </h3>
                    <p className="text-[#6B635B] text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Box */}
            <div className="mt-16 bg-[#1C1815] text-[#FAF8F5] rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-craft-label text-[#D4B28C] block mb-2">Interesse geweckt?</span>
                <h3 className="font-serif-heading text-2xl md:text-3xl font-normal mb-2">
                  Lassen Sie uns über Ihr Bauvorhaben sprechen
                </h3>
                <p className="text-[#A89F95] text-sm max-w-xl">
                  Besuchen Sie uns in der Neuheider Straße 64 b in Schönheide oder vereinbaren Sie einen Vor-Ort-Termin für Aufmaß und Beratung.
                </p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <Link href="/leistungen" className="btn btn-outline text-sm">
                  Leistungen ansehen
                </Link>
                <Link href="/kontakt" className="btn btn-wood text-sm font-medium">
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
