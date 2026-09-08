import Link from "next/link";
import { Phone, Mail, MapPin, Smartphone, Printer, ArrowRight } from "lucide-react";

interface FooterProps {
  hideCta?: boolean;
}

export default function Footer({ hideCta = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] text-white" id="footer">
      {/* Top CTA Banner (hidden on contact/inquiry page) */}
      {!hideCta && (
        <div className="border-b border-white/10 py-6 sm:py-8">
          <div className="container-site flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 block mb-0.5">
                Meisterbetrieb im Erzgebirge
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Planen Sie ein Bau- oder Sanierungsvorhaben?
              </h3>
            </div>
            <Link
              href="/kontakt"
              className="btn bg-white text-[#181818] hover:bg-white/90 text-xs py-2 px-4.5 flex items-center gap-1.5 flex-shrink-0"
            >
              Jetzt anfragen
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* Main Footer Columns - Compact & Streamlined */}
      <div className="container-site py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2.5 group inline-flex">
              <div className="w-7 h-7 bg-white text-[#181818] flex items-center justify-center font-bold text-xs">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white">
                  TISCHLEREI
                </span>
                <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-white/60">
                  MEHLHORN
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-xs leading-relaxed mb-3">
              Meisterbetrieb seit 1977 in Schönheide. Individuelle Holz- &amp; Holz-Alu-Fenster, Haustüren und Fachmontage.
            </p>
            <div className="text-[11px] text-white/40">
              Inhaber: Tischlermeister Ronny Mehlhorn
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 mb-2.5">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-white/60">
              {[
                { label: "Startseite", href: "/" },
                { label: "Leistungen & Gewerke", href: "/leistungen" },
                { label: "Shop & Deko", href: "/shop" },
                { label: "Über uns & Werkstatt", href: "/ueber-uns" },
                { label: "Galerie & Referenzen", href: "/galerie" },
                { label: "Kontakt & Anfragen", href: "/kontakt" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 mb-2.5">
              Gewerke
            </h4>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li>
                <Link href="/leistungen#service-holzfenster" className="hover:text-white transition-colors">
                  Holzfenster eigene Produktion
                </Link>
              </li>
              <li>
                <Link href="/leistungen#service-holzalu" className="hover:text-white transition-colors">
                  Holz-Alu (System Gutmann Mira)
                </Link>
              </li>
              <li>
                <Link href="/leistungen#service-haustueren" className="hover:text-white transition-colors">
                  Massivholz-Haustüren nach Maß
                </Link>
              </li>
              <li>
                <Link href="/leistungen#service-wintergaerten" className="hover:text-white transition-colors">
                  Wintergärten &amp; Glasbauten
                </Link>
              </li>
              <li>
                <Link href="/leistungen#service-kunststoff" className="hover:text-white transition-colors">
                  Kunststofffenster (VEKA &amp; Gealan)
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt Schönheide */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 mb-2.5">
              Kontakt &amp; Werkstatt
            </h4>
            <ul className="space-y-1.5 text-xs text-white/70">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-white/50 mt-0.5 flex-shrink-0" />
                <span>Neuheider Straße 64 b, 08304 Schönheide</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-white/50 flex-shrink-0" />
                <a href="tel:+49377552346" className="hover:text-white transition-colors">
                  037755 / 2346
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Smartphone size={13} className="text-white/50 flex-shrink-0" />
                <a href="tel:+4915123304776" className="hover:text-white transition-colors">
                  0151 / 23304776
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-white/50 flex-shrink-0" />
                <a href="mailto:tischlerei.mehlhorn@t-online.de" className="hover:text-white transition-colors">
                  tischlerei.mehlhorn@t-online.de
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Designer Attribution & Legal Links */}
      <div className="border-t border-white/10">
        <div className="container-site py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {currentYear} Tischlerei Ronny Mehlhorn · Schönheide.</span>

          {/* Designer Credit */}
          <div className="flex items-center">
            <a
              href="https://paulus.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
              title="paulus.digital – Grafik | Webdesign | Content"
            >
              <span className="text-[11px]">Designed by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/paulus-digital-logo.jpg"
                alt="paulus.digital Logo"
                className="h-4.5 w-auto object-contain rounded-xs bg-white px-1 py-0.5 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[11px] font-semibold text-white/70 group-hover:text-white transition-colors">
                paulus.digital
              </span>
            </a>
          </div>

          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-white/70 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white/70 transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
