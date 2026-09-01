"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Category = "alle" | "fenster" | "tueren" | "wintergarten" | "werkstatt";

const realProjects = [
  {
    id: "tuer-5",
    title: "Massivholz-Haustür mit Segmentbogen & Kassetten",
    category: "tueren" as const,
    categoryLabel: "Haustüren",
    image: "/images/real/tuer-5.jpg",
    description: "Handgefertigte Hauseingangstür mit handwerklich gefrästen Füllungen, Doppelverglasung und historischem Segmentbogen.",
    details: "Eigene Fertigung Schönheide · Massivholz · Mehrfachverriegelung",
  },
  {
    id: "fenster-holzalu",
    title: "Holz-Aluminium-Fenster (Gutmann Mira)",
    category: "fenster" as const,
    categoryLabel: "Holz-Alu Fenster",
    image: "/images/real/fenster-holzalu-buendig.jpg",
    description: "Flächenbündige Holz-Alu-Fensterkonstruktion mit witterungsbeständiger Aluminiumschale und edler Holzinnenansicht.",
    details: "System Gutmann Mira · Flächenbündig · Hohe Wärmedämmung",
  },
  {
    id: "tuer-6",
    title: "Klassische Massivholztür mit Rautenverglasung",
    category: "tueren" as const,
    categoryLabel: "Haustüren",
    image: "/images/real/tuer-6.jpg",
    description: "Traditionelle Hauseingangstür mit aufgesetzten Leisten, Isolierglas-Lichtausschnitt und Sicherheitsdrückergarnitur.",
    details: "Eiche massiv · Isolierglas · Sicherheitsbeschlag",
  },
  {
    id: "wintergarten-1",
    title: "Tragender Holz-Wintergarten mit Glasdach",
    category: "wintergarten" as const,
    categoryLabel: "Wintergärten",
    image: "/images/real/wintergarten-1.jpg",
    description: "Individuell geplanter Wintergartenanbau mit tragender Leimholzkonstruktion und großzügigen Glasfeldern.",
    details: "Eigene Statik & Fertigung · Sonnenschutzglas · Beheizbar",
  },
  {
    id: "tuer-7",
    title: "Eingangstüranlage mit Seitenteil & Sprossenfenster",
    category: "tueren" as const,
    categoryLabel: "Haustüren",
    image: "/images/real/tuer-7.jpg",
    description: "Mehrteilige Haustürkombination mit festverglastem Oberlicht und Seitenteil für maximalen Lichteinfall im Flurbereich.",
    details: "Massivholz · Isolierglas mit echten Sprossen",
  },
  {
    id: "fenster-holz-1",
    title: "Holzfenster aus eigener Produktion",
    category: "fenster" as const,
    categoryLabel: "Holzfenster",
    image: "/images/real/fenster-holz-1.jpg",
    description: "Traditionell gefertigte Holzfenster mit Mehrschicht-Verleimung und umweltfreundlicher Tauchgrundierung.",
    details: "Eigene Fertigung Schönheide · 3-fach Isolierglas",
  },
  {
    id: "tuer-8",
    title: "Landhaus-Eingangstür mit Schnitzornamenten",
    category: "tueren" as const,
    categoryLabel: "Haustüren",
    image: "/images/real/tuer-8.jpg",
    description: "Individuell gefertigte Haustür mit detailreichen Profilfräsungen im regionalen Erzgebirgs-Stil.",
    details: "Eigene Werkstattfertigung · Unikat",
  },
  {
    id: "wintergarten-2",
    title: "Wintergarten mit integrierten Schiebetüren",
    category: "wintergarten" as const,
    categoryLabel: "Wintergärten",
    image: "/images/real/wintergarten-2.jpg",
    description: "Maßgefertigte Holzkonstruktion mit integrierten Hebeschiebe-Elementen für nahtlosen Übergang in den Garten.",
    details: "Holzbau Schönheide · Schlüsselfertige Montage",
  },
  {
    id: "werkstatt-gebaeude",
    title: "Firmengebäude & Werkstatt in Schönheide",
    category: "werkstatt" as const,
    categoryLabel: "Werkstatt & Betrieb",
    image: "/images/real/gebaeude-1.jpg",
    description: "Unser 1992 bezogenes Firmengebäude in der Neuheider Straße 64 b – ausgestattet mit modernem Maschinenpark.",
    details: "Gegründet 1977 · Meisterbetrieb Ronny Mehlhorn",
  },
  {
    id: "tuer-10",
    title: "Exklusive Haustür mit Edelstahl- und Glaselementen",
    category: "tueren" as const,
    categoryLabel: "Haustüren",
    image: "/images/real/tuer-10.jpg",
    description: "Moderne Hauseingangstür mit sandgestrahltem Designglas, Stangengriff und thermisch getrennter Schwelle.",
    details: "Moderne Optik · RC3 Sicherheit · Einbruchhemmend",
  },
];

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("alle");

  const filteredProjects =
    activeCategory === "alle"
      ? realProjects
      : realProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-[#1C1815] text-[#FAF8F5] py-20 md:py-28 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-craft-label text-[#D4B28C] block mb-3">
              Referenzen aus unserer Meisterwerkstatt
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Echte Arbeiten der Tischlerei Mehlhorn.
            </h1>
            <p className="text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Entdecken Sie echte Fotos von maßgefertigten Fenstern, Haustüren und Wintergärten, 
              die in unserer Werkstatt in Schönheide entstanden sind.
            </p>
          </div>
        </section>

        {/* Interactive Before / After Section */}
        <BeforeAfterSlider
          beforeSrc="/images/real/werkstatt-2.jpg"
          afterSrc="/images/real/wintergarten-1.jpg"
          beforeLabel="Werkstattfertigung Schönheide"
          afterLabel="Montage beim Kunden"
        />

        {/* Portfolio Gallery Section */}
        <section className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-craft-label block mb-2">Originalfotos unserer Arbeiten</span>
              <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
                Bildergalerie realisierter Projekte
              </h2>
              <p className="text-[#5E564E] text-base">
                Filtern Sie nach Gewerk oder entdecken Sie alle gefertigten Werkstücke im Überblick.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-14">
              {[
                { value: "alle", label: "Alle Referenzen" },
                { value: "tueren", label: "Haustüren" },
                { value: "fenster", label: "Holz- & Holz-Alu-Fenster" },
                { value: "wintergarten", label: "Wintergärten" },
                { value: "werkstatt", label: "Werkstatt & Gebäude" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategory(tab.value as Category)}
                  className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
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
                    <div className="relative h-72 overflow-hidden bg-[#F3ECE2]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E1A17]/85 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded font-medium">
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
                Wünschen Sie eine Maßanfertigung nach Ihren Vorstellungen?
              </h3>
              <p className="text-[#A89F95] text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                Wir beraten Sie persönlich in Schönheide und der gesamten Region Erzgebirge und fertigen Ihr Wunschbauteil passgenau an.
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
