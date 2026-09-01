"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#121212]"
      aria-label="Hero-Bereich"
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt="Tischlerei Mehlhorn Werkstatt"
          className="w-full h-full object-cover object-center opacity-50"
          priority-loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/90 via-[#121212]/60 to-[#121212]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#E5DECE]/60 to-transparent z-10 hidden lg:block" />

      {/* Content */}
      <div className="container-site relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Label */}
          <div
            className={`text-label text-[#E5DECE] mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Seit 1977 · Tischlermeister Ronny Mehlhorn
          </div>

          {/* Main Headline */}
          <h1
            className={`text-display text-white text-4xl md:text-6xl lg:text-7xl mb-6 transition-all duration-700 delay-100 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <span className="block">Präzision in</span>
            <span className="block gradient-text">Holz & Glas.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Moderne Bauelemente seit 1977. Eigene Herstellung, Handel und
            Fachmontage – für anspruchsvolle Architekten und Bauherren.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <button
              id="hero-cta-leistungen"
              onClick={() => scrollToSection("#leistungen")}
              className="btn bg-white text-[#121212] border-white hover:bg-[#E5DECE] hover:border-[#E5DECE] text-sm"
            >
              Leistungen entdecken
              <ChevronRight size={16} />
            </button>
            <button
              id="hero-cta-anfrage"
              onClick={() => scrollToSection("#kontakt")}
              className="btn btn-outline text-sm"
            >
              Unverbindlich anfragen
            </button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/20 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {[
              { number: "45+", label: "Jahre Erfahrung" },
              { number: "1977", label: "Gegründet" },
              { number: "100%", label: "Handarbeit" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl md:text-4xl font-black text-white mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.number}
                </div>
                <div className="text-xs text-white/50 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scrollen</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
