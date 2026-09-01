"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/galerie", label: "Galerie" },
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
  const isSolid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isSolid
            ? "bg-white/95 backdrop-blur-md border-b border-[#E8E8E6] py-3 sm:py-3.5"
            : "bg-transparent py-3.5 sm:py-4 md:py-5"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between gap-3">
            {/* Clean Logo – Unconstrained, never overlaps */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Tischlerei Mehlhorn – Startseite"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 transition-colors ${
                  isSolid ? "bg-[#181818] text-white" : "bg-white text-[#181818]"
                }`}
              >
                M
              </div>

              <div className="flex flex-col leading-tight">
                <span
                  className={`text-xs sm:text-sm font-bold tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                    isSolid ? "text-[#181818]" : "text-white"
                  }`}
                >
                  TISCHLEREI
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                    isSolid ? "text-[#777777]" : "text-white/80"
                  }`}
                >
                  MEHLHORN
                </span>
              </div>
            </Link>

            {/* Desktop Nav (Visible on Large Screens) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-medium tracking-wide uppercase transition-colors py-1 ${
                      isActive
                        ? isSolid
                          ? "text-[#181818] font-bold border-b-2 border-[#181818]"
                          : "text-white font-bold border-b-2 border-white"
                        : isSolid
                        ? "text-[#666666] hover:text-[#181818]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="tel:+49377552346"
                className={`hidden xl:flex items-center gap-1.5 text-xs font-medium px-2 py-1 transition-colors ${
                  isSolid ? "text-[#555555] hover:text-[#181818]" : "text-white/80 hover:text-white"
                }`}
              >
                <Phone size={13} className="text-[#8C6D4F]" />
                037755 / 2346
              </a>

              {/* Desktop CTA Button (Hidden on Mobile/Tablet to keep header clean and prevent logo clipping) */}
              <Link
                href="/kontakt"
                className={`hidden md:inline-flex items-center gap-1.5 btn text-xs py-2 px-4 rounded ${
                  isSolid
                    ? "btn-primary"
                    : "bg-white text-[#181818] hover:bg-white/90"
                }`}
              >
                Anfrage senden
                <ChevronRight size={13} />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                id="mobile-menu-toggle"
                className={`lg:hidden p-2 rounded transition-colors cursor-pointer ${
                  isSolid ? "text-[#181818] hover:bg-[#F2F2F0]" : "text-white hover:bg-white/10"
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

      {/* Mobile Drawer Slideout Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#181818] flex flex-col pt-16 pb-8 px-6 text-white overflow-y-auto animate-in fade-in-50 duration-200"
          role="dialog"
          aria-label="Mobilnavigation"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white text-[#181818] font-bold flex items-center justify-center text-xs">M</div>
              <span className="text-xs font-bold uppercase tracking-wider">Tischlerei Mehlhorn</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/80 hover:text-white cursor-pointer"
              aria-label="Schließen"
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
                  className={`text-base py-3 px-3 rounded transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-white/75 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="text-white/40" />
                </Link>
              );
            })}
          </nav>

          {/* Prominent Mobile CTA Section */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <Link
              href="/kontakt"
              onClick={() => setIsOpen(false)}
              className="btn bg-white text-[#181818] hover:bg-white/90 w-full text-center py-3.5 text-sm font-bold flex items-center justify-center gap-2 rounded shadow-sm"
            >
              Anfrage senden
              <ChevronRight size={15} />
            </Link>

            <div className="text-xs text-white/60 space-y-1 text-center pt-2">
              <p className="font-semibold text-white/80">Tischlerei Ronny Mehlhorn</p>
              <p>Neuheider Straße 64 b · 08304 Schönheide</p>
              <a href="tel:+49377552346" className="inline-block text-[#8C6D4F] font-semibold hover:underline">
                Tel: 037755 / 2346
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
