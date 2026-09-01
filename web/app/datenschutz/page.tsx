import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Tischlerei Mehlhorn gemäß DSGVO / BDSG.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-site max-w-3xl">
          <h1 className="text-display text-[#121212] text-3xl md:text-4xl mb-10">
            Datenschutzerklärung
          </h1>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="font-semibold text-[#121212] mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was
                mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
                besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                2. Verantwortlicher
              </h2>
              <p>
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
                <br />
                <br />
                <strong className="text-[#121212]">Tischlerei Mehlhorn</strong>
                <br />
                Inh. Ronny Mehlhorn
                <br />
                Musterstraße 1, 00000 Musterstadt
                <br />
                E-Mail:{" "}
                <a href="mailto:info@tischlerei-mehlhorn.de" className="underline">
                  info@tischlerei-mehlhorn.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                3. Hosting
              </h2>
              <p>
                Diese Website wird bei <strong>Vercel Inc.</strong> (340 Pine Street,
                Suite 701, San Francisco, CA 94104, USA) gehostet. Einzelheiten
                finden Sie in der Datenschutzerklärung von Vercel:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vercel.com/legal/privacy-policy
                </a>
                . Der Einsatz von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1
                lit. f DSGVO (berechtigtes Interesse an einem zuverlässigen
                Websitebetrieb).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                4. Datenerfassung auf dieser Website
              </h2>
              <h3 className="font-semibold text-[#121212] mb-2">Cookies</h3>
              <p>
                Diese Website verwendet keine zustimmungspflichtigen Cookies und
                keine Tracking- oder Analyse-Cookies. Es werden ausschließlich
                technisch notwendige Cookies gesetzt, die für den Betrieb der
                Website erforderlich sind.
              </p>
              <h3 className="font-semibold text-[#121212] mt-4 mb-2">
                Kontaktformular
              </h3>
              <p>
                Wenn Sie uns per Kontaktformular eine Anfrage senden, werden Ihre
                Angaben (Name, E-Mail-Adresse, Telefon, Nachricht) zum Zweck der
                Bearbeitung der Anfrage bei uns gespeichert und verarbeitet.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
                Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an der Kommunikation mit Interessenten). Die Daten werden
                nicht an Dritte weitergegeben und nach Abschluss der Anfrage
                gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                5. Analyse-Tools & Drittanbieter
              </h2>
              <p>
                Diese Website verwendet <strong>keine</strong> externen
                Analyse-Tools (wie Google Analytics oder ähnliche Dienste), keine
                Social-Media-Plugins, die ohne Ihre Zustimmung Daten übermitteln,
                und keine externen Google-CDN-Ressourcen. Alle Schriftarten werden
                lokal ausgeliefert (Next.js Font-Optimierung).
              </p>
              <p className="mt-2">
                Die Google Maps-Karte auf der Kontaktseite wird erst nach Ihrer
                ausdrücklichen Zustimmung geladen (Klick auf „Karte laden").
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#121212] mb-3">
                6. Ihre Rechte
              </h2>
              <p>Sie haben folgende Rechte gegenüber uns:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-3">
                Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
                zu beschweren. Die zuständige Aufsichtsbehörde richtet sich nach
                Ihrem Wohnsitz.
              </p>
              <p className="mt-3">
                Für Anfragen zu Ihren Datenschutzrechten wenden Sie sich bitte an:{" "}
                <a href="mailto:info@tischlerei-mehlhorn.de" className="underline">
                  info@tischlerei-mehlhorn.de
                </a>
              </p>
            </section>

            <p className="text-sm text-gray-400 pt-6 border-t border-gray-100">
              Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
