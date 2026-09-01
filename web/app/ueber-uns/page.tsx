import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutTimeline from "@/components/sections/AboutTimeline";
import { Award, ShieldCheck, TreePine, Wrench, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns | Tradition & Meisterbetrieb seit 1977",
  description:
    "Erfahren Sie mehr über die Tischlerei Mehlhorn: Gegründet 1977 durch Roland Mehlhorn, heute geführt von Tischlermeister Ronny Mehlhorn. Einblicke in Werkstatt, Team & Werte.",
};

const values = [
  {
    icon: Award,
    title: "Meisterliche Handwerkskunst",
    description:
      "Über 45 Jahre fundierte Erfahrung im Holzhandwerk. Jeder Handgriff sitzt – von der Holzauswahl bis zur finalen Oberflächenveredelung.",
  },
  {
    icon: TreePine,
    title: "Nachhaltige Rohstoffe",
    description:
      "Wir verarbeiten bevorzugt zertifizierte, heimische Edelhölzer (Eiche, Lärche, Kiefer) mit umweltfreundlichen, schadstoffarmen Lasuren und Ölen.",
  },
  {
    icon: Wrench,
    title: "Moderner Maschinenpark",
    description:
      "Die ideale Symbiose aus computergestützter Präzisionsbearbeitung und traditioneller Handwerksarbeit an der klassischen Hobelbank.",
  },
  {
    icon: ShieldCheck,
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
        <section className="bg-[#121212] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-bg.jpg"
              alt="Werkstatt Hintergrund"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-site relative z-10">
            <span className="text-label text-[#E5DECE] block mb-3">Familienbetrieb & Handwerkstradition</span>
            <h1 className="text-display text-4xl md:text-6xl max-w-3xl mb-6">
              Holzhandwerk mit Leidenschaft – seit über 45 Jahren.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Gegründet 1977 von Roland Mehlhorn, erfolgreich weitergeführt durch
              Tischlermeister Ronny Mehlhorn. Lernen Sie unseren Betrieb kennen.
            </p>
          </div>
        </section>

        {/* Introduction / Story Section */}
        <section className="section-pad bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Grid */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-bg.jpg"
                    alt="Tischlerei Mehlhorn Meisterwerkstatt"
                    className="w-full h-[450px] object-cover"
                  />
                </div>
                {/* Badge Overlay */}
                <div className="absolute -bottom-6 -right-6 bg-[#E5DECE] text-[#121212] p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs border border-white">
                  <div className="text-3xl font-black mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    1977 – 2026+
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Über 4 Jahrzehnte gelebte Meistertradition
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div>
                <span className="text-label text-gray-400 block mb-2">Unsere Philosophie</span>
                <h2 className="text-display text-3xl md:text-4xl text-[#121212] mb-6">
                  Tradition trifft modernen Bauelementebau
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Was im <strong>Januar 1977</strong> mit der Gründung durch Roland Mehlhorn begann, hat sich über Jahrzehnte zu einem geschätzten Meisterbetrieb für anspruchsvolle Architekten und qualitätsbewusste Bauherren entwickelt.
                  </p>
                  <p>
                    Mit dem Umzug in das neu erbaute Firmengebäude im Jahr <strong>1992</strong> wurden die Kapazitäten für modernste Fenster-, Türen- und Wintergartenfertigung geschaffen.
                  </p>
                  <p>
                    Seit der Betriebsübergabe am <strong>1. Juli 2012</strong> führt Sohn und Tischlermeister <strong>Ronny Mehlhorn</strong> den Betrieb mit frischen Ideen, modernster Montagetechnik und dem unveränderten Qualitätsanspruch weiter.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#121212] flex-shrink-0" size={20} />
                    <span className="text-sm font-semibold text-gray-800">Eigene Fertigung im Haus</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#121212] flex-shrink-0" size={20} />
                    <span className="text-sm font-semibold text-gray-800">Fachgerechte Vor-Ort-Montage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#121212] flex-shrink-0" size={20} />
                    <span className="text-sm font-semibold text-gray-800">Individuelle Sonderanfertigung</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#121212] flex-shrink-0" size={20} />
                    <span className="text-sm font-semibold text-gray-800">Umfassende Fachberatung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Component */}
        <AboutTimeline />

        {/* Values / Werkstatt Section */}
        <section className="section-pad bg-white border-t border-gray-100">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-label text-gray-400 block mb-2">Unser Anspruch</span>
              <h2 className="text-display text-3xl md:text-5xl text-[#121212] mb-4">
                Was uns auszeichnet
              </h2>
              <p className="text-gray-500">
                Qualität ist kein Zufall, sondern das Ergebnis aus präziser Planung, erlesenen Materialien und meisterhafter Ausführung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-[#f9fafb] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#121212] text-white rounded-xl flex items-center justify-center mb-6">
                    <v.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#121212] mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom CTA Box */}
            <div className="mt-16 bg-[#121212] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-label text-[#E5DECE] block mb-2">Interesse geweckt?</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Lassen Sie uns über Ihr Bauvorhaben sprechen
                </h3>
                <p className="text-white/60 text-sm max-w-xl">
                  Ob Neubau, Denkmalschutz oder individuelle Sanierung – wir erstellen Ihnen ein maßgeschneidertes Konzept.
                </p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <Link href="/leistungen" className="btn btn-outline text-sm">
                  Leistungen ansehen
                </Link>
                <Link href="/kontakt" className="btn bg-[#E5DECE] text-[#121212] border-[#E5DECE] hover:bg-white hover:border-white text-sm font-bold">
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
