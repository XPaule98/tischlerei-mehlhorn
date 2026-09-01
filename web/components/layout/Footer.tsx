import Link from "next/link";
import { Phone, Mail, MapPin, Smartphone, Printer, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] text-white" id="footer">
      {/* Top CTA Banner */}
      <div className="border-b border-white/10 py-10">
        <div className="container-site flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60 block mb-1">
              Meisterbetrieb im Erzgebirge
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Planen Sie ein Bau- oder Sanierungsvorhaben?
            </h3>
          </div>
          <Link
            href="/kontakt"
            className="btn bg-white text-[#181818] hover:bg-white/90 text-xs py-2.5 px-5 flex items-center gap-1.5 flex-shrink-0"
          >
            Jetzt anfragen
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-8 h-8 bg-white text-[#181818] flex items-center justify-center font-bold text-sm">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold tracking-[0.14em] uppercase text-white">
                  TISCHLEREI
                </span>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/60">
                  MEHLHORN
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              Meisterbetrieb seit 1977 in Schönheide (Erzgebirge). Eigene Herstellung von Holzfenstern, Holz-Alu-Systemen, Haustüren und Wintergärten sowie Fachmontage geprüfter Bauelemente.
            </p>
            <div className="text-[11px] text-white/40">
              Inhaber: Tischlermeister Ronny Mehlhorn
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              {[
                { label: "Startseite", href: "/" },
                { label: "Leistungen & Gewerke", href: "/leistungen" },
                { label: "Über uns & Werkstatt", href: "/ueber-uns" },
                { label: "Galerie & Referenzen", href: "/galerie" },
                { label: "Shop & Deko", href: "/shop" },
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 mb-4">
              Gewerke
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/leistungen#eigenfertigung" className="hover:text-white transition-colors">
                  Holzfenster eigene Produktion
                </Link>
              </li>
              <li>
                <Link href="/leistungen#eigenfertigung" className="hover:text-white transition-colors">
                  Holz-Alu (System Gutmann Mira)
                </Link>
              </li>
              <li>
                <Link href="/leistungen#eigenfertigung" className="hover:text-white transition-colors">
                  Massivholz-Haustüren nach Maß
                </Link>
              </li>
              <li>
                <Link href="/leistungen#eigenfertigung" className="hover:text-white transition-colors">
                  Wintergärten & Glasbauten
                </Link>
              </li>
              <li>
                <Link href="/leistungen#bauelemente" className="hover:text-white transition-colors">
                  Kunststofffenster (VEKA & Gealan)
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt Schönheide */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 mb-4">
              Werkstatt Schönheide
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-white/50 mt-0.5 flex-shrink-0" />
                <span>
                  Neuheider Straße 64 b<br />
                  08304 Schönheide (Erzgebirge)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-white/50 flex-shrink-0" />
                <a href="tel:+49377552346" className="hover:text-white transition-colors">
                  037755 / 2346
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Smartphone size={14} className="text-white/50 flex-shrink-0" />
                <a href="tel:+4915123304776" className="hover:text-white transition-colors">
                  0151 / 23304776
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Printer size={14} className="text-white/50 flex-shrink-0" />
                <span className="text-white/50">Fax: 037755 / 3240</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-white/50 flex-shrink-0" />
                <a href="mailto:tischlerei.mehlhorn@t-online.de" className="hover:text-white transition-colors">
                  tischlerei.mehlhorn@t-online.de
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {currentYear} Tischlerei Ronny Mehlhorn · Schönheide.</span>
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
