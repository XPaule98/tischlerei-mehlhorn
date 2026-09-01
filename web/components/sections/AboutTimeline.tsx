"use client";

import { useEffect, useRef } from "react";

const timelineEvents = [
  {
    year: "1977",
    title: "Gründung",
    description:
      "Roland Mehlhorn gründet im Januar 1977 die Tischlerei Mehlhorn. Mit handwerklicher Leidenschaft und dem Fokus auf Qualität beginnt die Erfolgsgeschichte.",
    icon: "🪵",
  },
  {
    year: "1992",
    title: "Neubau des Firmengebäudes",
    description:
      "Umzug in das neu erbaute Firmengebäude. Stetiger Ausbau vom Gestellbau zur modernen Herstellung von Bauelementen für anspruchsvolle Architektenhäuser.",
    icon: "🏗️",
  },
  {
    year: "2012",
    title: "Betriebsübergabe",
    description:
      "Am 1. Juli 2012 übergibt Roland Mehlhorn den Betrieb an seinen Sohn Ronny Mehlhorn. Tradition trifft Innovation – ein nahtloser Generationswechsel.",
    icon: "🤝",
  },
  {
    year: "Heute",
    title: "Meisterschaft & Moderne",
    description:
      "Über 45 Jahre Erfahrung im Tischlerhandwerk. Eigene Fertigung von Holzfenstern, Türen und Wintergärten – kombiniert mit modernen Bauelementen und Fachmontage.",
    icon: "⭐",
  },
];

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ueber-uns"
      ref={sectionRef}
      className="section-pad bg-[#f9fafb]"
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-label text-gray-400 mb-3">Geschichte & Tradition</p>
          <h2
            id="about-heading"
            className="text-display text-[#121212] text-3xl md:text-5xl mb-5"
          >
            Über uns
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Eine Familientradition aus Leidenschaft zum Handwerk – vier Jahrzehnte
            Qualität in Holz und Bauelementen.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#121212] via-[#E5DECE] to-transparent transform md:-translate-x-px" />

          <div className="space-y-0">
            {timelineEvents.map((event, i) => (
              <div
                key={event.year}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`relative flex items-start gap-6 md:gap-0 pb-14 timeline-item`}
                style={
                  {
                    "--delay": `${i * 120}ms`,
                  } as React.CSSProperties
                }
              >
                {/* Mobile/Tablet layout: all left-aligned */}
                <div className="flex items-start gap-6 md:hidden w-full pl-0">
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div className="w-16 h-16 bg-[#121212] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{event.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-3">
                    <div className="text-label text-[#121212]/40 mb-1">{event.year}</div>
                    <h3
                      className="text-xl font-bold text-[#121212] mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Desktop: alternating layout */}
                <div
                  className={`hidden md:flex w-full items-start ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      i % 2 === 0 ? "text-right pr-10" : "text-left pl-10"
                    }`}
                  >
                    <div className={`text-label text-gray-400 mb-2 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                      {event.year}
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#121212] mb-3"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {event.description}
                    </p>
                  </div>

                  {/* Center Dot */}
                  <div className="w-2/12 flex justify-center flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 bg-[#121212] rounded-full flex items-center justify-center shadow-xl border-4 border-[#f9fafb]">
                      <span className="text-2xl">{event.icon}</span>
                    </div>
                  </div>

                  {/* Empty side */}
                  <div className="w-5/12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease var(--delay), transform 0.6s ease var(--delay);
        }
        .timeline-item.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
