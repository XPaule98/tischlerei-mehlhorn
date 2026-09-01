import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum | Tischlerei Ronny Mehlhorn",
  description: "Rechtliche Pflichtangaben und Impressum der Tischlerei Ronny Mehlhorn in Schönheide (Erzgebirge).",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FAF8F5]">
        {/* Consistent Unified PageHeader */}
        <PageHeader
          breadcrumb="Impressum"
          badge="Rechtliche Angaben"
          title="Impressum"
          subtitle="Rechtliche Pflichtangaben der Tischlerei Ronny Mehlhorn gemäß § 5 DDG."
        />

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container-site max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#777777] hover:text-[#181818] mb-8 transition-colors"
            >
              <ArrowLeft size={13} /> Zurück zur Startseite
            </Link>

            <div className="bg-white p-6 sm:p-10 rounded-lg border border-[#E8E8E6] space-y-6 text-[#444444] text-xs sm:text-sm leading-relaxed">
              {/* Angaben gem. § 5 DDG */}
              <div>
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  Angaben gemäß § 5 DDG
                </h2>
                <div className="space-y-0.5 text-[#555555]">
                  <p className="font-bold text-[#181818]">Tischlerei Ronny Mehlhorn</p>
                  <p>Inhaber: Ronny Mehlhorn (Tischlermeister)</p>
                  <p>Rechtsform: Einzelunternehmen</p>
                  <p>Neuheider Straße 64 b</p>
                  <p>08304 Schönheide (Erzgebirge)</p>
                </div>
              </div>

              {/* Kontakt */}
              <div className="border-t border-[#F2F2F0] pt-5">
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  Kontaktmöglichkeiten
                </h2>
                <div className="space-y-1 text-[#555555]">
                  <p><strong>Telefon:</strong> 037755 / 2346</p>
                  <p><strong>Mobil:</strong> 0151 / 23304776</p>
                  <p><strong>Telefax:</strong> 037755 / 3240</p>
                  <p>
                    <strong>E-Mail:</strong>{" "}
                    <a href="mailto:tischlerei.mehlhorn@t-online.de" className="text-[#8C6D4F] hover:underline">
                      tischlerei.mehlhorn@t-online.de
                    </a>
                  </p>
                  <p><strong>Internet:</strong> www.tischlerei-mehlhorn.de</p>
                </div>
              </div>

              {/* Steuernummer */}
              <div className="border-t border-[#F2F2F0] pt-5">
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  Steuerliche Angaben
                </h2>
                <p className="text-[#555555]">
                  <strong>Steuernummer:</strong> 218 / 248 / 03967 (Finanzamt Aue)
                </p>
              </div>

              {/* Kammer */}
              <div className="border-t border-[#F2F2F0] pt-5">
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  Handwerkskammer & Berufsbezeichnung
                </h2>
                <div className="space-y-0.5 text-[#555555]">
                  <p><strong>Berufsbezeichnung:</strong> Tischlermeister (verliehen in Deutschland)</p>
                  <p><strong>Zuständige Kammer:</strong> Handwerkskammer Chemnitz</p>
                  <p><strong>Berufsrechtliche Regelungen:</strong> Handwerksordnung (HwO)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
