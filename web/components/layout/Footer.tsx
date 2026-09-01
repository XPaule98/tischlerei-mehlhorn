import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Share2, Users, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-white" id="footer">
      {/* Pre-Footer Banner */}
      <div className="border-b border-white/10 py-12 bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#121212]">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-label text-[#E5DECE] block mb-1">Ihr Projekt in Meisterhand</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Planen Sie ein Bau- oder Sanierungsvorhaben?
            </h3>
          </div>
          <Link
            href="/kontakt"
            className="btn bg-[#E5DECE] text-[#121212] border-[#E5DECE] hover:bg-white hover:border-white font-bold flex items-center gap-2 flex-shrink-0"
          >
            Jetzt unverbindlich anfragen
            <ArrowRight size={16} />
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
                <span
                  className="text-xl font-black text-[#121212]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  M
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-sm font-black tracking-[0.15em] uppercase text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  TISCHLEREI
                </span>
                <span
                  className="text-sm font-black tracking-[0.15em] uppercase text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  MEHLHORN
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Präzision in Holz & moderne Bauelemente seit 1977. Meisterbetrieb
              unter Leitung von Ronny Mehlhorn. Eigene Fertigung, Handel und Fachmontage.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Teilen"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <Share2 size={16} />
              </a>
              <a
                href="/ueber-uns"
                aria-label="Über uns"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <Users size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3
              className="text-label text-gray-400 mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
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
                    className="text-gray-400 hover:text-[#E5DECE] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight size={12} className="text-[#E5DECE]/50" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen Highlights */}
          <div>
            <h3
              className="text-label text-gray-400 mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Gewerke
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Holz- & Holz-Alu-Fenster", href: "/leistungen#eigenfertigung" },
                { label: "Massivholz-Haustüren", href: "/leistungen#eigenfertigung" },
                { label: "Wintergärten & Glasbauten", href: "/leistungen#eigenfertigung" },
                { label: "Kunststoff- & Alufenster", href: "/leistungen#bauelemente" },
                { label: "Innentüren & Zargen", href: "/leistungen#bauelemente" },
                { label: "Garagentore & Antriebe", href: "/leistungen#bauelemente" },
                { label: "Rollladen & Klappläden", href: "/leistungen#bauelemente" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt & Öffnungszeiten */}
          <div>
            <h3
              className="text-label text-gray-400 mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Kontakt & Zeiten
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#E5DECE] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Musterstraße 1<br />
                  00000 Musterstadt
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#E5DECE] flex-shrink-0" />
                <a
                  href="tel:+490000000000"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +49 (0) 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#E5DECE] flex-shrink-0" />
                <a
                  href="mailto:info@tischlerei-mehlhorn.de"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@tischlerei-mehlhorn.de
                </a>
              </li>
              <li className="flex items-start gap-3 pt-2 border-t border-white/10">
                <Clock size={16} className="text-[#E5DECE] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-gray-300">
                  <div className="flex justify-between gap-4">
                    <span>Mo – Fr:</span>
                    <span className="font-semibold">07:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between gap-4 mt-0.5">
                    <span>Samstag:</span>
                    <span className="font-semibold">08:00 – 12:00</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {currentYear} Tischlerei Mehlhorn · Inh. Ronny Mehlhorn. Alle Rechte vorbehalten.</span>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-gray-300 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gray-300 transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
