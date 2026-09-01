"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  // On non-home pages, keep header with solid background by default for readability
  const isSolid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Tischlerei Mehlhorn – Startseite"
            >
              {/* Black square with "M" */}
              <div
                className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isSolid ? "bg-[#121212]" : "bg-white"
                }`}
              >
                <span
                  className={`text-xl font-black tracking-tight transition-colors duration-300 ${
                    isSolid ? "text-white" : "text-[#121212]"
                  }`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  M
                </span>
              </div>
              {/* Company Name */}
              <div className="flex flex-col leading-none">
                <span
                  className={`text-sm font-black tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isSolid ? "text-[#121212]" : "text-white"
                  }`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  TISCHLEREI
                </span>
                <span
                  className={`text-sm font-black tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isSolid ? "text-[#121212]" : "text-white"
                  }`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  MEHLHORN
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide transition-all duration-200 py-1 border-b-2 ${
                      isActive
                        ? isSolid
                          ? "text-[#121212] border-[#121212]"
                          : "text-white border-white font-bold"
                        : isSolid
                        ? "text-gray-600 border-transparent hover:text-[#121212] hover:border-gray-300"
                        : "text-white/80 border-transparent hover:text-white hover:border-white/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link
                href="/kontakt"
                className={`hidden lg:inline-flex items-center gap-2 btn text-sm py-2.5 px-5 ${
                  isSolid
                    ? "btn-primary"
                    : "bg-white text-[#121212] border-white hover:bg-[#E5DECE] hover:border-[#E5DECE]"
                }`}
              >
                Angebot anfragen
                <ChevronRight size={14} />
              </Link>

              {/* Mobile Hamburger */}
              <button
                id="mobile-menu-toggle"
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  isSolid ? "text-[#121212]" : "text-white"
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#121212]/98 backdrop-blur-lg flex flex-col pt-24"
          role="dialog"
          aria-label="Mobilnavigation"
        >
          <nav className="container-site py-6 flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-left text-2xl font-bold py-3.5 border-b border-white/10 transition-colors ${
                    isActive ? "text-[#E5DECE] pl-2 border-l-2 border-l-[#E5DECE]" : "text-white/80 hover:text-white"
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary mt-6 text-base w-full flex items-center justify-center gap-2"
            >
              Unverbindlich anfragen
              <ChevronRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
