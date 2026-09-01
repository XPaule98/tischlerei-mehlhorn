"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#161311] text-[#FAF8F5]"
      aria-label="Tischlerei Mehlhorn Einführung"
    >
      {/* Background Image with warm wood-grain tonal grade */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt="Tischlerei Mehlhorn Werkstatt und Holzhandwerk"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Warm Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#161311]/70 to-[#161311]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/40" />
      </div>

      {/* Hero Content */}
      <div className="container-site relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          {/* Subtle Craft Label */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-8 h-[1px] bg-[#B48A58]" />
            <span className="text-craft-label text-[#D4B28C]">
              Meisterbetrieb seit 1977 · Inh. Ronny Mehlhorn
            </span>
          </div>

          {/* Main Serif Headline */}
          <h1
            className={`font-serif-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.12] mb-7 text-[#FAF8F5] transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Präzision in Holz. <br />
            <span className="italic font-light text-[#E8D9C5]">
              Beständigkeit für Generationen.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-normal transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Eigene Herstellung von Fenstern, Haustüren und Wintergärten sowie
            fachgerechte Montage geprüfter Marken-Bauelemente.
          </p>

          {/* CTA Group */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <Link
              href="/leistungen"
              className="btn btn-wood text-sm font-medium py-3.5 px-6 flex items-center justify-center gap-2"
            >
              Leistungen entdecken
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/kontakt"
              className="btn btn-outline text-sm font-medium py-3.5 px-6 flex items-center justify-center"
            >
              Unverbindlich anfragen
            </Link>
          </div>

          {/* Statistics Bar */}
          <div
            className={`grid grid-cols-3 gap-6 pt-12 mt-14 border-t border-white/15 max-w-xl transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div>
              <div className="font-serif-heading text-3xl md:text-4xl text-[#FAF8F5] mb-1 font-normal">
                45+
              </div>
              <div className="text-xs text-[#A89F95] uppercase tracking-wider font-medium">
                Jahre Erfahrung
              </div>
            </div>
            <div>
              <div className="font-serif-heading text-3xl md:text-4xl text-[#FAF8F5] mb-1 font-normal">
                1977
              </div>
              <div className="text-xs text-[#A89F95] uppercase tracking-wider font-medium">
                Gegründet
              </div>
            </div>
            <div>
              <div className="font-serif-heading text-3xl md:text-4xl text-[#FAF8F5] mb-1 font-normal">
                100%
              </div>
              <div className="text-xs text-[#A89F95] uppercase tracking-wider font-medium">
                Meisterqualität
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
