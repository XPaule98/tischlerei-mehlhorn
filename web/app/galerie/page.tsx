"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Link from "next/link";
import { Sparkles, ArrowRight, Eye } from "lucide-react";

type Category = "alle" | "fenster" | "tueren" | "wintergarten" | "deko";

const projects = [
  {
    id: "1",
    title: "Denkmalgeschützte Eichen-Kastenfenster",
    category: "fenster" as const,
    categoryLabel: "Holzfenster",
    image: "/images/service-fenster.jpg",
    description: "Rekonstruktion historischer Sprossenfenster nach Denkmalschutzauflagen mit integrierter Wärmeschutzverglasung.",
    details: "Eiche massiv · 3-fach Isolierglas · Zierprofile",
  },
  {
    id: "2",
    title: "Exklusive Massivholz-Eingangstür mit Seitenteil",
    category: "tueren" as const,
    categoryLabel: "Haustüren",
    image: "/images/service-tuer.jpg",
    description: "Moderne Haustüranlage in Räuchereiche-Optik mit verdeckten Bändern, Sicherheitsverriegelung und sandgestrahltem Lichtband.",
    details: "Eiche geräuchert · RC3 Einbruchschutz · Fingerscan",
  },
  {
    id: "3",
    title: "Warmwintergarten als Wohnraumerweiterung",
    category: "wintergarten" as const,
    categoryLabel: "Wintergärten",
    image: "/images/service-wintergarten.jpg",
    description: "Ganzjährig bewohnbarer Wintergarten mit tragender Leimholzkonstruktion, selbstreinigendem Glasdach und Hebeschiebetüren.",
    details: "Holz-Aluminium · Sonnenschutzglas · Beheizt",
  },
  {
    id: "4",
    title: "Holz-Alu Fensterelemente für modernes Architektenhaus",
    category: "fenster" as const,
    categoryLabel: "Holz-Alu Fenster",
    image: "/images/hero-bg.jpg",
    description: "Großflächige Festverglasungen und Hebe-Schiebe-Elemente mit anthrazitfarbener Aluminiumschale außen.",
    details: "Passivhausstandard · RAL 7016 Anthrazit · Eiche natur",
  },
  {
    id: "5",
    title: "Handgefertigte Massivholz-Hirnholzbretter & Regale",
    category: "deko" as const,
    categoryLabel: "Deko & Kleinmöbel",
    image: "/images/catalog-schneidebrett.jpg",
    description: "Artisan-Küchenaccessoires und schwebende Regalsysteme mit natürlicher Baumkante und biologischer Ölung.",
    details: "Eiche massiv · Bio-Leinöl · End Grain",
  },
  {
    id: "6",
    title: "Schwebendes Wandregalsystem aus Massiveiche",
    category: "deko" as const,
    categoryLabel: "Deko & Kleinmöbel",
    image: "/images/catalog-regal.jpg",
    description: "Minimalistische Wandborde mit unsichtbarer Trägeraufhängung für modernen Wohnkomfort.",
    details: "Massiveiche natur · Unsichtbare Schwerlastanker",
  },
];

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("alle");

  const filteredProjects =
    activeCategory === "alle"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-[#121212] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-label text-[#E5DECE] block mb-3">Referenzen & Eindrücke</span>
            <h1 className="text-display text-4xl md:text-6xl max-w-3xl mb-6">
              Handwerkliche Meisterwerke in Bildern.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Lassen Sie sich von unseren realisierten Projekten inspirieren. Von
              historischen Fenstern über anspruchsvolle Wintergärten bis hin zu
              exklusiven Werkstücken.
            </p>
          </div>
        </section>

        {/* Interactive Before / After Section */}
        <BeforeAfterSlider
          beforeSrc="/images/hero-bg.jpg"
          afterSrc="/images/service-wintergarten.jpg"
          beforeLabel="1. Werkstattfertigung"
          afterLabel="2. Fertige Montage beim Kunden"
        />

        {/* Portfolio Gallery Section */}
        <section className="section-pad bg-white">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-label text-gray-400 block mb-2">Projektgalerie</span>
              <h2 className="text-display text-3xl md:text-5xl text-[#121212] mb-4">
                Ausgewählte Referenzen
              </h2>
              <p className="text-gray-500">
                Filtern Sie nach Gewerk oder entdecken Sie alle Arbeiten im Überblick.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { value: "alle", label: "Alle Projekte" },
                { value: "fenster", label: "Holz- & Alufenster" },
                { value: "tueren", label: "Eingangstüren" },
                { value: "wintergarten", label: "Wintergärten" },
                { value: "deko", label: "Deko & Werkstücke" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategory(tab.value as Category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === tab.value
                      ? "bg-[#121212] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#f9fafb] rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#121212] text-xs px-3 py-1.5 rounded-full font-bold">
                        {project.categoryLabel}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#121212] mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="text-xs font-semibold text-gray-400 border-t border-gray-200/60 pt-3">
                        {project.details}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(project.categoryLabel)}`}
                      className="text-xs font-bold text-[#121212] hover:text-gray-600 flex items-center gap-1.5 transition-colors"
                    >
                      Ähnliches Projekt anfragen
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="mt-16 text-center bg-[#121212] text-white p-10 rounded-3xl">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Haben Sie ein konkretes Vorhaben im Kopf?
              </h3>
              <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
                Wir setzen Ihre architektonischen Wünsche mit handwerklicher Präzision in die Tat um.
              </p>
              <Link href="/kontakt" className="btn bg-[#E5DECE] text-[#121212] border-[#E5DECE] hover:bg-white hover:border-white font-bold text-sm">
                Unverbindliches Angebot einholen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
