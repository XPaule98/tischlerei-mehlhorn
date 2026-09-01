"use client";

import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

type Category = "alle" | "eigenfertigung" | "bauelemente";

const services = [
  {
    id: "holzfenster",
    title: "Holzfenster",
    category: "eigenfertigung" as const,
    image: "/images/service-fenster.jpg",
    description:
      "Handgefertigte Holzfenster aus heimischen Edelhölzern. Maßgefertigt für höchste Wärmedämmung und zeitlose Ästhetik.",
    features: [
      "Eiche, Kiefer, Lärche, Meranti",
      "Moderne Isolierglasvarianten",
      "Spezielle Oberflächenbehandlungen",
      "Markenbeschläge",
      "Maßanfertigung",
    ],
  },
  {
    id: "holz-alu-fenster",
    title: "Holz-Aluminium-Fenster",
    category: "eigenfertigung" as const,
    image: "/images/service-fenster.jpg",
    description:
      "Das Beste aus zwei Welten: Wärme des Holzes innen, langlebiges Aluminium außen. Wartungsarm und energieeffizient.",
    features: [
      "Kein Streichen außen nötig",
      "Beste Wärmedämmwerte",
      "Individuell kombinierbar",
      "Diverse Farben & Dekore",
    ],
  },
  {
    id: "haustueren",
    title: "Hauseingangstüren",
    category: "eigenfertigung" as const,
    image: "/images/service-tuer.jpg",
    description:
      "Massivholz-Hauseingangstüren und Verbundtüren. Der erste Eindruck zählt – wir fertigen Türen mit Charakter.",
    features: [
      "Massivholz & Verbundkonstruktion",
      "Höchste Einbruchhemmung",
      "Wärme- & Schallschutz",
      "Exklusive Oberflächen",
      "Sondermaße möglich",
    ],
  },
  {
    id: "wintergaerten",
    title: "Wintergärten & Glasbauten",
    category: "eigenfertigung" as const,
    image: "/images/service-wintergarten.jpg",
    description:
      "Ganzjährig nutzbare Wintergärten in Holz- oder Holz-Alu-Konstruktion. Lichtdurchflutetes Wohnen mit Naturanbindung.",
    features: [
      "Kalt- & Warmwintergärten",
      "Isolierglasdächer",
      "Vollständige Planung & Montage",
      "Individuell nach Maß",
    ],
  },
  {
    id: "kunststoff-fenster",
    title: "Kunststoff- & Aluminiumfenster",
    category: "bauelemente" as const,
    image: "/images/service-fenster.jpg",
    description:
      "Hochwertige Kunststoff- und Aluminiumfenster führender Hersteller. Beratung, Lieferung und Fachmontage aus einer Hand.",
    features: [
      "Führende Markenhersteller",
      "Alle Farben & Formen",
      "Wärmedämmglas Triple",
      "Fachmontage inklusive",
    ],
  },
  {
    id: "innentüren",
    title: "Innentüren",
    category: "bauelemente" as const,
    image: "/images/service-tuer.jpg",
    description:
      "Von der schlichten Normtür bis zur exklusiven Stiltür – große Auswahl bei Markenherstellern. Passende Zargen und Beschläge.",
    features: [
      "Normtüren bis Designtüren",
      "Schiebetüren & Falttüren",
      "Schallschutztüren",
      "Türzargen & Beschläge",
    ],
  },
  {
    id: "garagentore",
    title: "Garagentore",
    category: "bauelemente" as const,
    image: "/images/hero-bg.jpg",
    description:
      "Sektionaltore, Schwingtor, Rolltor – inklusive Antrieb, Steuerung und Montage. Moderne Lösungen für jede Garagenöffnung.",
    features: [
      "Sektional-, Schwing-, Rolltore",
      "Elektrische Antriebe",
      "Smart-Home Integration",
      "Sicherheitstechnik",
    ],
  },
  {
    id: "rollladen",
    title: "Rollladen & Klappläden",
    category: "bauelemente" as const,
    image: "/images/service-wintergarten.jpg",
    description:
      "Auf- und Vorbaurollladen, Klappläden – für Sichtschutz, Sonnenschutz und Sicherheit. Motorisierung auf Wunsch.",
    features: [
      "Auf- & Vorbaurollladen",
      "Klappläden & Raffstoren",
      "Motorisierung & Timer",
      "Nachrüstung möglich",
    ],
  },
];

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-label text-white/80">
            {service.category === "eigenfertigung"
              ? "Eigene Fertigung"
              : "Handel & Montage"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold text-[#121212] mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        <ul className="space-y-2">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={14} className="text-[#121212] flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("alle");

  const filtered =
    activeCategory === "alle"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="leistungen"
      className="section-pad bg-white"
      aria-labelledby="services-heading"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-label text-gray-400 mb-3">Was wir für Sie tun</p>
          <h2
            id="services-heading"
            className="text-display text-[#121212] text-3xl md:text-5xl mb-5"
          >
            Leistungen
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Von der Einzelanfertigung bis zur schlüsselfertigen Montage – alles aus
            einer erfahrenen Hand.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Leistungskategorien filtern"
        >
          {(
            [
              { value: "alle", label: "Alle Leistungen" },
              { value: "eigenfertigung", label: "Eigene Fertigung" },
              { value: "bauelemente", label: "Bauelemente & Montage" },
            ] as { value: Category; label: string }[]
          ).map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeCategory === tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === tab.value
                  ? "bg-[#121212] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-500 mb-4">
            Haben Sie eine spezielle Anforderung? Wir beraten Sie gerne.
          </p>
          <a href="#kontakt" className="btn btn-primary inline-flex">
            Persönliche Beratung anfragen
          </a>
        </div>
      </div>
    </section>
  );
}
