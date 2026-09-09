import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { ArrowLeft, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Tischlerei Ronny Mehlhorn",
  description:
    "Datenschutzerklärung der Tischlerei Ronny Mehlhorn in Schönheide gemäß DSGVO, BDSG und TDDDG.",
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
          subtitle="Transparente und verständliche Informationen über die Erfassung und Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO und TDDDG."
        />

        <section className="py-12 md:py-16">
          <div className="container-site max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#777777] hover:text-[#181818] mb-8 transition-colors"
            >
              <ArrowLeft size={13} /> Zurück zur Startseite
            </Link>

            <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E8E8E6] shadow-xs space-y-8 text-[#444444] text-xs sm:text-sm leading-relaxed">
              {/* 1. Datenschutz auf einen Blick */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-[#8C6D4F]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#181818]">
                    1. Datenschutz auf einen Blick
                  </h2>
                </div>
                <h3 className="font-semibold text-[#181818] mb-1">Allgemeine Hinweise</h3>
                <p className="mb-3">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgend aufgeführten Datenschutzerklärung.
                </p>
                <h3 className="font-semibold text-[#181818] mb-1">Datenerfassung auf dieser Website</h3>
                <p>
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                  <br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle“ in dieser Datenschutzerklärung entnehmen.
                </p>
              </section>

              {/* 2. Verantwortliche Stelle */}
              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#181818] mb-3">
                  2. Verantwortliche Stelle
                </h2>
                <p className="mb-3">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6] space-y-1 text-[#444444]">
                  <p className="font-bold text-[#181818]">Tischlerei Ronny Mehlhorn</p>
                  <p>Inhaber: Ronny Mehlhorn (Tischlermeister)</p>
                  <p className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#8C6D4F]" />
                    Neuheider Straße 64 b, 08304 Schönheide (Erzgebirge)
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone size={13} className="text-[#8C6D4F]" />
                    Telefon: 037755 / 2346 · Mobil: 0151 / 23304776
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail size={13} className="text-[#8C6D4F]" />
                    E-Mail:{" "}
                    <a href="mailto:tischlerei.mehlhorn@t-online.de" className="text-[#8C6D4F] hover:underline">
                      tischlerei.mehlhorn@t-online.de
                    </a>
                  </p>
                </div>
                <p className="mt-3 text-xs text-[#777777]">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                </p>
              </section>

              {/* 3. Hosting & Bereitstellung der Website */}
              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#181818] mb-3">
                  3. Hosting &amp; Content Delivery Networks (CDN)
                </h2>
                <h3 className="font-semibold text-[#181818] mb-1">Hosting durch Vercel</h3>
                <p className="mb-3">
                  Wir hosten unsere Website bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA. Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Server-Logfiles inklusive Ihrer IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem sowie der zuvor besuchten Seite (Referrer URL).
                </p>
                <p className="mb-3">
                  Details entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8C6D4F] hover:underline font-medium"
                  >
                    https://vercel.com/legal/privacy-policy
                  </a>.
                </p>
                <p className="mb-4">
                  Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen, schnellen und sicheren Bereitstellung unserer Website. Wir haben mit Vercel einen Vertrag über Auftragsverarbeitung (Data Processing Agreement, DPA) inklusive EU-Standardvertragsklauseln abgeschlossen.
                </p>

                <h3 className="font-semibold text-[#181818] mb-1">Content-Management &amp; Medien via Sanity.io</h3>
                <p className="mb-3">
                  Für die redaktionelle Verwaltung von Inhalten, Galeriebildern und Produktfotos nutzen wir die Plattform <strong>Sanity</strong> (Sanity Inc., 2345 Yale St, Palo Alto, CA 94306, USA). Medieninhalte werden über das Content Delivery Network von Sanity (cdn.sanity.io) ausgeliefert.
                </p>
                <p>
                  Hierbei wird Ihre IP-Adresse technisch bedingt an die Server von Sanity übertragen, um die angeforderten Bild- und Videodateien an Ihren Browser auszuliefern. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer effizienten und hochqualitativen Bilddarstellung unserer Handwerksarbeiten).
                </p>
              </section>

              {/* 4. Datenerfassung auf dieser Website */}
              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#181818] mb-3">
                  4. Datenerfassung auf dieser Website
                </h2>

                <h3 className="font-semibold text-[#181818] mb-1">SSL- bzw. TLS-Verschlüsselung</h3>
                <p className="mb-4">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen oder Bestellungen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>

                <h3 className="font-semibold text-[#181818] mb-1">Cookies &amp; Tracking</h3>
                <p className="mb-4">
                  Unsere Website verwendet <strong>keine</strong> zustimmungspflichtigen Tracking-, Analyse- oder Werbe-Cookies. Es werden keine Nutzerprofile erstellt und keine Marketing-Dienste (wie Google Analytics oder Meta-Pixel) eingesetzt.
                </p>

                <h3 className="font-semibold text-[#181818] mb-1">Kontaktformular, Projektanfragen &amp; Shop-Bestellanfragen</h3>
                <p className="mb-2">
                  Wenn Sie uns per Kontaktformular, projektbezogener Anfrage oder über die Bestellanfrage-Funktion in unserem Shop kontaktieren, werden folgende Daten erhoben und verarbeitet:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-xs sm:text-sm text-[#555555]">
                  <li>Ihr Vor- und Nachname</li>
                  <li>Ihre E-Mail-Adresse</li>
                  <li>Ihre Telefonnummer (optional, für eventuelle Rückfragen zu Maßen oder Terminen)</li>
                  <li>Ihre Anschrift bzw. Lieferadresse (Straße, Hausnummer, PLZ, Ort, Land – bei Shop- und Bestellanfragen zur Kalkulation von Versand oder Auslieferung)</li>
                  <li>Gewähltes Gewerk, Maße oder Spezifikationen sowie der Inhalt Ihrer Nachricht</li>
                </ul>
                <p className="mb-3">
                  <strong>Zweck &amp; Rechtsgrundlage:</strong> Die Verarbeitung dieser Daten erfolgt zur Bearbeitung Ihrer Anfrage, zur Erstellung eines Angebots oder zur Anbahnung bzw. Erfüllung eines Vertrages auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO sowie auf Grundlage unseres berechtigten Interesses an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="mb-3">
                  <strong>E-Mail-Übertragung:</strong> Anfragen werden über unseren E-Mail-Provider (Telekom Deutschland GmbH, Landgrabenweg 151, 53227 Bonn) per verschlüsselter SMTP-Verbindung an unser Postfach übermittelt. Eine Weitergabe Ihrer Daten an sonstige Dritte erfolgt nicht ohne Ihre ausdrückliche Einwilligung.
                </p>
                <p>
                  <strong>Speicherdauer:</strong> Die von Ihnen im Formular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere steuer- und handelsrechtliche Aufbewahrungsfristen (z. B. nach HGB/AO bei Auftragserteilung) – bleiben unberührt.
                </p>
              </section>

              {/* 5. Schriftarten & Lokale Einbindung */}
              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#181818] mb-3">
                  5. Schriftarten (Lokale Bereitstellung)
                </h2>
                <p>
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web-Fonts (Plus Jakarta Sans), die über das Next.js-Font-System (next/font) automatisch beim Erstellen der Website heruntergeladen und lokal auf dem Webserver bereitgestellt werden. Beim Aufruf der Seite wird somit <strong>keine</strong> Verbindung zu externen Servern von Google Fonts aufgebaut und keine IP-Adresse an Google übertragen.
                </p>
              </section>

              {/* 6. Videos & Medien-Dienste */}
              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#181818] mb-3">
                  6. Videos &amp; Multimedia-Inhalte
                </h2>
                <p className="mb-3">
                  Auf unserer Website sind Videos eingebunden, um Einblicke in unsere Meisterwerkstatt, Fertigung und Montagen zu gewähren.
                </p>

                <h3 className="font-semibold text-[#181818] mb-1">Direkt gehostete Videos</h3>
                <p className="mb-3">
                  Soweit Videos direkt über unsere Server bzw. das Sanity-CDN bereitgestellt werden, erfolgt die Wiedergabe ohne Einbindung von Drittanbieter-Videoplattformen und ohne externe Werbe-Tracker.
                </p>

                <h3 className="font-semibold text-[#181818] mb-1">Externe Video-Hosting-Dienste (Streamable, YouTube, Vimeo)</h3>
                <p className="mb-2">
                  Sofern im Einzelfall Videos externer Plattformen eingebunden sind:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#555555]">
                  <li>
                    <strong>Streamable:</strong> Betreiber ist Streamable Inc., 814 Mission St, San Francisco, CA 94103, USA. Beim Abspielen eines Streamable-Videos wird eine Verbindung zu den Servern von Streamable hergestellt. Datenschutz:{" "}
                    <a
                      href="https://streamable.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C6D4F] hover:underline"
                    >
                      https://streamable.com/privacy
                    </a>.
                  </li>
                  <li>
                    <strong>YouTube:</strong> Betreiber ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wir binden Videos im erweiterten Datenschutzmodus ein. Datenschutz:{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C6D4F] hover:underline"
                    >
                      https://policies.google.com/privacy
                    </a>.
                  </li>
                  <li>
                    <strong>Vimeo:</strong> Betreiber ist Vimeo Inc., 555 West 18th Street, New York, New York 10011, USA. Datenschutz:{" "}
                    <a
                      href="https://vimeo.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C6D4F] hover:underline"
                    >
                      https://vimeo.com/privacy
                    </a>.
                  </li>
                </ul>
                <p className="mt-3">
                  Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einer anschaulichen Präsentation unserer Handwerksleistungen.
                </p>
              </section>

              {/* 7. Ihre Rechte als betroffene Person */}
              <section className="border-t border-[#F2F2F0] pt-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#181818] mb-3">
                  7. Ihre Rechte als betroffene Person
                </h2>
                <p className="mb-3">
                  Sie haben nach der DSGVO umfassende Rechte bezüglich der Sie betreffenden personenbezogenen Daten:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#444444]">
                  <li>
                    <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, jederzeit unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, die unverzügliche Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten zu verlangen.
                  </li>
                  <li>
                    <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen, soweit nicht gesetzliche Pflichten (z. B. Aufbewahrungspflichten) entgegenstehen.
                  </li>
                  <li>
                    <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
                  </li>
                  <li>
                    <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Soweit Ihre Daten auf Grundlage von berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeitet werden, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einzulegen.
                  </li>
                  <li>
                    <strong>Widerrufsrecht bei Einwilligungen (Art. 7 Abs. 3 DSGVO):</strong> Sie haben das Recht, eine einmal erteilte Einwilligung zur Verarbeitung von Daten jederzeit mit Wirkung für die Zukunft zu widerrufen.
                  </li>
                </ul>

                <h3 className="font-semibold text-[#181818] mt-5 mb-1">
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h3>
                <p>
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Die für Sachsen zuständige Aufsichtsbehörde ist:
                </p>
                <div className="mt-2 p-3 bg-[#F9F9F8] rounded border border-[#E8E8E6] text-xs text-[#555555]">
                  <p className="font-semibold text-[#181818]">Die Sächsische Datenschutz- und Transparenzbeauftragte</p>
                  <p>Devrientstraße 5, 01067 Dresden</p>
                  <p>Postanschrift: Postfach 11 01 32, 01330 Dresden</p>
                  <p>Internet:{" "}
                    <a
                      href="https://www.datenschutz.sachsen.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C6D4F] hover:underline"
                    >
                      www.datenschutz.sachsen.de
                    </a>
                  </p>
                </div>
              </section>

              {/* 8. Aktualität und Änderung dieser Erklärung */}
              <section className="border-t border-[#F2F2F0] pt-6 text-xs text-[#777777]">
                <h2 className="text-sm font-bold text-[#181818] mb-1">
                  8. Aktualität und Gültigkeit
                </h2>
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand September 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Erklärung anzupassen.
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
