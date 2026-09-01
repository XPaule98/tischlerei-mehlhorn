import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Tischlerei Ronny Mehlhorn",
  description:
    "Datenschutzerklärung der Tischlerei Ronny Mehlhorn in Schönheide gemäß DSGVO und BDSG.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FAF8F5]">
        {/* Consistent Unified PageHeader */}
        <PageHeader
          breadcrumb="Datenschutz"
          badge="Rechtliche Hinweise"
          title="Datenschutzerklärung"
          subtitle="Transparente Informationen über die Erfassung und Verarbeitung Ihrer Daten gemäß DSGVO."
        />

        <section className="py-12 md:py-16">
          <div className="container-site max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#777777] hover:text-[#181818] mb-8 transition-colors"
            >
              <ArrowLeft size={13} /> Zurück zur Startseite
            </Link>

            <div className="bg-white p-6 sm:p-10 rounded-lg border border-[#E8E8E6] space-y-8 text-[#444444] text-xs sm:text-sm leading-relaxed">
              <section>
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  1. Datenschutz auf einen Blick
                </h2>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  2. Verantwortliche Stelle
                </h2>
                <div className="space-y-0.5 text-[#555555]">
                  <p className="font-bold text-[#181818]">Tischlerei Ronny Mehlhorn</p>
                  <p>Inhaber: Tischlermeister Ronny Mehlhorn</p>
                  <p>Neuheider Straße 64 b</p>
                  <p>08304 Schönheide (Erzgebirge)</p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:tischlerei.mehlhorn@t-online.de" className="text-[#8C6D4F] hover:underline">
                      tischlerei.mehlhorn@t-online.de
                    </a>
                  </p>
                </div>
              </section>

              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  3. Datenerfassung auf dieser Website
                </h2>
                <h3 className="font-semibold text-[#181818] mb-1">Cookies & Tracking</h3>
                <p className="mb-4">
                  Diese Website verwendet keine zustimmungspflichtigen Werbe- oder Tracking-Cookies. Alle Schriftarten werden lokal ausgeliefert.
                </p>
                <h3 className="font-semibold text-[#181818] mb-1">Kontaktformular & Bestellanfragen</h3>
                <p>
                  Wenn Sie uns per Kontaktformular oder Bestellanfrage kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse, Telefon, Nachricht) zum Zweck der Bearbeitung der Anfrage bei uns gespeichert. Die Daten werden nicht an Dritte weitergegeben.
                </p>
              </section>

              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg font-bold text-[#181818] mb-2">
                  4. Ihre Rechte
                </h2>
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
