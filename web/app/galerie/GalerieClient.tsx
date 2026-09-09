"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Images, MapPin, Calendar } from "lucide-react";

export interface GalleryProject {
  _id?: string;
  title: string;
  category: "produktion" | "montage" | "projekte" | "erfolge" | string;
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
    _id: "p-holzalu",
    title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
    category: "produktion",
    location: "Werkstatt Schönheide",
    year: "2024",
    imageUrl: "/images/real/fenster-holzalu-buendig.jpg",
    galleryUrls: [
      "/images/real/fenster-holzalu-buendig.jpg",
      "/images/real/fenster-holz-1.jpg",
      "/images/real/gebaeude-1.jpg",
    ],
    description:
      "Flächenbündige Holz-Alu-Fertigung in unserer eigenen Meisterwerkstatt. Innen behagliches Naturholz (Kiefer, Lärche oder Eiche), außen unverwüstliches, pulverbeschichtetes Aluminium für jahrzehntelangen Witterungsschutz.",
    scope: ["System GUTMANN MIRA", "Eigene Holzverleimung", "3-fach Wärmeschutz", "RAL-Güteüberwacht"],
  },
  {
    _id: "p-tuer-kassetten",
    title: "Massivholz-Haustür mit Segmentbogen & Kassetten",
    category: "produktion",
    location: "Werkstatt Schönheide",
    year: "2024",
    imageUrl: "/images/real/tuer-5.jpg",
    galleryUrls: ["/images/real/tuer-5.jpg", "/images/real/tuer-6.jpg", "/images/real/tuer-7.jpg"],
    description:
      "Traditionell gefräste Kassettenhaustür mit Segmentbogen und integrierter Mehrfachverriegelung nach individuellem Kundenmaß. Handwerkliche Perfektion aus massivem Holz mit langlebiger Oberflächenveredelung.",
    scope: ["Eiche Massivholz", "Sicherheitsbeschlag RC2", "Individuelle Schnitzprofile"],
  },
  {
    _id: "p-fenster-sprossen",
    title: "Traditionelle Holzfenster mit Ziersprossen",
    category: "produktion",
    location: "Werkstatt Schönheide",
    year: "2023",
    imageUrl: "/images/real/fenster-holz-1.jpg",
    galleryUrls: ["/images/real/fenster-holz-1.jpg", "/images/real/fenster-holzalu-buendig.jpg"],
    description:
      "Denkmalgerechte Holzfenster mit Zierkämpfern und aufgesetzten Wiener Sprossen für eine denkmalgeschützte Villa. Vollständige Einhaltung aller Denkmalschutzauflagen bei modernstem Schall- und Wärmeschutz.",
    scope: ["Denkmalschutz-Konform", "Mehrschicht-Tauchgrundierung", "Isolierglas"],
  },

  // 2. Montage & Baustellen
  {
    _id: "p-wintergarten-anbau",
    title: "Schlüsselfertiger Wintergarten-Anbau",
    category: "montage",
    location: "Erzgebirge",
    year: "2024",
    imageUrl: "/images/real/wintergarten-1.jpg",
    galleryUrls: ["/images/real/wintergarten-1.jpg", "/images/real/wintergarten-2.jpg"],
    description:
      "Komplette Vor-Ort-Montage eines beheizbaren Holz-Wintergartens mit Hebeschiebe-Türanlage und Sonnenschutz-Glasdach. Präzise eingepasst in das bestehende Wohnhaus für ganzjährigen Wohlfühl-Wohnraum.",
    scope: ["Statik & Holztragwerk", "RAL-Bauanschluss", "Großflächen-Hebeschiebetür"],
  },
  {
    _id: "p-tuer-eingang",
    title: "Montage Eingangstüranlage mit Seitenteil",
    category: "montage",
    location: "Schönheide",
    year: "2023",
    imageUrl: "/images/real/tuer-7.jpg",
    galleryUrls: ["/images/real/tuer-7.jpg", "/images/real/tuer-8.jpg"],
    description:
      "Passgenauer Einbau einer mehrteiligen Haustürkombination mit festverglastem Oberlicht und Seitenteil für maximalen Lichteinfall in das Entree. Höchste Einbruchhemmung und beste Dämmwerte.",
    scope: ["Staubarme Montage", "Thermisch getrennte Schwelle", "Sicherheitsglas"],
  },
  {
    _id: "p-wintergarten-schiebetuer",
    title: "Wintergarten mit integrierten Schiebetüren",
    category: "montage",
    location: "Vogtland",
    year: "2023",
    imageUrl: "/images/real/wintergarten-2.jpg",
    galleryUrls: ["/images/real/wintergarten-2.jpg", "/images/real/wintergarten-1.jpg"],
    description:
      "Lichtdurchflutete Glaskonstruktion mit schwellenlosem Übergang in den Garten. Maximale Transparenz kombiniert mit wirksamem Hitzeschutz im Sommer.",
    scope: ["Sonnenschutzglas", "Holzkonstruktion lasiert", "Fachgerechte Abdichtung"],
  },

  // 3. Großprojekte & Referenzen
  {
    _id: "p-architektenhaus",
    title: "Komplettausstattung Architektenhaus mit Holz-Alu-Elementen",
    category: "projekte",
    location: "Region Erzgebirge",
    year: "2024",
    imageUrl: "/images/real/gebaeude-1.jpg",
    galleryUrls: [
      "/images/real/gebaeude-1.jpg",
      "/images/real/fenster-holzalu-buendig.jpg",
      "/images/real/wintergarten-1.jpg",
    ],
    description:
      "Großprojekt: Maßgefertigte Fertigung und RAL-Montage von 24 Holz-Aluminium-Fenstern, Hebeschiebetüren und einer exklusiven Portal-Eingangstür für einen modernen Neubau.",
    scope: ["24 Holz-Alu-Elemente", "1 Hauseingangsportal", "RAL-Güteüberwacht"],
    featured: true,
  },
  {
    _id: "p-tuer-landhaus",
    title: "Landhaus-Eingangstür mit geschnitztem Ornament",
    category: "projekte",
    location: "Schönheide",
    year: "2023",
    imageUrl: "/images/real/tuer-8.jpg",
    galleryUrls: ["/images/real/tuer-8.jpg", "/images/real/tuer-5.jpg"],
    description:
      "Aufwendig handgefertigtes Eingangsunikat nach historischem Vorbild im erzgebirgischen Landhausstil mit handgeschnitzten Elementen und maßgegossenem Ziergitter.",
    scope: ["Eichen-Massivbau", "Handwerkliche Schnitzarbeit", "Historisches Ziergitter"],
  },

  // 4. Erfolge & Meilensteine
  {
    _id: "p-meisterbetrieb",
    title: "Meisterbetrieb seit 1977 – Über 45 Jahre Qualität",
    category: "erfolge",
    location: "Schönheide",
    year: "1977 - Heute",
    imageUrl: "/images/real/werkstatt-2.jpg",
    galleryUrls: ["/images/real/werkstatt-2.jpg", "/images/real/werkstatt-1.jpg"],
    description:
      "Gegründet durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße, heute erfolgreich in 2. Generation geführt durch Tischlermeister Ronny Mehlhorn. Qualität, Tradition und stetige Innovation.",
    scope: ["Meisterbetrieb", "Eigene Fertigung", "Hunderte zufriedene Bauherren"],
  },
  {
    _id: "p-werkstatt",
    title: "Moderne Werkstatt & eigener Maschinenpark",
    category: "erfolge",
    location: "Neuheider Str. 64 b",
    year: "Modernisiert",
    imageUrl: "/images/real/werkstatt-1.jpg",
    galleryUrls: ["/images/real/werkstatt-1.jpg", "/images/real/werkstatt-2.jpg"],
    description:
      "Kontinuierliche Investition in präzise Holzbearbeitungsmaschinen für höchste Maßgenauigkeit, saubere Gehrungen und erstklassige Oberflächenqualität bei Fenstern und Türen.",
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

  // Selected project for detailed modal/page view
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  // Fullscreen zoom lightbox
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Touch swipe support on mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const projects =
    initialProjects && initialProjects.length > 0 ? initialProjects : fallbackProjects;

  const filtered =
    activeCategory === "alle"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Photos of the currently selected project
  const projectPhotos = selectedProject
    ? Array.from(new Set([selectedProject.imageUrl, ...(selectedProject.galleryUrls || [])].filter(Boolean)))
    : [];

  const activePhotoUrl = projectPhotos[currentPhotoIndex] || selectedProject?.imageUrl || "";

  // Lock body scroll when modal or lightbox is open
  useEffect(() => {
    if (selectedProject || lightboxUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, lightboxUrl]);

  // Keyboard navigation for modal & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxUrl) {
        if (e.key === "Escape") setLightboxUrl(null);
        return;
      }

      if (selectedProject) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowLeft") {
          handlePrevPhoto();
        } else if (e.key === "ArrowRight") {
          handleNextPhoto();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, lightboxUrl, projectPhotos.length, currentPhotoIndex]);

  const openProject = (project: GalleryProject) => {
    setSelectedProject(project);
    setCurrentPhotoIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentPhotoIndex(0);
    setLightboxUrl(null);
  };

  const handleNextPhoto = () => {
    if (projectPhotos.length <= 1) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % projectPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (projectPhotos.length <= 1) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + projectPhotos.length) % projectPhotos.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndXRef.current = null;
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNextPhoto();
    } else if (distance < -minSwipeDistance) {
      handlePrevPhoto();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Previous & Next project navigation
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filtered.findIndex(
      (p) => (p._id && p._id === selectedProject._id) || p.title === selectedProject.title
    );
    const nextIndex = (currentIndex + 1) % filtered.length;
    setSelectedProject(filtered[nextIndex]);
    setCurrentPhotoIndex(0);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filtered.findIndex(
      (p) => (p._id && p._id === selectedProject._id) || p.title === selectedProject.title
    );
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setSelectedProject(filtered[prevIndex]);
    setCurrentPhotoIndex(0);
  };

  const handleCategoryChange = (category: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(category);
    setCurrentPage(1);
    if (e) {
      e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setTimeout(() => {
      const el = document.getElementById("galerie-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
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
      {/* Category Filter Toolbar – Clean & Auto-Centering on Mobile */}
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
      <section id="galerie-grid" className="py-12 md:py-16 bg-[#FFFFFF] scroll-mt-32 sm:scroll-mt-36">
        <div className="container-site">
          {/* Item count header */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E8E8E6]">
            <span className="text-xs text-[#777777] font-medium">
              Zeige <strong>{Math.min(startIndex + 1, filtered.length)}</strong> bis{" "}
              <strong>{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}</strong> von{" "}
              <strong>{filtered.length}</strong> Einträgen
            </span>
            {totalPages > 1 && (
              <span className="text-xs font-semibold text-[#181818]">
                Seite {currentPage} von {totalPages}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProjects.map((project, idx) => {
              const allCardPhotos = Array.from(
                new Set([project.imageUrl, ...(project.galleryUrls || [])].filter(Boolean))
              );

              return (
                <div
                  key={project._id || idx}
                  onClick={() => openProject(project)}
                  className={`craft-card overflow-hidden flex flex-col justify-between bg-white group cursor-pointer hover:border-[#8C6D4F]/50 hover:shadow-lg transition-all duration-300 ${
                    project.featured ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div>
                    {/* Image container */}
                    <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F9F9F8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        <span className="bg-[#181818]/90 text-white text-[10px] sm:text-[11px] px-2.5 py-1 rounded font-medium backdrop-blur-xs">
                          {getCategoryLabel(project.category)}
                        </span>
                      </div>

                      {/* Photo counter badge if multiple photos exist */}
                      {allCardPhotos.length > 1 && (
                        <div className="absolute top-3 right-3 z-10 bg-black/75 text-white text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs shadow-xs">
                          <Images size={12} />
                          <span>{allCardPhotos.length}</span>
                        </div>
                      )}

                      {/* Hover action hint */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 text-[#181818] text-xs font-semibold px-3.5 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                          <Maximize2 size={13} />
                          Details &amp; Fotos ansehen
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-[#181818] mb-2 leading-snug group-hover:text-[#8C6D4F] transition-colors">
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {(project.location || project.year) && (
                        <div className="flex items-center gap-3 text-[11px] text-[#888888] mt-3 font-medium">
                          {project.location && <span>{project.location}</span>}
                          {project.location && project.year && <span>·</span>}
                          {project.year && <span>{project.year}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* Interactive Project Detail Modal / View */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh] border border-[#E8E8E6]">
            {/* Top header bar: Category, Photo Counter & Close button */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E8E8E6] bg-[#FAF9F8]">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D4F] bg-[#8C6D4F]/10 px-2.5 py-1 rounded">
                  {getCategoryLabel(selectedProject.category)}
                </span>
                {projectPhotos.length > 1 && (
                  <span className="text-xs text-[#777777] font-medium">
                    Foto {currentPhotoIndex + 1} von {projectPhotos.length}
                  </span>
                )}
              </div>

              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#555555] hover:text-[#181818] hover:bg-[#E8E8E6] transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image Slider Viewport with Touch-Swipe Support */}
            <div
              className="relative w-full bg-[#121212] aspect-[16/10] sm:aspect-[16/9] max-h-[48vh] flex items-center justify-center select-none overflow-hidden group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Ambient blurred backdrop so any aspect ratio looks intentional and high-end */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhotoUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none"
              />

              {/* Crisp uncropped main photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhotoUrl}
                alt={selectedProject.title}
                onClick={() => setLightboxUrl(activePhotoUrl)}
                className="relative z-10 max-h-full max-w-full object-contain p-2 sm:p-4 cursor-zoom-in transition-transform duration-300 hover:scale-102 drop-shadow-md"
              />

              {/* Previous & Next photo arrows on desktop & tablet */}
              {projectPhotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevPhoto();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-md"
                    aria-label="Vorheriges Foto"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPhoto();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-md"
                    aria-label="Nächstes Foto"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Fullscreen zoom button */}
              <button
                onClick={() => setLightboxUrl(activePhotoUrl)}
                className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black/90 text-white text-xs font-medium backdrop-blur-xs transition-all shadow-md cursor-pointer"
              >
                <Maximize2 size={13} />
                <span>Großansicht</span>
              </button>
            </div>

            {/* Thumbnail Navigation Strip (if multiple photos exist) */}
            {projectPhotos.length > 1 && (
              <div className="flex items-center gap-2 p-2.5 sm:px-6 bg-[#181818] overflow-x-auto scrollbar-none border-b border-white/10">
                {projectPhotos.map((pUrl, pIdx) => {
                  const isSelected = pIdx === currentPhotoIndex;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setCurrentPhotoIndex(pIdx)}
                      className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 bg-black/50 ${
                        isSelected
                          ? "border-white scale-102 ring-1 ring-white/50"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={pUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Project Details & Description */}
            <div className="p-5 sm:p-7 overflow-y-auto max-h-[38vh] space-y-4 bg-white">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#181818] leading-snug">
                  {selectedProject.title}
                </h2>

                {(selectedProject.location || selectedProject.year) && (
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#777777] mt-1.5 font-medium">
                    {selectedProject.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-[#8C6D4F]" />
                        {selectedProject.location}
                      </span>
                    )}
                    {selectedProject.year && (
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-[#8C6D4F]" />
                        {selectedProject.year}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Full Description */}
              {selectedProject.description ? (
                <p className="text-[#444444] text-sm sm:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              ) : (
                <p className="text-[#777777] text-sm italic">
                  Einblick in unsere Fertigung und handwerkliche Ausführung.
                </p>
              )}

              {/* Scope / Besonderheiten if present */}
              {selectedProject.scope && selectedProject.scope.length > 0 && (
                <div className="pt-3 border-t border-[#F2F2F0]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-2">
                    Besonderheiten &amp; Ausführung
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.scope.map((item, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-[#F9F9F8] text-[#555555] px-3 py-1 rounded-md border border-[#E8E8E6]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer bar: Previous / Next Project navigation */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-[#E8E8E6] bg-[#FAF9F8]">
              <button
                onClick={handlePrevProject}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#555555] hover:text-[#181818] transition-colors cursor-pointer"
              >
                <ChevronLeft size={15} />
                <span className="hidden sm:inline">Vorheriges Projekt</span>
                <span className="sm:hidden">Zurück</span>
              </button>

              <button
                onClick={closeModal}
                className="text-xs font-semibold text-[#8C6D4F] hover:text-[#181818] transition-colors cursor-pointer"
              >
                Zur Galerie
              </button>

              <button
                onClick={handleNextProject}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#555555] hover:text-[#181818] transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Nächstes Projekt</span>
                <span className="sm:hidden">Weiter</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxUrl(null)}
        >
          <div className="relative max-w-5xl max-h-[94vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer bg-black/40 px-3 py-1 rounded-md"
            >
              <X size={16} /> Schließen
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxUrl}
              alt=""
              className="max-h-[85vh] w-auto object-contain rounded shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </>
  );
}
