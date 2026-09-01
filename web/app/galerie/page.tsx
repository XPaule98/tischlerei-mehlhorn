"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

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

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("alle");

  const filteredProjects =
    activeCategory === "alle"
      ? realProjects
      : realProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Compact, Crisp Header */}
        <section className="bg-gradient-to-b from-[#1E1A17] to-[#25201C] text-[#FAF8F5] pt-12 pb-8 border-b border-[#3A332D]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-craft-label text-[#D4B28C] block mb-1.5">
                  Originalaufnahmen aus Schönheide
                </span>
                <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                  Galerie & Referenzen
                </h1>
                <p className="text-[#D6CCC0] text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
                  Einblicke in maßgefertigte Holzfenster, Holz-Alu-Systeme, Haustüren und Wintergärten aus unserer Werkstatt.
                </p>
              </div>

              {/* Filter Pills right in the header bar */}
              <div className="flex flex-wrap gap-2">
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
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      activeCategory === tab.value
                        ? "bg-[#B48A58] text-white shadow-sm"
                        : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Before / After Section */}
        <BeforeAfterSlider
          beforeSrc="/images/real/werkstatt-2.jpg"
          afterSrc="/images/real/wintergarten-1.jpg"
          beforeLabel="Werkstattfertigung Schönheide"
          afterLabel="Montage beim Kunden"
        />

        {/* Gallery Grid – Starts immediately */}
        <section className="py-12 md:py-16 bg-[#FAF8F5]">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="craft-card rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F3ECE2]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E1A17]/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded font-medium shadow-sm">
                        {project.categoryLabel}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <h2 className="font-serif-heading text-xl sm:text-2xl text-[#1E1A17] font-medium mb-2.5 leading-snug">
                        {project.title}
                      </h2>
                      <p className="text-[#5E564E] text-xs sm:text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="text-xs font-semibold text-[#8C6D4F] border-t border-[#F3ECE2] pt-3.5">
                        {project.details}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 border-t border-[#F3ECE2] mt-2">
                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(project.categoryLabel)}`}
                      className="text-xs font-semibold text-[#1E1A17] hover:text-[#8C6D4F] flex items-center gap-1.5 pt-3 transition-colors"
                    >
                      Ähnliches Projekt anfragen <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="mt-14 text-center bg-[#1C1815] text-[#FAF8F5] p-8 sm:p-12 rounded-lg">
              <span className="text-craft-label text-[#D4B28C] block mb-2">Ihr Bauvorhaben</span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal mb-2.5">
                Wünschen Sie eine Maßanfertigung nach Ihren Vorstellungen?
              </h3>
              <p className="text-[#A89F95] text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                Wir beraten Sie persönlich in Schönheide und der gesamten Region Erzgebirge.
              </p>
              <Link href="/kontakt" className="btn btn-wood text-xs sm:text-sm font-medium py-3 px-6">
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
