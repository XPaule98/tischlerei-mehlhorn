"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Category = "alle" | "tueren" | "fenster" | "wintergarten" | "werkstatt";

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

export default function GalerieClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("alle");

  const filteredProjects =
    activeCategory === "alle"
      ? realProjects
      : realProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 md:py-16 bg-[#FAF8F5]">
      <div className="container-site">
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
          {[
            { value: "alle", label: "Alle Referenzen" },
            { value: "tueren", label: "Haustüren" },
            { value: "fenster", label: "Fenster" },
            { value: "wintergarten", label: "Wintergärten" },
            { value: "werkstatt", label: "Werkstatt" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value as Category)}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === tab.value
                  ? "bg-[#181818] text-white shadow-xs"
                  : "bg-white text-[#555555] border border-[#E8E8E6] hover:bg-[#F2F2F0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="craft-card overflow-hidden flex flex-col justify-between bg-white shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F2F2F0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#181818]/90 text-white text-[11px] px-2.5 py-1 rounded font-medium">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#181818] mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="text-xs font-semibold text-[#8C6D4F] border-t border-[#F2F2F0] pt-3">
                    {project.details}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#F2F2F0] mt-2">
                <Link
                  href={`/kontakt?gewerk=${encodeURIComponent(project.categoryLabel)}`}
                  className="text-xs font-semibold text-[#181818] hover:text-[#8C6D4F] flex items-center gap-1 pt-3 transition-colors"
                >
                  Ähnliches Projekt anfragen <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-14 text-center bg-[#181818] text-white p-8 sm:p-12 rounded-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60 block mb-1">
            Ihr Bauvorhaben
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
            Wünschen Sie eine Maßanfertigung nach Ihren Vorstellungen?
          </h3>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Wir beraten Sie persönlich in Schönheide und der gesamten Region Erzgebirge.
          </p>
          <Link href="/kontakt" className="btn bg-white text-[#181818] hover:bg-white/90 text-xs py-2.5 px-5">
            Unverbindliches Angebot einholen
          </Link>
        </div>
      </div>
    </section>
  );
}
