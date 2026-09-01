import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight, Smartphone, Printer } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1815] text-[#FAF8F5]" id="footer">
      {/* Pre-Footer Banner */}
      <div className="border-b border-white/10 py-12 bg-gradient-to-r from-[#141210] via-[#1C1815] to-[#141210]">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-craft-label text-[#D4B28C] block mb-1">
              Ihr Meisterbetrieb im Erzgebirge
            </span>
            <h3 className="font-serif-heading text-2xl md:text-3xl text-white font-normal">
              Planen Sie ein Bau- oder Sanierungsvorhaben?
            </h3>
          </div>
          <Link
            href="/kontakt"
            className="btn btn-wood text-sm font-medium py-3.5 px-6 flex items-center gap-2 flex-shrink-0"
          >
            Jetzt unverbindlich anfragen
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0">
                <span className="font-serif-heading text-xl font-bold text-[#1C1815]">
                  M
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold tracking-[0.18em] uppercase text-white">
                  TISCHLEREI
                </span>
                <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D4B28C]">
                  MEHLHORN
                </span>
              </div>
            </Link>
            <p className="text-[#A89F95] text-sm leading-relaxed mb-6">
              Meisterbetrieb seit 1977 in Schönheide (Erzgebirge). Eigene Herstellung
              von Holzfenstern, Holz-Alu-Systemen, Haustüren und Wintergärten sowie
              Fachmontage geprüfter Bauelemente.
            </p>
            <div className="text-xs text-[#8C8277]">
              Inhaber: Tischlermeister Ronny Mehlhorn
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-craft-label text-[#D4B28C] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Startseite", href: "/" },
                { label: "Leistungen & Gewerke", href: "/leistungen" },
                { label: "Über uns & Werkstatt", href: "/ueber-uns" },
                { label: "Galerie & Referenzen", href: "/galerie" },
                { label: "Shop & Deko-Katalog", href: "/shop" },
                { label: "Kontakt & Anfragen", href: "/kontakt" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#A89F95] hover:text-[#FAF8F5] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#8C6D4F]">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen Highlights */}
          <div>
            <h3 className="text-craft-label text-[#D4B28C] mb-5">
              Gewerke & Systeme
            </h3>
            <ul className="space-y-3 text-sm text-[#A89F95]">
              <li>
                <Link href="/leistungen#eigenfertigung" className="hover:text-white transition-colors">
                  Holzfenster eigene Produktion
                </Link>
              </li>
              <li>
                <Link href="/leistungen#eigenfertigung" className="hover:text-white transition-colors">
                  Holz-Aluminium (Gutmann Mira)
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
                  Kunststofffenster (VEKA / Gealan)
                </Link>
              </li>
              <li>
                <Link href="/leistungen#bauelemente" className="hover:text-white transition-colors">
                  Innentüren, Tore & Beschattungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt & Anschrift Schönheide */}
          <div>
            <h3 className="text-craft-label text-[#D4B28C] mb-5">
              Werkstatt Schönheide
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#B48A58] mt-0.5 flex-shrink-0" />
                <span className="text-[#D6CCC0]">
                  Neuheider Straße 64 b<br />
                  08304 Schönheide (Erzgebirge)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#B48A58] flex-shrink-0" />
                <a
                  href="tel:+49377552346"
                  className="text-[#D6CCC0] hover:text-white transition-colors"
                >
                  037755 / 2346
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone size={16} className="text-[#B48A58] flex-shrink-0" />
                <a
                  href="tel:+4915123304776"
                  className="text-[#D6CCC0] hover:text-white transition-colors"
                >
                  0151 / 23304776
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Printer size={16} className="text-[#B48A58] flex-shrink-0" />
                <span className="text-[#A89F95]">Fax: 037755 / 3240</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#B48A58] flex-shrink-0" />
                <a
                  href="mailto:tischlerei.mehlhorn@t-online.de"
                  className="text-[#D6CCC0] hover:text-white transition-colors"
                >
                  tischlerei.mehlhorn@t-online.de
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C8277]">
          <span>© {currentYear} Tischlerei Ronny Mehlhorn · Schönheide. Alle Rechte vorbehalten.</span>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-[#D6CCC0] transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[#D6CCC0] transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
