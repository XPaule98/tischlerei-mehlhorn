"use client";

import { useEffect, useRef } from "react";

const timelineEvents = [
  {
    year: "1977",
    tagline: "Die Gründung",
    title: "Der Ursprung im Handwerk",
    description:
      "Roland Mehlhorn gründet im Januar 1977 die Tischlerei. Mit traditionellem Gestellbau und kompromisslosem Qualitätsanspruch entsteht das Fundament für über vier Jahrzehnte Handwerksgeschichte.",
  },
  {
    year: "1992",
    tagline: "Expansion & Neubau",
    title: "Umzug in das neue Firmengebäude",
    description:
      "Mit dem Neubau des heutigen Firmengebäudes wird die Werkstatt modernisiert. Die Produktion wird gezielt auf hochwertige Holzfenster, Hauseingangstüren und komplexe Wintergartenbauten für anspruchsvolle Architektenhäuser ausgeweitet.",
  },
  {
    year: "2012",
    tagline: "Generationswechsel",
    title: "Meisterübergabe an Ronny Mehlhorn",
    description:
      "Am 1. Juli 2012 übernimmt Sohn und Tischlermeister Ronny Mehlhorn die Betriebsführung. Die bewährte Familientradition wird nahtlos mit modernen Fertigungsmethoden und innovativer Montagetechnik verknüpft.",
  },
  {
    year: "Heute",
    tagline: "Zukunft & Beständigkeit",
    title: "Präzision aus Meisterhand",
    description:
      "Über 45 Jahre Erfahrung im Tischlerhandwerk. Eigene Maßfertigung von Holz- und Holz-Alu-Elementen, ergänzt um ein umfassendes Sortiment geprüfter Marken-Bauelemente mit zuverlässiger Fachmontage.",
  },
];

export default function AboutTimeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="historie"
      className="section-pad bg-[#F4EFEA]"
      aria-labelledby="timeline-heading"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-craft-label block mb-2">Familienbetrieb seit 1977</span>
          <h2
            id="timeline-heading"
            className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] mb-4 font-normal"
          >
            Vier Jahrzehnte Handwerkskunst
          </h2>
          <p className="text-[#6B635B] text-base md:text-lg">
            Vom traditionellen Meisterbetrieb zum modernen Spezialisten für anspruchsvolle Bauelemente.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative max-w-3xl mx-auto">
          {/* Subtle Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-[#D8CEBF] transform md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, i) => (
              <div
                key={event.year}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="relative flex flex-col md:flex-row items-start transition-all duration-700 opacity-0 translate-y-6"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Mobile view */}
                <div className="flex md:hidden pl-14 relative w-full">
                  <div className="absolute left-3.5 top-1.5 w-5 h-5 rounded-full bg-[#1E1A17] border-4 border-[#F4EFEA] -translate-x-1/2" />
                  <div className="bg-white p-6 rounded-lg border border-[#E6DED4] w-full shadow-sm">
                    <span className="text-craft-label block mb-1">{event.tagline}</span>
                    <div className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-2">
                      {event.year} — {event.title}
                    </div>
                    <p className="text-[#6B635B] text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Desktop alternating layout */}
                <div
                  className={`hidden md:flex w-full items-center ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <span className="text-craft-label block mb-1">{event.tagline}</span>
                    <div className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-2">
                      {event.year} · {event.title}
                    </div>
                    <p className="text-[#6B635B] text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Center Dot with Year Badge */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#1E1A17] ring-4 ring-[#F4EFEA]" />
                  </div>

                  {/* Empty side */}
                  <div className="w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
