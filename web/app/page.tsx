import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import ModelViewerSection from "@/components/sections/ModelViewerSection";
import {
  ArrowRight,
  Hammer,
  Layers,
  Award,
  TreePine,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Ruler,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Kurze Firmen-Story Teaser */}
        <section className="section-pad bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-label text-gray-400 block mb-2">
                  Seit 1977 in Meisterhand
                </span>
                <h2 className="text-display text-3xl md:text-5xl text-[#121212] mb-6">
                  Tradition, die man sieht. Qualität, die bleibt.
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
                  <p>
                    Was im Januar 1977 durch <strong>Roland Mehlhorn</strong> als kleiner Gestellbau begann, ist heute ein moderner Meisterbetrieb für exklusive Holz- und Bauelemente.
                  </p>
                  <p>
                    Seit 2012 führt Sohn und Tischlermeister <strong>Ronny Mehlhorn</strong> die Tischlerei mit Leidenschaft, Präzisionsmaschinen und höchstem Qualitätsanspruch.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-[#f9fafb] rounded-xl border border-gray-100">
                    <div className="text-2xl font-black text-[#121212] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      45+ Jahre
                    </div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">Erfahrung & Meisterschaft</div>
                  </div>
                  <div className="p-4 bg-[#f9fafb] rounded-xl border border-gray-100">
                    <div className="text-2xl font-black text-[#121212] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      100%
                    </div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">Präzision & Fachmontage</div>
                  </div>
                </div>

                <Link href="/ueber-uns" className="btn btn-primary inline-flex items-center gap-2">
                  Mehr über unsere Geschichte & Werkstatt
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-bg.jpg"
                    alt="Tischlermeister bei der Arbeit"
                    className="w-full h-[460px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#E5DECE] font-bold block mb-1">
                      Werkstatt & Fertigung
                    </span>
                    <p className="font-semibold text-base">
                      Individuelle Maßanfertigungen auf modernsten Maschinen und klassischen Hobelbänken.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Leistungsübersicht / Was wir machen */}
        <section className="section-pad bg-[#f9fafb] border-t border-gray-100">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-label text-gray-400 block mb-2">Unser Leistungsumfang</span>
                <h2 className="text-display text-3xl md:text-5xl text-[#121212]">
                  Was wir für Sie fertigen & montieren
                </h2>
              </div>
              <Link href="/leistungen" className="btn btn-outline-dark text-sm flex items-center gap-2 self-start md:self-auto">
                Alle Leistungen ansehen
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Holzfenster */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/service-fenster.jpg"
                      alt="Holzfenster"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#121212] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Eigene Fertigung
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#121212] mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      Holz- & Holz-Alu-Fenster
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Handgefertigt aus erlesenen Hölzern für beste Wärmedämmung, Denkmalschutz und lebenslange Eleganz.
                    </p>
                    <ul className="space-y-1.5 text-xs text-gray-500">
                      <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#121212]" /> 3-fach Isolierverglasung</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#121212]" /> Denkmalschutzgerechte Profile</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link href="/leistungen#eigenfertigung" className="text-xs font-bold text-[#121212] flex items-center gap-1 hover:underline">
                    Details anzeigen <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card 2: Haustüren */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/service-tuer.jpg"
                      alt="Haustüren"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#121212] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Eigene Fertigung
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#121212] mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      Massivholz-Haustüren
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Sicher, wärmegedämmt und individuell gestaltet. Die repräsentative Visitenkarte für Ihr Haus.
                    </p>
                    <ul className="space-y-1.5 text-xs text-gray-500">
                      <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#121212]" /> RC2 / RC3 Sicherheitstechnik</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#121212]" /> Sondermaße & Biometrie-Zutritt</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link href="/leistungen#eigenfertigung" className="text-xs font-bold text-[#121212] flex items-center gap-1 hover:underline">
                    Details anzeigen <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card 3: Wintergärten */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/service-wintergarten.jpg"
                      alt="Wintergärten"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#121212] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Eigene Fertigung
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#121212] mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      Wintergärten & Glasbauten
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Wohnraumerweiterungen mit maximalem Lichteinfall, modernster Statik und zuverlässiger Klimatisierung.
                    </p>
                    <ul className="space-y-1.5 text-xs text-gray-500">
                      <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#121212]" /> Holz & Holz-Alu-Tragwerke</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#121212]" /> Großflächige Hebeschiebetüren</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link href="/leistungen#eigenfertigung" className="text-xs font-bold text-[#121212] flex items-center gap-1 hover:underline">
                    Details anzeigen <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bauelemente Teaser Bar */}
            <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Handel & Fachmontage</span>
                <h4 className="text-xl font-bold text-[#121212]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Kunststoff- & Alufenster, Innentüren, Garagentore & Rollladen
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Kompletter Service: Beratung, Aufmaß, Lieferung und normgerechter Einbau aller Bauelemente vor Ort.
                </p>
              </div>
              <Link href="/leistungen#bauelemente" className="btn btn-outline-dark text-xs flex-shrink-0">
                Bauelemente-Katalog ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Interactive Showcase: Vorher / Nachher Slider */}
        <BeforeAfterSlider
          beforeSrc="/images/hero-bg.jpg"
          afterSrc="/images/service-wintergarten.jpg"
          beforeLabel="Werkstattfertigung"
          afterLabel="Montage beim Kunden"
        />

        {/* 5. 3D Model Viewer Showcase */}
        <ModelViewerSection />

        {/* 6. Shop & Deko Teaser */}
        <section className="section-pad bg-white border-t border-gray-100">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-label text-gray-400 block mb-2">Handgefertigte Unikate</span>
                <h2 className="text-display text-3xl md:text-5xl text-[#121212]">
                  Deko-Katalog & Werkstücke
                </h2>
                <p className="text-gray-500 max-w-xl text-lg mt-2">
                  Massivholz-Schneidebretter und schwebende Wandregale direkt aus unserer Meisterwerkstatt.
                </p>
              </div>
              <Link href="/shop" className="btn btn-primary text-sm flex items-center gap-2 self-start md:self-auto">
                Zum gesamten Shop & Deko-Katalog
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="bg-[#f9fafb] rounded-2xl overflow-hidden border border-gray-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-schneidebrett.jpg" alt="Schneidebrett Hirnholz XL" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#121212] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Schneidebrett Hirnholz XL
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">Eiche massiv · 40 × 30 × 5 cm</p>
                  <div className="text-xl font-black text-[#121212]">89,00 €</div>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2 w-full mt-4 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Im Shop anfragen
                </Link>
              </div>

              {/* Product 2 */}
              <div className="bg-[#f9fafb] rounded-2xl overflow-hidden border border-gray-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-regal.jpg" alt="Wandregal Eiche massiv" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#121212] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Schwebendes Wandregal Eiche
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">Massiveiche · 80 × 20 × 4 cm</p>
                  <div className="text-xl font-black text-[#121212]">129,00 €</div>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2 w-full mt-4 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Im Shop anfragen
                </Link>
              </div>

              {/* Product 3 */}
              <div className="bg-[#f9fafb] rounded-2xl overflow-hidden border border-gray-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-schneidebrett.jpg" alt="Schneidebrett Streifendesign" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-lg text-[#121212] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Schneidebrett Streifendesign
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">Eiche & Buche · 35 × 22 × 3 cm</p>
                  <div className="text-xl font-black text-[#121212]">54,00 €</div>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2 w-full mt-4 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Im Shop anfragen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Schnellkontakt-Banner */}
        <section className="bg-[#121212] text-white py-20">
          <div className="container-site text-center max-w-3xl">
            <span className="text-label text-[#E5DECE] block mb-3">Wir beraten Sie gerne</span>
            <h2 className="text-display text-3xl md:text-5xl text-white mb-6">
              Haben Sie ein Projekt vor Augen?
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Ob Neubau, Sanierung oder individuelle Sonderanfertigung – wir freuen uns auf den Dialog mit Ihnen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/kontakt" className="btn bg-[#E5DECE] text-[#121212] border-[#E5DECE] hover:bg-white hover:border-white font-bold">
                Unverbindliches Angebot anfordern
              </Link>
              <Link href="/galerie" className="btn btn-outline">
                Galerie & Referenzen ansehen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
