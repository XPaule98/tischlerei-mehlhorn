import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import ModelViewerSection from "@/components/sections/ModelViewerSection";
import { client } from "@/sanity/lib/client";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { ArrowRight, Check, ShoppingBag, Ruler, TreePine } from "lucide-react";

export const revalidate = 30; // Revalidate every 30 seconds for live CMS updates

export default async function HomePage() {
  let heroData = null;
  try {
    heroData = await client.fetch(HERO_QUERY, {}, { next: { revalidate: 30 } });
  } catch (e) {
    // Graceful fallback to default data
  }

  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1. Hero Section (Live data from Sanity with default fallback) */}
        <HeroSection data={heroData} />

        {/* 2. Kurze Firmen-Story Teaser */}
        <section className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <span className="text-craft-label block mb-3">
                  Tradition & Handwerk seit 1977
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#1E1A17] font-normal leading-tight mb-6">
                  Präzision aus Erfahrung. <br />
                  <span className="italic font-light">Leidenschaft für Holz.</span>
                </h2>
                <div className="space-y-4 text-[#5E564E] text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    Was 1977 durch <strong>Roland Mehlhorn</strong> mit handwerklichem Gestellbau begann, hat sich über Jahrzehnte zu einem geschätzten Meisterbetrieb für anspruchsvolle Architektenhäuser und private Bauherren entwickelt.
                  </p>
                  <p>
                    Seit 2012 führt Sohn und Tischlermeister <strong>Ronny Mehlhorn</strong> die Tischlerei mit modernster Fertigungstechnik, fundiertem Fachwissen und dem Anspruch, langlebige Werte aus Holz zu schaffen.
                  </p>
                </div>

                <div className="flex flex-wrap gap-8 py-6 border-y border-[#E6DED4] mb-8">
                  <div>
                    <div className="font-serif-heading text-3xl font-medium text-[#1E1A17]">45+</div>
                    <div className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider mt-0.5">Jahre Meistererfahrung</div>
                  </div>
                  <div className="w-[1px] bg-[#E6DED4] h-12 self-center hidden sm:block" />
                  <div>
                    <div className="font-serif-heading text-3xl font-medium text-[#1E1A17]">1992</div>
                    <div className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider mt-0.5">Neubau Firmengebäude</div>
                  </div>
                  <div className="w-[1px] bg-[#E6DED4] h-12 self-center hidden sm:block" />
                  <div>
                    <div className="font-serif-heading text-3xl font-medium text-[#1E1A17]">100%</div>
                    <div className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider mt-0.5">Eigene Qualitätsfertigung</div>
                  </div>
                </div>

                <Link href="/ueber-uns" className="btn btn-outline-dark text-sm inline-flex items-center gap-2">
                  Mehr über unsere Werkstatt & Geschichte
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-lg overflow-hidden border border-[#E6DED4] shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-bg.jpg"
                    alt="Tischlermeister bei der Arbeit in der Werkstatt"
                    className="w-full h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-[#FAF8F5]">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#D4B28C] block mb-1">
                      Werkstatt in Meisterhand
                    </span>
                    <p className="font-serif-heading text-lg font-normal text-white">
                      Maßanfertigung mit Herz, Augenmaß und modernstem Maschinenpark.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Leistungsübersicht / Was wir machen */}
        <section className="section-pad bg-white border-t border-[#E6DED4]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-craft-label block mb-2">Unser Leistungsspektrum</span>
                <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal">
                  Handwerkliche Kernkompetenzen
                </h2>
              </div>
              <Link href="/leistungen" className="btn btn-outline-dark text-sm flex items-center gap-2 self-start md:self-auto">
                Alle Leistungen im Detail
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Gewerk 1: Holzfenster */}
              <div className="craft-card rounded-lg overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#FAF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/service-fenster.jpg"
                      alt="Holzfenster Handarbeit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Eigene Fertigung</span>
                    <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                      Holz- & Holz-Alu-Fenster
                    </h3>
                    <p className="text-[#5E564E] text-sm leading-relaxed mb-6">
                      Maßgefertigte Fenster aus Eiche, Lärche und Kiefer mit modernster 3-fach Isolierverglasung und feinsten Denkmalschutzprofilen.
                    </p>
                    <ul className="space-y-2 text-xs text-[#6B635B]">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8C6D4F]" /> Echte Handwerksverbindungen</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8C6D4F]" /> Höchster Schall- und Wärmeschutz</li>
                    </ul>
                  </div>
                </div>
                <div className="p-7 pt-0 border-t border-[#F3ECE2] mt-4">
                  <Link href="/leistungen#eigenfertigung" className="text-xs font-semibold text-[#1E1A17] hover:text-[#8C6D4F] flex items-center gap-1.5 pt-4 transition-colors">
                    Mehr erfahren <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Gewerk 2: Haustüren */}
              <div className="craft-card rounded-lg overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#FAF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/service-tuer.jpg"
                      alt="Massivholz Haustüren"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Eigene Fertigung</span>
                    <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                      Massivholz-Haustüren
                    </h3>
                    <p className="text-[#5E564E] text-sm leading-relaxed mb-6">
                      Repräsentative Eingangstüren nach individuellen Wünschen. Kompromisslose Sicherheit, hohe Dämmwerte und edle Oberflächen.
                    </p>
                    <ul className="space-y-2 text-xs text-[#6B635B]">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8C6D4F]" /> RC2 / RC3 Sicherheitstechnik</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8C6D4F]" /> Fingerprint & Smart-Home Zutritt</li>
                    </ul>
                  </div>
                </div>
                <div className="p-7 pt-0 border-t border-[#F3ECE2] mt-4">
                  <Link href="/leistungen#eigenfertigung" className="text-xs font-semibold text-[#1E1A17] hover:text-[#8C6D4F] flex items-center gap-1.5 pt-4 transition-colors">
                    Mehr erfahren <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Gewerk 3: Wintergärten */}
              <div className="craft-card rounded-lg overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#FAF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/service-wintergarten.jpg"
                      alt="Wintergärten und Glasbauten"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Eigene Fertigung</span>
                    <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-3">
                      Wintergärten & Glasbauten
                    </h3>
                    <p className="text-[#5E564E] text-sm leading-relaxed mb-6">
                      Ganzjähriger Wohnkomfort im Grünen. Tragende Holz- und Holz-Alu-Konstruktionen mit integrierter Beschattung und Belüftung.
                    </p>
                    <ul className="space-y-2 text-xs text-[#6B635B]">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8C6D4F]" /> Statik & Komplettplanung</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8C6D4F]" /> Großflächige Hebeschiebetüren</li>
                    </ul>
                  </div>
                </div>
                <div className="p-7 pt-0 border-t border-[#F3ECE2] mt-4">
                  <Link href="/leistungen#eigenfertigung" className="text-xs font-semibold text-[#1E1A17] hover:text-[#8C6D4F] flex items-center gap-1.5 pt-4 transition-colors">
                    Mehr erfahren <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bauelemente Montage Bar */}
            <div className="mt-12 p-8 bg-[#FAF8F5] rounded-lg border border-[#E6DED4] flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-craft-label block mb-1">Handel & Fachmontage</span>
                <h4 className="font-serif-heading text-2xl text-[#1E1A17] font-medium">
                  Kunststoff- & Alufenster, Innentüren, Garagentore & Rollladen
                </h4>
                <p className="text-sm text-[#5E564E] mt-1 max-w-2xl">
                  Wir montieren geprüfte Bauelemente führender Markenhersteller sauber, zuverlässig und nach aktuellen RAL-Standards bei Ihnen vor Ort.
                </p>
              </div>
              <Link href="/leistungen#bauelemente" className="btn btn-outline-dark text-xs flex-shrink-0">
                Bauelemente ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Vorher / Nachher Showcase */}
        <BeforeAfterSlider
          beforeSrc="/images/hero-bg.jpg"
          afterSrc="/images/service-wintergarten.jpg"
          beforeLabel="Werkstattfertigung"
          afterLabel="Montage beim Kunden"
        />

        {/* 5. 3D Model Viewer Showcase */}
        <ModelViewerSection />

        {/* 6. Shop / Deko Highlights */}
        <section className="section-pad bg-white border-t border-[#E6DED4]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-craft-label block mb-2">Aus unserer Werkstatt</span>
                <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal">
                  Handgefertigte Werkstücke & Deko
                </h2>
                <p className="text-[#5E564E] max-w-xl text-base md:text-lg mt-2">
                  Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche zum Festpreis.
                </p>
              </div>
              <Link href="/shop" className="btn btn-wood text-sm flex items-center gap-2 self-start md:self-auto">
                Zum gesamten Shop & Deko-Katalog
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="craft-card rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <div className="relative h-52 rounded overflow-hidden mb-5 bg-[#FAF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-schneidebrett.jpg" alt="Schneidebrett Hirnholz XL" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block mb-1">Eiche massiv</span>
                  <h4 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-1">
                    Schneidebrett Hirnholz XL
                  </h4>
                  <p className="text-xs text-[#6B635B] mb-4">40 × 30 × 5 cm · Stirnholz geölt</p>
                  <div className="font-serif-heading text-2xl text-[#1E1A17] font-semibold">89,00 €</div>
                  <span className="text-[11px] text-[#8C8277] block mt-0.5">inkl. MwSt.</span>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2.5 w-full mt-5 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Im Shop anfragen
                </Link>
              </div>

              {/* Product 2 */}
              <div className="craft-card rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <div className="relative h-52 rounded overflow-hidden mb-5 bg-[#FAF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-regal.jpg" alt="Wandregal Eiche massiv" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block mb-1">Massiveiche</span>
                  <h4 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-1">
                    Schwebendes Wandregal Eiche
                  </h4>
                  <p className="text-xs text-[#6B635B] mb-4">80 × 20 × 4 cm · Baumkante & Unsichtbare Träger</p>
                  <div className="font-serif-heading text-2xl text-[#1E1A17] font-semibold">129,00 €</div>
                  <span className="text-[11px] text-[#8C8277] block mt-0.5">inkl. MwSt.</span>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2.5 w-full mt-5 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Im Shop anfragen
                </Link>
              </div>

              {/* Product 3 */}
              <div className="craft-card rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <div className="relative h-52 rounded overflow-hidden mb-5 bg-[#FAF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-schneidebrett.jpg" alt="Schneidebrett Streifendesign" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block mb-1">Eiche & Buche</span>
                  <h4 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-1">
                    Schneidebrett Streifendesign
                  </h4>
                  <p className="text-xs text-[#6B635B] mb-4">35 × 22 × 3 cm · Zweifarbig verleimt</p>
                  <div className="font-serif-heading text-2xl text-[#1E1A17] font-semibold">54,00 €</div>
                  <span className="text-[11px] text-[#8C8277] block mt-0.5">inkl. MwSt.</span>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2.5 w-full mt-5 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Im Shop anfragen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Schnellkontakt Banner */}
        <section className="bg-[#1C1815] text-[#FAF8F5] py-24 border-t border-white/10">
          <div className="container-site text-center max-w-3xl">
            <span className="text-craft-label text-[#CBB295] block mb-3">Persönliche Beratung vor Ort</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5] font-normal mb-6">
              Haben Sie ein Bauvorhaben vor Augen?
            </h2>
            <p className="text-[#A89F95] text-base md:text-lg mb-10 leading-relaxed">
              Ob Neubau, Denkmalschutz oder individuelle Sanierung – wir beraten Sie mit handwerklicher Meisterschaft und erstellen Ihnen ein maßgeschneidertes Angebot.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/kontakt" className="btn btn-wood text-sm font-medium py-3.5 px-7">
                Unverbindliches Angebot anfordern
              </Link>
              <Link href="/galerie" className="btn btn-outline text-sm font-medium py-3.5 px-7">
                Referenzen & Galerie ansehen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
