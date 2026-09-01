"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    title: "Massivholz-Eingangstür mit Lichtausschnitt",
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
    title: "Holz-Alu Fensterelemente für Architektenhaus",
    category: "fenster" as const,
    categoryLabel: "Holz-Alu Fenster",
    image: "/images/hero-bg.jpg",
    description: "Großflächige Festverglasungen und Hebe-Schiebe-Elemente mit anthrazitfarbener Aluminiumschale außen.",
    details: "Passivhausstandard · RAL 7016 Anthrazit · Eiche natur",
  },
  {
    id: "5",
    title: "Handgefertigte Massivholz-Hirnholzbretter",
    category: "deko" as const,
    categoryLabel: "Deko & Werkstücke",
    image: "/images/catalog-schneidebrett.jpg",
    description: "Artisan-Küchenaccessoires aus massiver Eiche mit natürlicher biologischer Ölung.",
    details: "Eiche massiv · Bio-Leinöl · Stirnholz",
  },
  {
    id: "6",
    title: "Schwebendes Wandregalsystem aus Massiveiche",
    category: "deko" as const,
    categoryLabel: "Deko & Werkstücke",
    image: "/images/catalog-regal.jpg",
    description: "Minimalistische Wandborde mit unsichtbarer Trägeraufhängung und natürlicher Baumkante.",
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
        <section className="bg-[#1C1815] text-[#FAF8F5] py-20 md:py-28 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-craft-label text-[#D4B28C] block mb-3">
              Referenzen & Werkstatt-Einblicke
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Handwerkliche Meisterwerke in Bildern.
            </h1>
            <p className="text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Lassen Sie sich von unseren realisierten Projekten inspirieren. Von
              historischen Kastenfenstern über anspruchsvolle Wintergärten bis hin zu
              exklusiven Werkstücken.
            </p>
          </div>
        </section>

        {/* Interactive Before / After Section */}
        <BeforeAfterSlider
          beforeSrc="/images/hero-bg.jpg"
          afterSrc="/images/service-wintergarten.jpg"
          beforeLabel="Werkstattfertigung"
          afterLabel="Montage beim Kunden"
        />

        {/* Portfolio Gallery Section */}
        <section className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-craft-label block mb-2">Projektübersicht</span>
              <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
                Ausgewählte Referenzen
              </h2>
              <p className="text-[#5E564E] text-base">
                Filtern Sie nach Gewerk oder entdecken Sie alle Arbeiten im Überblick.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-14">
              {[
                { value: "alle", label: "Alle Referenzen" },
                { value: "fenster", label: "Holz- & Alufenster" },
                { value: "tueren", label: "Haustüren" },
                { value: "wintergarten", label: "Wintergärten" },
                { value: "deko", label: "Deko & Werkstücke" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategory(tab.value as Category)}
                  className={`px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeCategory === tab.value
                      ? "bg-[#1E1A17] text-white"
                      : "bg-white text-[#5E564E] border border-[#E6DED4] hover:bg-[#F3ECE2]"
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
                  className="craft-card rounded-lg overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-[#F3ECE2]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1E1A17] text-xs px-2.5 py-1 rounded font-medium border border-[#E6DED4]">
                        {project.categoryLabel}
                      </div>
                    </div>

                    <div className="p-7">
                      <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                        {project.title}
                      </h3>
                      <p className="text-[#5E564E] text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="text-xs font-semibold text-[#8C6D4F] border-t border-[#F3ECE2] pt-4">
                        {project.details}
                      </div>
                    </div>
                  </div>

                  <div className="p-7 pt-0 border-t border-[#F3ECE2] mt-4">
                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(project.categoryLabel)}`}
                      className="text-xs font-semibold text-[#1E1A17] hover:text-[#8C6D4F] flex items-center gap-1.5 pt-4 transition-colors"
                    >
                      Ähnliches Projekt anfragen <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="mt-16 text-center bg-[#1C1815] text-[#FAF8F5] p-10 md:p-14 rounded-lg">
              <span className="text-craft-label text-[#D4B28C] block mb-2">Ihr Bauvorhaben</span>
              <h3 className="font-serif-heading text-2xl md:text-3xl font-normal mb-3">
                Haben Sie ein konkretes Vorhaben im Kopf?
              </h3>
              <p className="text-[#A89F95] text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                Wir setzen Ihre individuellen Wünsche mit meisterhafter Präzision in die Tat um.
              </p>
              <Link href="/kontakt" className="btn btn-wood text-sm font-medium">
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
