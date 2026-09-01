"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Check, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface GalleryProject {
  _id?: string;
  title: string;
  category: "produktion" | "montage" | "projekte" | "erfolge";
  location?: string;
  year?: string;
  imageUrl: string;
  galleryUrls?: string[];
  description?: string;
  scope?: string[];
  featured?: boolean;
}

const fallbackProjects: GalleryProject[] = [
  // 1. Eigene Produktion
  {
    title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
    category: "produktion",
    location: "Werkstatt Schönheide",
    year: "2024",
    imageUrl: "/images/real/fenster-holzalu-buendig.jpg",
    galleryUrls: ["/images/real/fenster-holzalu-buendig.jpg", "/images/real/fenster-holz-1.jpg"],
    description:
      "Flächenbündige Holz-Alu-Fertigung in unserer eigenen Werkstatt. Innen behagliches Naturholz, außen unverwüstliches Aluminium.",
    scope: ["System GUTMANN MIRA", "Eigene Holzverleimung", "3-fach Wärmeschutz"],
  },
  {
    title: "Massivholz-Haustür mit Segmentbogen & Kassetten",
    category: "produktion",
    location: "Werkstatt Schönheide",
    year: "2024",
    imageUrl: "/images/real/tuer-5.jpg",
    galleryUrls: ["/images/real/tuer-5.jpg", "/images/real/tuer-6.jpg"],
    description:
      "Traditionell gefräste Kassettenhaustür mit Segmentbogen und integrierter Mehrfachverriegelung nach Kundenmaß.",
    scope: ["Eiche Massivholz", "Sicherheitsbeschlag RC2", "Individuelle Schnitzprofile"],
  },
  {
    title: "Traditionelle Holzfenster mit Ziersprossen",
    category: "produktion",
    location: "Werkstatt Schönheide",
    year: "2023",
    imageUrl: "/images/real/fenster-holz-1.jpg",
    description:
      "Denkmalgerechte Holzfenster mit Zierkämpfern und aufgesetzten Wiener Sprossen für eine denkmalgeschützte Villa.",
    scope: ["Denkmalschutz-Konform", "Mehrschicht-Tauchgrundierung", "Isolierglas"],
  },

  // 2. Montage & Baustellen
  {
    title: "Schlüsselfertiger Wintergarten-Anbau",
    category: "montage",
    location: "Erzgebirge",
    year: "2024",
    imageUrl: "/images/real/wintergarten-1.jpg",
    galleryUrls: ["/images/real/wintergarten-1.jpg", "/images/real/wintergarten-2.jpg"],
    description:
      "Komplette Vor-Ort-Montage eines beheizbaren Holz-Wintergartens mit Hebeschiebe-Türanlage und Sonnenschutz-Glasdach.",
    scope: ["Statik & Holztragwerk", "RAL-Bauanschluss", "Großflächen-Hebeschiebetür"],
  },
  {
    title: "Montage Eingangstüranlage mit Seitenteil",
    category: "montage",
    location: "Schönheide",
    year: "2023",
    imageUrl: "/images/real/tuer-7.jpg",
    description:
      "Passgenauer Einbau einer mehrteiligen Haustürkombination mit festverglastem Oberlicht und Seitenteil für maximalen Lichteinfall.",
    scope: ["Staubarme Montage", "Thermisch getrennte Schwelle", "Sicherheitsglas"],
  },
  {
    title: "Wintergarten mit integrierten Schiebetüren",
    category: "montage",
    location: "Vogtland",
    year: "2023",
    imageUrl: "/images/real/wintergarten-2.jpg",
    description:
      "Lichtdurchflutete Glaskonstruktion mit schwellenlosem Übergang in den Garten.",
    scope: ["Sonnenschutzglas", "Holzkonstruktion lasiert", "Fachgerechte Abdichtung"],
  },

  // 3. Großprojekte & Referenzen
  {
    title: "Komplettausstattung Architektenhaus mit Holz-Alu-Elementen",
    category: "projekte",
    location: "Region Erzgebirge",
    year: "2024",
    imageUrl: "/images/real/gebaeude-1.jpg",
    galleryUrls: ["/images/real/gebaeude-1.jpg", "/images/real/fenster-holzalu-buendig.jpg"],
    description:
      "Großprojekt: Fertigung und RAL-Montage von 24 Holz-Aluminium-Fenstern und einer exklusiven Portal-Eingangstür.",
    scope: ["24 Holz-Alu-Elemente", "1 Hauseingangsportal", "RAL-Güteüberwacht"],
    featured: true,
  },
  {
    title: "Landhaus-Eingangstür mit geschnitztem Ornament",
    category: "projekte",
    location: "Schönheide",
    year: "2023",
    imageUrl: "/images/real/tuer-8.jpg",
    description:
      "Aufwendig handgefertigtes Eingangsunikat nach historischem Vorbild im erzgebirgischen Landhausstil.",
    scope: ["Eichen-Massivbau", "Handwerkliche Schnitzarbeit", "Historisches Ziergitter"],
  },

  // 4. Erfolge & Meilensteine
  {
    title: "Meisterbetrieb seit 1977 – Über 45 Jahre Qualität",
    category: "erfolge",
    location: "Schönheide",
    year: "1977 - Heute",
    imageUrl: "/images/real/werkstatt-2.jpg",
    description:
      "Gegründet durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße, heute erfolgreich in 2. Generation geführt durch Tischlermeister Ronny Mehlhorn.",
    scope: ["Meisterbetrieb", "Eigene Fertigung", "Hunderte zufriedene Bauherren"],
  },
  {
    title: "Moderne Werkstatt & eigener Maschinenpark",
    category: "erfolge",
    location: "Neuheider Str. 64 b",
    year: "Modernisiert",
    imageUrl: "/images/real/werkstatt-1.jpg",
    description:
      "Kontinuierliche Investition in moderne Holzbearbeitungsmaschinen für höchste Maßgenauigkeit und Oberflächenqualität.",
    scope: ["Computergestützte Fertigung", "Qualitätslackierung", "Meisterprüfung"],
  },
];

