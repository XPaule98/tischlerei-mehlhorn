"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCw, Maximize2, Sparkles } from "lucide-react";

export default function ModelViewerSection() {
  const [loaded, setLoaded] = useState(false);
  const scriptRef = useRef(false);

  useEffect(() => {
    if (scriptRef.current) return;
    scriptRef.current = true;

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  return (
    <section
      className="section-pad bg-[#F3ECE2] border-y border-[#E6DED4]"
      aria-labelledby="3d-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Description */}
          <div className="lg:col-span-6">
            <span className="text-craft-label block mb-2">Interaktive 3D-Ansicht</span>
            <h2
              id="3d-heading"
              className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-6"
            >
              Handwerk in 360° erleben
            </h2>
            <p className="text-[#5E564E] text-base md:text-lg leading-relaxed mb-8">
              Jedes unserer Werkstücke zeichnet sich durch feinste Holzverbindungen,
              exakt gefaste Kanten und eine harmonische Holzmaserung aus. 
              Drehen und zoomen Sie unsere Holzarbeiten direkt im Browser.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded bg-[#1E1A17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <RotateCw size={15} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E1A17]">
                    Freie 360-Grad-Rotation
                  </h4>
                  <p className="text-xs text-[#6B635B] mt-0.5">
                    Mit Maus oder Touch-Geste das Werkstück von allen Seiten betrachten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded bg-[#1E1A17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Maximize2 size={15} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E1A17]">
                    Detailtreue & Materialanmutung
                  </h4>
                  <p className="text-xs text-[#6B635B] mt-0.5">
                    Hineinzoomen und feinste Fräsungen, Holzmaserungen und Kanten prüfen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Canvas Box */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-md border border-[#E6DED4]" style={{ aspectRatio: "1/1" }}>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FAF8F5]">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#8C6D4F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs font-medium text-[#8C6D4F] uppercase tracking-wider">
                      3D-Vorschau wird geladen…
                    </p>
                  </div>
                </div>
              )}

              {loaded && (
                <div
                  ref={(el) => {
                    if (!el || el.children.length > 0) return;
                    const mv = document.createElement("model-viewer");
                    mv.setAttribute("src", "https://modelviewer.dev/shared-assets/models/Astronaut.glb");
                    mv.setAttribute("alt", "3D-Vorschau eines Tischler-Werkstücks");
                    mv.setAttribute("auto-rotate", "true");
                    mv.setAttribute("camera-controls", "true");
                    mv.setAttribute("shadow-intensity", "0.8");
                    mv.setAttribute("exposure", "0.95");
                    mv.setAttribute("ar", "true");
                    mv.setAttribute("ar-modes", "webxr scene-viewer quick-look");
                    mv.style.width = "100%";
                    mv.style.height = "100%";
                    mv.style.minHeight = "380px";
                    mv.style.background = "#FAF8F5";
                    el.appendChild(mv);
                  }}
                  style={{ width: "100%", height: "100%", minHeight: "380px" }}
                />
              )}

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1E1A17] text-xs px-3 py-1 rounded border border-[#E6DED4] font-medium">
                Interaktives Werkstück-Modell
              </div>
              <div className="absolute bottom-4 right-4 bg-[#1E1A17] text-white text-xs px-3 py-1 rounded font-medium">
                Mit Maus drehen
              </div>
            </div>
            <p className="text-xs text-center text-[#8C8277] mt-3">
              Individuelle 3D-Modelle (.glb) über das Sanity CMS hochladbar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
