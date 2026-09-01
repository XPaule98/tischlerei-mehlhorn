import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Tischlerei Mehlhorn gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-site max-w-3xl">
          <h1
            className="text-display text-[#121212] text-3xl md:text-4xl mb-10"
          >
            Impressum
          </h1>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
              </h2>
              <p>
                <strong className="text-[#121212]">Tischlerei Mehlhorn</strong>
                <br />
                Inh. Ronny Mehlhorn, Tischlermeister
                <br />
                Musterstraße 1
                <br />
                00000 Musterstadt
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">Kontakt</h2>
              <p>
                Telefon: +49 (0) 00 00 00 00
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:info@tischlerei-mehlhorn.de"
                  className="text-[#121212] underline hover:no-underline"
                >
                  info@tischlerei-mehlhorn.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                Berufsrechtliche Angaben
              </h2>
              <p>
                Beruf: Tischlermeister (Meisterbrief)
                <br />
                Zuständige Handwerkskammer: [Handwerkskammer eintragen]
                <br />
                Berufsrechtliche Regelungen: Handwerksordnung (HwO)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
                <br />
                DE [Nummer eintragen]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#121212] underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="mt-2">
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
