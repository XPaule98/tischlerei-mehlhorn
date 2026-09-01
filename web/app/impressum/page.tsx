import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Phone, Mail, MapPin, Printer, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum | Tischlerei Ronny Mehlhorn",
  description: "Rechtliche Pflichtangaben und Impressum der Tischlerei Ronny Mehlhorn in Schönheide (Erzgebirge).",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 bg-[#FAF8F5]">
        {/* Page Header */}
        <section className="bg-[#1C1815] text-[#FAF8F5] py-16 md:py-20">
          <div className="container-site">
            <span className="text-craft-label text-[#D4B28C] block mb-2">Rechtliche Angaben</span>
            <h1 className="font-serif-heading text-4xl md:text-5xl font-normal">
              Impressum
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="section-pad">
          <div className="container-site max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B635B] hover:text-[#1E1A17] mb-10 transition-colors"
            >
              <ArrowLeft size={14} /> Zurück zur Startseite
            </Link>

            <div className="bg-white p-8 md:p-12 rounded-lg border border-[#E6DED4] shadow-sm space-y-8 text-[#4A433D] leading-relaxed text-sm md:text-base">
              {/* Angaben gem. § 5 DDG */}
              <div>
                <h2 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                  Angaben gemäß § 5 DDG
                </h2>
                <div className="space-y-1 text-[#5E564E]">
                  <p className="font-semibold text-[#1E1A17]">Tischlerei Ronny Mehlhorn</p>
                  <p>Inhaber: Ronny Mehlhorn (Tischlermeister)</p>
                  <p>Rechtsform: Einzelunternehmen</p>
                  <p>Neuheider Straße 64 b</p>
                  <p>08304 Schönheide (Erzgebirge)</p>
                  <p>Deutschland</p>
                </div>
              </div>

              {/* Kontakt */}
              <div className="border-t border-[#E6DED4] pt-6">
                <h2 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                  Kontaktmöglichkeiten
                </h2>
                <div className="space-y-2 text-[#5E564E]">
                  <p><strong>Telefon:</strong> 0049 (0) 37755 / 2346</p>
                  <p><strong>Mobil:</strong> 0151 / 23304776</p>
                  <p><strong>Telefax:</strong> 0049 (0) 37755 / 3240</p>
                  <p>
                    <strong>E-Mail:</strong>{" "}
                    <a
                      href="mailto:tischlerei.mehlhorn@t-online.de"
                      className="text-[#8C6D4F] hover:underline"
                    >
                      tischlerei.mehlhorn@t-online.de
                    </a>
                  </p>
                  <p><strong>Internet:</strong> www.tischlerei-mehlhorn.de</p>
                </div>
              </div>

              {/* Steuernummer */}
              <div className="border-t border-[#E6DED4] pt-6">
                <h2 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                  Steuerliche Angaben
                </h2>
                <p className="text-[#5E564E]">
                  <strong>Steuernummer:</strong> 218 / 248 / 03967 (Finanzamt Aue)
                </p>
              </div>

              {/* Aufsichtsbehörde & Berufsbezeichnung */}
              <div className="border-t border-[#E6DED4] pt-6">
                <h2 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                  Handwerkskammer & Berufsbezeichnung
                </h2>
                <div className="space-y-1 text-[#5E564E]">
                  <p><strong>Berufsbezeichnung:</strong> Tischlermeister (verliehen in der Bundesrepublik Deutschland)</p>
                  <p><strong>Zuständige Kammer:</strong> Handwerkskammer Chemnitz</p>
                  <p><strong>Berufsrechtliche Regelungen:</strong> Handwerksordnung (HwO)</p>
                </div>
              </div>

              {/* Haftungsausschluss */}
              <div className="border-t border-[#E6DED4] pt-6 space-y-4">
                <h2 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                  Haftung für Inhalte und Links
                </h2>
                <p className="text-xs text-[#6B635B] leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-xs text-[#6B635B] leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
