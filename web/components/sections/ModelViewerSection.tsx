"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCw, Maximize2 } from "lucide-react";

export default function ModelViewerSection() {
  const [loaded, setLoaded] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const scriptRef = useRef(false);

  useEffect(() => {
    // Dynamically load @google/model-viewer script only once
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
      className="section-pad bg-[#f3efe5]"
      aria-labelledby="3d-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="flex-1">
            <p className="text-label text-gray-400 mb-3">Interaktive Vorschau</p>
            <h2
              id="3d-heading"
              className="text-display text-[#121212] text-3xl md:text-4xl mb-5"
            >
              Unsere Werkstücke
              <br />
              in 3D erleben
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 max-w-sm">
              Drehen, zoomen und erkunden Sie unsere Holzarbeiten interaktiv in
              360°. Im Sanity Studio können Sie eigene 3D-Modelle (.glb) hochladen.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center flex-shrink-0">
                  <RotateCw size={14} className="text-white" />
                </div>
                <span>360°-Rotation mit Maus oder Touch</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center flex-shrink-0">
                  <Maximize2 size={14} className="text-white" />
                </div>
                <span>Zoomen und alle Details erkunden</span>
              </div>
            </div>
          </div>

          {/* 3D Viewer */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "1/1" }}>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-[#121212] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-400">3D-Modell wird geladen…</p>
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
                    mv.setAttribute("shadow-intensity", "1");
                    mv.setAttribute("exposure", "0.9");
                    mv.setAttribute("ar", "true");
                    mv.setAttribute("ar-modes", "webxr scene-viewer quick-look");
                    mv.style.width = "100%";
                    mv.style.height = "100%";
                    mv.style.minHeight = "400px";
                    mv.style.background = "#f9fafb";
                    el.appendChild(mv);
                  }}
                  style={{ width: "100%", height: "100%", minHeight: "400px" }}
                />
              )}

              {/* Overlay badge */}
              <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                Demomodell
              </div>
              <div className="absolute bottom-4 right-4 bg-[#E5DECE] text-[#121212] text-xs px-3 py-1.5 rounded-full font-semibold">
                Drag to rotate
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-3">
              Eigene Produktmodelle (.glb) über das CMS hochladbar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
