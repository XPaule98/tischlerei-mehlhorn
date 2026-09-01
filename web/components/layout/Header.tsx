"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/galerie", label: "Galerie & Referenzen" },
  { href: "/shop", label: "Shop & Deko" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isHome = pathname === "/";
  // Solid white header on subpages or when scrolled
  const isSolid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isSolid
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E6DED4] py-3 md:py-3.5"
            : "bg-transparent py-4 md:py-5"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group"
              aria-label="Tischlerei Mehlhorn – Startseite"
            >
              {/* Black square with "M" */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-sm ${
                  isSolid ? "bg-[#1E1A17]" : "bg-white"
                }`}
              >
                <span
                  className={`text-lg sm:text-xl font-bold transition-colors duration-300 font-serif-heading ${
                    isSolid ? "text-white" : "text-[#1E1A17]"
                  }`}
                >
                  M
                </span>
              </div>

              {/* Company Name */}
              <div className="flex flex-col leading-none">
                <span
                  className={`text-xs sm:text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isSolid ? "text-[#1E1A17]" : "text-white"
                  }`}
                >
                  TISCHLEREI
                </span>
                <span
                  className={`text-xs sm:text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isSolid ? "text-[#8C6D4F]" : "text-[#D4B28C]"
                  }`}
                >
                  MEHLHORN
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 py-1 border-b-2 ${
                      isActive
                        ? isSolid
                          ? "text-[#1E1A17] border-[#1E1A17]"
                          : "text-white border-white"
                        : isSolid
                        ? "text-[#5E564E] border-transparent hover:text-[#1E1A17] hover:border-[#8C6D4F]"
                        : "text-white/80 border-transparent hover:text-white hover:border-white/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Direct Phone & CTA */}
              <a
                href="tel:+49377552346"
                className={`hidden xl:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded transition-colors ${
                  isSolid
                    ? "text-[#5E564E] hover:text-[#1E1A17]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Phone size={14} className="text-[#8C6D4F]" />
                037755 / 2346
              </a>

              <Link
                href="/kontakt"
                className={`hidden sm:inline-flex items-center gap-2 btn text-xs font-semibold py-2.5 px-4 sm:px-5 ${
                  isSolid ? "btn-wood" : "btn-wood"
                }`}
              >
                Angebot anfragen
                <ChevronRight size={14} />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                id="mobile-menu-toggle"
                className={`lg:hidden p-2 rounded-md transition-colors cursor-pointer ${
                  isSolid ? "text-[#1E1A17] hover:bg-[#F3ECE2]" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Safe Area / In-App Browser Ready) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#161311]/98 backdrop-blur-xl flex flex-col pt-20 pb-8 px-6 text-white overflow-y-auto"
          role="dialog"
          aria-label="Mobilnavigation"
        >
          {/* Close Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-base font-bold text-[#1E1A17] font-serif-heading">M</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">Tischlerei Mehlhorn</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded text-white/80 hover:text-white"
              aria-label="Menü schließen"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 py-6 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-serif-heading py-3 px-3 rounded transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#D4B28C] bg-white/10 font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="text-white/40" />
                </Link>
              );
            })}
          </nav>

          {/* Quick Contact & Action in Mobile Drawer */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="text-xs text-white/70 space-y-1">
              <p className="font-semibold text-[#D4B28C]">Tischlerei Ronny Mehlhorn</p>
              <p>Neuheider Straße 64 b, 08304 Schönheide</p>
              <p>Tel: 037755 / 2346 · Mobil: 0151 / 23304776</p>
            </div>

            <Link
              href="/kontakt"
              onClick={() => setIsOpen(false)}
              className="btn btn-wood w-full text-center py-3 text-sm font-medium flex items-center justify-center gap-2"
            >
              Unverbindlich anfragen
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
