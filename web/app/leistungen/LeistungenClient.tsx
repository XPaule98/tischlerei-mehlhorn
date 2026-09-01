"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ChevronDown, Plus, Minus } from "lucide-react";

export interface ServiceItemData {
  _id: string;
  title: string;
  subtitle?: string;
  category: "eigenfertigung" | "bauelemente" | string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  order?: number;
}

interface Props {
  services: ServiceItemData[];
}

export default function LeistungenClient({ services }: Props) {
  // Split into categories
  const eigenfertigung = services.filter(
    (s) => s.category === "eigenfertigung" || !s.category
  );
  const bauelemente = services.filter((s) => s.category === "bauelemente");

  // Track open state for each item (first item open by default)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [eigenfertigung[0]?._id || ""]: true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = (items: ServiceItemData[], open: boolean) => {
    const next: Record<string, boolean> = { ...openItems };
    items.forEach((item) => {
      next[item._id] = open;
    });
    setOpenItems(next);
  };

  return (
    <div className="space-y-16 md:space-y-20 py-12 md:py-16">
      {/* 1. Eigene Herstellung */}
      {eigenfertigung.length > 0 && (
        <section className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8E8E6]">
            <div>
              <span className="text-craft-label block mb-1">Tradition & Präzision</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                Eigene Herstellung in Schönheide
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAll(eigenfertigung, true)}
                className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
              >
                Alle aufklappen
              </button>
              <button
                onClick={() => toggleAll(eigenfertigung, false)}
                className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
              >
                Alle einklappen
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {eigenfertigung.map((item, idx) => {
              const isOpen = Boolean(openItems[item._id]);

              return (
                <div
                  key={item._id || idx}
                  className={`craft-card overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-[#CFCFCB] shadow-sm bg-white" : "hover:border-[#CFCFCB] bg-[#FAFAFA]"
                  }`}
                >
                  {/* Collapsed / Expand Header Bar */}
                  <button
                    onClick={() => toggleItem(item._id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.015] transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                      {/* Thumbnail Preview */}
                      {item.imageUrl && (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden bg-[#F2F2F0] flex-shrink-0 border border-[#E8E8E6]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        {item.subtitle && (
                          <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-0.5 truncate">
                            {item.subtitle}
                          </span>
                        )}
                        <h3 className="text-lg sm:text-xl font-bold text-[#181818] truncate">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="hidden sm:inline-block text-xs font-semibold text-[#777777]">
                        {isOpen ? "Einklappen" : "Details ansehen"}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-full bg-white border border-[#E8E8E6] flex items-center justify-center text-[#181818] transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-[#181818] text-white border-[#181818]" : ""
                        }`}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Details Body */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-[#F2F2F0] bg-white animate-in fade-in-50 duration-200">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-2">
                        {/* Large Image */}
                        {item.imageUrl && (
                          <div className="lg:col-span-6">
                            <div className="relative rounded-lg overflow-hidden bg-[#F9F9F8] border border-[#E8E8E6] shadow-xs">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-[280px] sm:h-[340px] object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Text & Features */}
                        <div className={item.imageUrl ? "lg:col-span-6" : "lg:col-span-12"}>
                          {item.description && (
                            <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-6">
                              {item.description}
                            </p>
                          )}

                          {item.features && item.features.length > 0 && (
                            <div className="space-y-2.5 mb-6 p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6]">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#181818] mb-2">
                                Ausstattungsmerkmale:
                              </h4>
                              {item.features.map((feat, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#444444]">
                                  <Check size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <Link
                            href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                            className="btn btn-primary text-xs sm:text-sm inline-flex items-center gap-1.5"
                          >
                            Angebot für {item.title} anfordern
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. Bauelemente & Montageservice */}
      {bauelemente.length > 0 && (
        <section className="container-site pt-8 border-t border-[#E8E8E6]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8E8E6]">
            <div>
              <span className="text-craft-label block mb-1">Geprüfte Markenqualität</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                Bauelemente & Montageservice
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAll(bauelemente, true)}
                className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
              >
                Alle aufklappen
              </button>
              <button
                onClick={() => toggleAll(bauelemente, false)}
                className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
              >
                Alle einklappen
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {bauelemente.map((item, idx) => {
              const isOpen = Boolean(openItems[item._id]);

              return (
                <div
                  key={item._id || idx}
                  className={`craft-card overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isOpen ? "border-[#CFCFCB] shadow-sm bg-white" : "hover:border-[#CFCFCB] bg-[#FAFAFA]"
                  }`}
                >
                  {/* Header Bar */}
                  <button
                    onClick={() => toggleItem(item._id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-3 cursor-pointer hover:bg-black/[0.015] transition-colors"
                  >
                    <div>
                      {item.subtitle && (
                        <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-0.5">
                          {item.subtitle}
                        </span>
                      )}
                      <h3 className="text-lg sm:text-xl font-bold text-[#181818]">
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full bg-white border border-[#E8E8E6] flex items-center justify-center text-[#181818] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#181818] text-white border-[#181818]" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {/* Expanded Body */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-[#F2F2F0] bg-white animate-in fade-in-50 duration-200">
                      {item.description && (
                        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}

                      {item.features && item.features.length > 0 && (
                        <div className="space-y-1.5 mb-5 p-3.5 bg-[#F9F9F8] rounded border border-[#E8E8E6]">
                          {item.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#444444]">
                              <Check size={13} className="text-[#8C6D4F] flex-shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                        className="btn btn-outline-dark text-xs py-2.5 px-4 w-full flex items-center justify-center gap-1.5 font-medium"
                      >
                        Angebot anfragen
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
