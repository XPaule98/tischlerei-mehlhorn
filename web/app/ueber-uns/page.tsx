import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutTimeline from "@/components/sections/AboutTimeline";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns | Meisterbetrieb Tischlerei Mehlhorn",
  description:
    "Erfahren Sie mehr über die Tischlerei Mehlhorn: Gegründet 1977 durch Roland Mehlhorn, heute geführt von Tischlermeister Ronny Mehlhorn. Einblicke in Werkstatt, Team & Werte.",
};

const values = [
  {
    number: "01",
    title: "Meisterliche Handwerkskunst",
    description:
      "Über 45 Jahre fundierte Erfahrung im Holzhandwerk. Jeder Handgriff sitzt – von der Holzauswahl bis zur finalen Oberflächenveredelung.",
  },
  {
    number: "02",
    title: "Nachhaltige Rohstoffe",
    description:
      "Wir verarbeiten bevorzugt zertifizierte, heimische Edelhölzer (Eiche, Lärche, Kiefer) mit umweltfreundlichen, schadstoffarmen Lasuren und biologischen Ölen.",
  },
  {
    number: "03",
    title: "Moderner Maschinenpark",
    description:
      "Die ideale Symbiose aus computergestützter Präzisionsbearbeitung und traditioneller Handwerksarbeit an der klassischen Hobelbank.",
  },
  {
    number: "04",
    title: "Verlässlichkeit & Termintreue",
    description:
      "Von der Erstberatung über das Aufmaß vor Ort bis zur sauberen Endmontage garantieren wir höchste Zuverlässigkeit und transparente Absprachen.",
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
              Familienbetrieb in 2. Generation
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Holzhandwerk mit Leidenschaft – seit über 45 Jahren.
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
                    src="/images/hero-bg.jpg"
                    alt="Werkstatt der Tischlerei Mehlhorn"
                    className="w-full h-[460px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#1E1A17] p-4 rounded border border-[#E6DED4] max-w-xs">
                    <div className="font-serif-heading text-xl font-medium">Meister Ronny Mehlhorn</div>
                    <div className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider mt-0.5">Betriebsleiter & Tischlermeister</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-craft-label block mb-2">Unsere Geschichte</span>
                <h2 className="font-serif-heading text-3xl md:text-4xl text-[#1E1A17] font-normal mb-6">
                  Tradition trifft modernen Bauelementebau
                </h2>
                <div className="space-y-4 text-[#5E564E] text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    Was im <strong>Januar 1977</strong> durch Roland Mehlhorn mit einer kleinen Werkstatt begann, hat sich über vier Jahrzehnte kontinuierlich weiterentwickelt.
                  </p>
                  <p>
                    1992 folgte der Bezug des neu erbauten Firmengebäudes mit großzügiger Produktionsfläche. Am <strong>1. Juli 2012</strong> übergab Roland Mehlhorn die Leitung erfolgreich an seinen Sohn <strong>Ronny Mehlhorn</strong>.
                  </p>
                  <p>
                    Heute steht der Name Mehlhorn für die harmonische Verbindung aus solider Tischlertradition, modernster computergestützter Vorfertigung und lückenloser Fachmontage.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#E6DED4]">
                  <div className="flex items-center gap-3 text-sm text-[#1E1A17]">
                    <Check size={16} className="text-[#8C6D4F] flex-shrink-0" />
                    <span>Eigene Herstellung von Fenstern, Haustüren & Wintergärten</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#1E1A17]">
                    <Check size={16} className="text-[#8C6D4F] flex-shrink-0" />
                    <span>Fachgerechte Vor-Ort-Montage nach aktuellem RAL-Standard</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#1E1A17]">
                    <Check size={16} className="text-[#8C6D4F] flex-shrink-0" />
                    <span>Individuelle Sonderlösungen für Denkmalschutz und Architekten</span>
                  </div>
                </div>
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
                  Lassen Sie uns über Ihr Vorhaben sprechen
                </h3>
                <p className="text-[#A89F95] text-sm max-w-xl">
                  Ob Neubau, Denkmalschutz oder Sanierung – wir beraten Sie persönlich in unserer Werkstatt oder direkt bei Ihnen vor Ort.
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
