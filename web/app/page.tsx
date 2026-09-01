import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FullwidthVideoSection from "@/components/sections/FullwidthVideoSection";
import { client } from "@/sanity/lib/client";
import { HERO_QUERY, SHOWCASE_VIDEO_QUERY } from "@/sanity/lib/queries";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";

export const revalidate = 30;

export default async function HomePage() {
  let heroData = null;
  let videoData = null;

  try {
    [heroData, videoData] = await Promise.all([
      client.fetch(HERO_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(SHOWCASE_VIDEO_QUERY, {}, { next: { revalidate: 30 } }),
    ]);
  } catch (e) {
    // Fallback gracefully
  }

  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1. Fullscreen Hero Section with Calm Permanent Text */}
        <HeroSection data={heroData} />

        {/* 2. Story Section – Clean & Natural */}
        <section className="section-pad bg-[#FFFFFF]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <span className="text-craft-label block mb-2">
                  Handwerk aus Schönheide seit 1977
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818] mb-6 leading-tight">
                  Präzision aus Erfahrung. <br />
                  Leidenschaft für Holz.
                </h2>
                <div className="space-y-4 text-[#555555] text-base leading-relaxed mb-8">
                  <p>
                    Was 1977 durch Roland Mehlhorn als traditioneller Gestellbau begann, hat sich über Jahrzehnte zu einem geschätzten Meisterbetrieb für anspruchsvolle Architektenhäuser und private Bauherren entwickelt.
                  </p>
                  <p>
                    Seit 2012 führt Tischlermeister <strong>Ronny Mehlhorn</strong> die Tischlerei in der Neuheider Straße 64 b mit moderner Fertigungstechnik, fundiertem Fachwissen und dem Anspruch, langlebige Werte aus Holz zu schaffen.
                  </p>
                </div>

                {/* Key Facts Minimalist Row */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E8E8E6] mb-8">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#181818]">45+</div>
                    <div className="text-[11px] text-[#777777] font-medium uppercase tracking-wider mt-0.5">Jahre Erfahrung</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#181818]">1992</div>
                    <div className="text-[11px] text-[#777777] font-medium uppercase tracking-wider mt-0.5">Neubau Werkstatt</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#181818]">100%</div>
                    <div className="text-[11px] text-[#777777] font-medium uppercase tracking-wider mt-0.5">Eigene Fertigung</div>
                  </div>
                </div>

                <Link href="/ueber-uns" className="btn btn-outline-dark text-xs inline-flex items-center gap-2">
                  Werkstatt & Geschichte
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-lg overflow-hidden border border-[#E8E8E6] bg-[#F9F9F8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/real/gebaeude-1.jpg"
                    alt="Firmengebäude Tischlerei Mehlhorn in Schönheide"
                    className="w-full h-[400px] sm:h-[460px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#181818]/85 backdrop-blur-sm text-white p-4 rounded text-xs">
                    <span className="font-semibold block">Werkstatt Schönheide (Erzgebirge)</span>
                    <span className="text-white/70">Eigene Herstellung in der Neuheider Straße 64 b</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Kernkompetenzen / Leistungen */}
        <section className="section-pad bg-[#F9F9F8] border-t border-[#E8E8E6]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-craft-label block mb-1.5">Leistungsspektrum</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">
                  Handwerkliche Kernkompetenzen
                </h2>
              </div>
              <Link href="/leistungen" className="btn btn-outline-dark text-xs self-start md:self-auto flex items-center gap-1.5">
                Alle Leistungen im Detail
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Gewerk 1: Holzfenster */}
              <div className="craft-card overflow-hidden flex flex-col justify-between h-full bg-white">
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#F2F2F0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/real/fenster-holz-1.jpg"
                      alt="Holzfenster aus eigener Produktion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Eigene Fertigung</span>
                    <h3 className="text-xl font-bold text-[#181818] mb-2">
                      Holz- & Holz-Alu-Fenster
                    </h3>
                    <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-5">
                      Maßgefertigte Holzfenster und hochwertige Holz-Aluminium-Systeme (System Gutmann Mira) für beste Wärmedämmung.
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#666666]">
                      <li className="flex items-center gap-2"><Check size={13} className="text-[#8C6D4F]" /> Flächenbündig & flächenversetzt</li>
                      <li className="flex items-center gap-2"><Check size={13} className="text-[#8C6D4F]" /> Original Gutmann Mira Profilsystem</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-[#F2F2F0] mt-4">
                  <Link href="/leistungen" className="text-xs font-semibold text-[#181818] hover:text-[#8C6D4F] flex items-center gap-1 pt-3.5 transition-colors">
                    Mehr erfahren <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Gewerk 2: Haustüren */}
              <div className="craft-card overflow-hidden flex flex-col justify-between h-full bg-white">
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#F2F2F0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/real/tuer-5.jpg"
                      alt="Massivholz Haustüren"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Eigene Fertigung</span>
                    <h3 className="text-xl font-bold text-[#181818] mb-2">
                      Massivholz-Haustüren
                    </h3>
                    <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-5">
                      Individuelle Eingangstüren nach Maß. Kompromisslose Sicherheit, hohe Dämmwerte und handwerkliche Kassettenfräsungen.
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#666666]">
                      <li className="flex items-center gap-2"><Check size={13} className="text-[#8C6D4F]" /> RC2 / RC3 Sicherheitstechnik</li>
                      <li className="flex items-center gap-2"><Check size={13} className="text-[#8C6D4F]" /> Sondermaße & individuelle Profile</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-[#F2F2F0] mt-4">
                  <Link href="/leistungen" className="text-xs font-semibold text-[#181818] hover:text-[#8C6D4F] flex items-center gap-1 pt-3.5 transition-colors">
                    Mehr erfahren <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Gewerk 3: Wintergärten */}
              <div className="craft-card overflow-hidden flex flex-col justify-between h-full bg-white">
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#F2F2F0]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/real/wintergarten-1.jpg"
                      alt="Wintergärten und Glasbauten"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Eigene Fertigung</span>
                    <h3 className="text-xl font-bold text-[#181818] mb-2">
                      Wintergärten & Glasbauten
                    </h3>
                    <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-5">
                      Ganzjähriger Wohnkomfort im Grünen. Tragende Holz- und Holz-Alu-Konstruktionen mit integrierter Beschattung.
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#666666]">
                      <li className="flex items-center gap-2"><Check size={13} className="text-[#8C6D4F]" /> Statik & schlüsselfertiger Bau</li>
                      <li className="flex items-center gap-2"><Check size={13} className="text-[#8C6D4F]" /> Großflächige Hebeschiebetüren</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-[#F2F2F0] mt-4">
                  <Link href="/leistungen" className="text-xs font-semibold text-[#181818] hover:text-[#8C6D4F] flex items-center gap-1 pt-3.5 transition-colors">
                    Mehr erfahren <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bauelemente Montage Bar */}
            <div className="mt-8 p-6 bg-white rounded-lg border border-[#E8E8E6] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">Fachmontage & Handel</span>
                <h4 className="text-lg sm:text-xl font-bold text-[#181818]">
                  Kunststofffenster (VEKA & Gealan), Innentüren, Garagentore & Rollladen
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-2xl">
                  Wir montieren geprüfte Bauelemente führender Markenhersteller sauber, zuverlässig und nach RAL-Standards.
                </p>
              </div>
              <Link href="/leistungen" className="btn btn-outline-dark text-xs flex-shrink-0">
                Bauelemente ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Fullwidth Continuous Video Banner (replaces slider) */}
        <FullwidthVideoSection
          videoDesktopUrl={videoData?.videoDesktopUrl}
          videoMobileUrl={videoData?.videoMobileUrl}
          posterImageUrl={videoData?.posterImageUrl || "/images/real/werkstatt-2.jpg"}
          badge={videoData?.badge}
          headline={videoData?.headline}
          subheadline={videoData?.subheadline}
        />

        {/* 5. Shop Highlights */}
        <section className="section-pad bg-white border-t border-[#E8E8E6]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-craft-label block mb-1.5">Aus unserer Werkstatt</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">
                  Handgefertigte Werkstücke & Deko
                </h2>
                <p className="text-[#555555] text-sm sm:text-base mt-1">
                  Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche.
                </p>
              </div>
              <Link href="/shop" className="btn btn-primary text-xs flex items-center gap-1.5 self-start md:self-auto">
                Gesamten Katalog ansehen
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Product 1 */}
              <div className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white">
                <div>
                  <Link href="/shop" className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-schneidebrett.jpg" alt="Schneidebrett Hirnholz XL" className="w-full h-full object-cover" />
                  </Link>
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">Eiche massiv</span>
                  <Link href="/shop">
                    <h3 className="text-lg font-bold text-[#181818] mb-1 hover:underline">
                      Schneidebrett Hirnholz XL
                    </h3>
                  </Link>
                  <p className="text-xs text-[#666666] mb-4">40 × 30 × 5 cm · Stirnholz geölt</p>
                </div>
                <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <span className="text-xl font-bold text-[#181818] whitespace-nowrap">89,00 €</span>
                    <span className="text-[11px] text-[#777777] whitespace-nowrap">inkl. 19% MwSt.</span>
                  </div>
                  <Link href="/shop" className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5">
                    <ShoppingBag size={13} />
                    Details & Anfragen
                  </Link>
                </div>
              </div>

              {/* Product 2 */}
              <div className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white">
                <div>
                  <Link href="/shop" className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-regal.jpg" alt="Wandregal Eiche massiv" className="w-full h-full object-cover" />
                  </Link>
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">Massiveiche</span>
                  <Link href="/shop">
                    <h3 className="text-lg font-bold text-[#181818] mb-1 hover:underline">
                      Schwebendes Wandregal Eiche
                    </h3>
                  </Link>
                  <p className="text-xs text-[#666666] mb-4">80 × 20 × 4 cm · Baumkante</p>
                </div>
                <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <span className="text-xl font-bold text-[#181818] whitespace-nowrap">129,00 €</span>
                    <span className="text-[11px] text-[#777777] whitespace-nowrap">inkl. 19% MwSt.</span>
                  </div>
                  <Link href="/shop" className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5">
                    <ShoppingBag size={13} />
                    Details & Anfragen
                  </Link>
                </div>
              </div>

              {/* Product 3 */}
              <div className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white">
                <div>
                  <Link href="/shop" className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/catalog-schneidebrett.jpg" alt="Schneidebrett Streifendesign" className="w-full h-full object-cover" />
                  </Link>
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">Eiche & Buche</span>
                  <Link href="/shop">
                    <h3 className="text-lg font-bold text-[#181818] mb-1 hover:underline">
                      Schneidebrett Streifendesign
                    </h3>
                  </Link>
                  <p className="text-xs text-[#666666] mb-4">35 × 22 × 3 cm · Zweifarbig verleimt</p>
                </div>
                <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <span className="text-xl font-bold text-[#181818] whitespace-nowrap">54,00 €</span>
                    <span className="text-[11px] text-[#777777] whitespace-nowrap">inkl. 19% MwSt.</span>
                  </div>
                  <Link href="/shop" className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5">
                    <ShoppingBag size={13} />
                    Details & Anfragen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Clean CTA Banner */}
        <section className="bg-[#181818] text-white py-16 md:py-20">
          <div className="container-site text-center max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60 block mb-2">
              Persönliche Beratung in Schönheide
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Haben Sie ein Bauvorhaben vor Augen?
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed">
              Ob Neubau, Denkmalschutz oder Sanierung – Tischlermeister Ronny Mehlhorn berät Sie persönlich und erstellt ein individuelles Angebot.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/kontakt" className="btn bg-white text-[#181818] hover:bg-white/90 text-xs sm:text-sm py-3 px-6">
                Angebot anfordern
              </Link>
              <Link href="/galerie" className="btn btn-outline text-xs sm:text-sm py-3 px-6">
                Referenzen ansehen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