const categoryTabs = [
  { value: "alle", label: "Alle Einblicke" },
  { value: "produktion", label: "Eigene Produktion" },
  { value: "montage", label: "Montage & Baustellen" },
  { value: "projekte", label: "Großprojekte & Referenzen" },
  { value: "erfolge", label: "Erfolge & Werkstatt" },
];

const ITEMS_PER_PAGE = 6;

export default function GalerieClient({ initialProjects }: { initialProjects?: GalleryProject[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("alle");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const projects =
    initialProjects && initialProjects.length > 0 ? initialProjects : fallbackProjects;

  const filtered =
    activeCategory === "alle"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(category);
    setCurrentPage(1);
    if (e) {
      e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "produktion":
        return "Eigene Produktion";
      case "montage":
        return "Montage & Baustelle";
      case "projekte":
        return "Großprojekt / Referenz";
      case "erfolge":
        return "Erfolg & Werkstatt";
      default:
        return "Referenz";
    }
  };

  return (
    <>
      {/* Category Filter Toolbar – 100% Emoji-Free, Clean & Auto-Centering on Mobile */}
      <section className="bg-[#F9F9F8] py-3.5 border-b border-[#E8E8E6] sticky top-[72px] z-30 backdrop-blur-md bg-[#F9F9F8]/95">
        <div className="container-site flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-none gap-2 px-4 sm:px-0">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={(e) => handleCategoryChange(tab.value, e)}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                activeCategory === tab.value
                  ? "bg-[#181818] text-white shadow-xs"
                  : "bg-white text-[#555555] border border-[#E8E8E6] hover:bg-[#F2F2F0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Showcase Grid */}
      <section className="py-12 md:py-16 bg-[#FFFFFF]">
        <div className="container-site">
          {/* Item count header */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E8E8E6]">
            <span className="text-xs text-[#777777] font-medium">
              Zeige <strong>{Math.min(startIndex + 1, filtered.length)}</strong> bis <strong>{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}</strong> von <strong>{filtered.length}</strong> Einträgen
            </span>
            {totalPages > 1 && (
              <span className="text-xs font-semibold text-[#181818]">
                Seite {currentPage} von {totalPages}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProjects.map((project, idx) => (
              <div
                key={project._id || idx}
                className={`craft-card overflow-hidden flex flex-col justify-between bg-white group ${
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Image with zoom click */}
                  <div
                    onClick={() => setLightboxImage({ src: project.imageUrl, title: project.title })}
                    className="relative h-64 sm:h-72 overflow-hidden bg-[#F9F9F8] cursor-pointer group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-[#181818]/90 text-white text-[10px] sm:text-[11px] px-2.5 py-1 rounded font-medium backdrop-blur-xs">
                        {getCategoryLabel(project.category)}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded bg-[#181818]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={14} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-[#777777] mb-2 font-medium">
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[#8C6D4F]" />
                          {project.location}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-[#8C6D4F]" />
                          {project.year}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#181818] mb-2.5 leading-snug">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    )}

                    {/* Scope bullets */}
                    {project.scope && project.scope.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-[#F2F2F0] mb-2">
                        {project.scope.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#444444]">
                            <Check size={13} className="text-[#8C6D4F] flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-0 border-t border-[#F2F2F0] mt-2">
                  <Link
                    href={`/kontakt?gewerk=${encodeURIComponent(project.title)}`}
                    className="text-xs font-semibold text-[#181818] hover:text-[#8C6D4F] flex items-center gap-1.5 pt-3.5 transition-colors"
                  >
                    Ähnliches Projekt anfragen <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[#E8E8E6]">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 border border-[#E8E8E6] transition-colors ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed bg-[#F9F9F8] text-[#999999]"
                    : "bg-white text-[#181818] hover:bg-[#181818] hover:text-white cursor-pointer"
                }`}
              >
                <ChevronLeft size={14} /> Vorherige
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded text-xs font-semibold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#181818] text-white shadow-xs"
                        : "bg-white text-[#555555] border border-[#E8E8E6] hover:bg-[#F2F2F0]"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 border border-[#E8E8E6] transition-colors ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed bg-[#F9F9F8] text-[#999999]"
                    : "bg-white text-[#181818] hover:bg-[#181818] hover:text-white cursor-pointer"
                }`}
              >
                Nächste <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Empty state fallback */}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6]">
              <p className="text-[#555555] text-sm">
                In dieser Kategorie sind aktuell keine Einträge hinterlegt.
              </p>
              <button
                onClick={() => handleCategoryChange("alle")}
                className="btn btn-outline-dark text-xs mt-3 cursor-pointer"
              >
                Alle Einträge anzeigen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer"
            >
              <X size={18} /> Schließen
            </button>

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[80vh] w-auto object-contain rounded shadow-2xl border border-white/10"
            />
            <p className="text-white text-sm font-semibold mt-3 text-center">
              {lightboxImage.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
