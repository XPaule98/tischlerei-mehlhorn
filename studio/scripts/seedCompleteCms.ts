import { getCliClient } from "sanity/cli";
import * as fs from "fs";
import * as path from "path";

const client = getCliClient();

async function uploadImage(filePath: string, filename: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  try {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename,
    });
    console.log(`✓ Uploaded ${filename} -> ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error);
    return null;
  }
}

async function seedAll() {
  console.log("Starting full Sanity CMS population with uploaded images...");

  const baseDir = path.resolve(__dirname, "../../web/public/images");
  const realDir = path.join(baseDir, "real");

  // 1. Upload All Real Project & Workshop Images
  const imgGebaeude = await uploadImage(path.join(realDir, "gebaeude-1.jpg"), "gebaeude-1.jpg");
  const imgWerkstatt1 = await uploadImage(path.join(realDir, "werkstatt-1.jpg"), "werkstatt-1.jpg");
  const imgWerkstatt2 = await uploadImage(path.join(realDir, "werkstatt-2.jpg"), "werkstatt-2.jpg");
  const imgWerkstatt3 = await uploadImage(path.join(realDir, "werkstatt-3.jpg"), "werkstatt-3.jpg");
  const imgFensterHolz = await uploadImage(path.join(realDir, "fenster-holz-1.jpg"), "fenster-holz-1.jpg");
  const imgFensterAlu = await uploadImage(path.join(realDir, "fenster-holzalu-buendig.jpg"), "fenster-holzalu-buendig.jpg");
  const imgTuer5 = await uploadImage(path.join(realDir, "tuer-5.jpg"), "tuer-5.jpg");
  const imgTuer6 = await uploadImage(path.join(realDir, "tuer-6.jpg"), "tuer-6.jpg");
  const imgTuer7 = await uploadImage(path.join(realDir, "tuer-7.jpg"), "tuer-7.jpg");
  const imgTuer8 = await uploadImage(path.join(realDir, "tuer-8.jpg"), "tuer-8.jpg");
  const imgWintergarten1 = await uploadImage(path.join(realDir, "wintergarten-1.jpg"), "wintergarten-1.jpg");
  const imgWintergarten2 = await uploadImage(path.join(realDir, "wintergarten-2.jpg"), "wintergarten-2.jpg");
  const imgSchneidebrett = await uploadImage(path.join(baseDir, "catalog-schneidebrett.jpg"), "catalog-schneidebrett.jpg");
  const imgRegal = await uploadImage(path.join(baseDir, "catalog-regal.jpg"), "catalog-regal.jpg");

  function imageAsset(id: string | null) {
    if (!id) return undefined;
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: id,
      },
    };
  }

  // 2. Populate Hero Settings (Startseite)
  console.log("Populating heroSettings...");
  await client.createOrReplace({
    _id: "heroSettings",
    _type: "heroSettings",
    craftBadge: "Meisterbetrieb seit 1977 · Schönheide (Erzgebirge)",
    title: "Präzision in Holz. Beständigkeit für Generationen.",
    subtitle:
      "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.",
    primaryButtonText: "Leistungen entdecken",
    primaryButtonLink: "/leistungen",
    secondaryButtonText: "Unverbindlich anfragen",
    secondaryButtonLink: "/kontakt",
    slides: [
      {
        _key: "slide1",
        _type: "heroSlide",
        image: imageAsset(imgGebaeude),
        customTitle: "Präzision in Holz. Beständigkeit für Generationen.",
        customSubtitle: "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten.",
      },
      {
        _key: "slide2",
        _type: "heroSlide",
        image: imageAsset(imgFensterAlu),
        customTitle: "Holz-Aluminium-Fenster der Premiumklasse.",
        customSubtitle: "Innen behagliches Naturholz, außen unverwüstliches Aluminium – meisterhaft verarbeitet in Schönheide.",
      },
      {
        _key: "slide3",
        _type: "heroSlide",
        image: imageAsset(imgTuer5),
        customTitle: "Massivholz-Haustüren für höchste Ansprüche.",
        customSubtitle: "Individuelle Kassettenfräsungen, geprüfter Einbruchschutz (RC2/RC3) und exzellente Wärmedämmung.",
      },
      {
        _key: "slide4",
        _type: "heroSlide",
        image: imageAsset(imgWintergarten1),
        customTitle: "Wintergärten & Glasbauten aus Meisterhand.",
        customSubtitle: "Tragende Holz- und Holz-Alu-Konstruktionen inklusive statischer Berechnung und schlüsselfertiger Montage.",
      },
      {
        _key: "slide5",
        _type: "heroSlide",
        image: imageAsset(imgWerkstatt2),
        customTitle: "Über 45 Jahre Handwerkstradition im Erzgebirge.",
        customSubtitle: "Gegründet 1977 durch Roland Mehlhorn, heute in 2. Generation geführt durch Tischlermeister Ronny Mehlhorn.",
      },
    ],
  });

  // 3. Populate Services Page Header
  console.log("Populating servicesPage...");
  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    badge: "Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn",
    title: "Leistungen & Gewerke",
    subtitle: "Eigene Herstellung im Erzgebirge kombiniert mit Fachmontage führender Bauelemente-Marken.",
    headerImage: imageAsset(imgFensterAlu),
  });

  // 4. Populate About Page
  console.log("Populating aboutPage...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    badge: "Familienbetrieb im Erzgebirge seit 1977",
    headline: "Über uns & Werkstatt",
    introText: "Tradition, Meisterhandwerk & moderner Bauelementebau in der Neuheider Straße 64 b in Schönheide.",
    headerImage: imageAsset(imgWerkstatt2),
    storyHeadline: "Vom traditionellen Gestellbau zum modernen Meisterbetrieb",
    storyParagraph1:
      "Die Geschichte unserer Tischlerei begann im Januar 1977, als Roland Mehlhorn den Schritt in die Selbstständigkeit wagte. Was mit traditionellem Gestellbau und solider Handarbeit seinen Anfang nahm, wuchs über die Jahrzehnte durch kontinuierliche Weiterentwicklung und kompromisslose Qualitätsorientierung zu einem festen Begriff im Westerzgebirge heran.",
    storyParagraph2:
      "1992 folgte der Neubau des heutigen Firmengebäudes in der Neuheider Straße 64 b – mit großzügigen Werkstatträumen und modernem Maschinenpark. Seit Juli 2012 führt Tischlermeister Ronny Mehlhorn die Geschicke des Familienunternehmens in zweiter Generation. Dabei verbinden wir überlieferte Handwerkstradition mit modernster Profiltechnik (wie dem System Gutmann Mira) und zukunftssicherer Isoliertechnologie.",
    storyParagraph3:
      "Für uns ist Holz nicht bloß ein Werkstoff, sondern lebendige Natur. Wir verarbeiten vorrangig hochwertige heimische Hölzer wie Eiche, Kiefer und Lärche. Jedes Fenster, jede Haustür und jeder Wintergarten verlässt unsere Werkstatt erst, wenn Passgenauigkeit, Oberflächenveredelung und Funktionalität höchsten meisterlichen Ansprüchen genügen.",
    workshopGallery: [
      {
        _key: "wg1",
        _type: "slideImage",
        image: imageAsset(imgGebaeude),
        caption: "Firmengebäude & Meisterwerkstatt in der Neuheider Straße 64 b in Schönheide (Erzgebirge)",
      },
      {
        _key: "wg2",
        _type: "slideImage",
        image: imageAsset(imgWerkstatt2),
        caption: "Traditionelle Handwerkskunst & Hobelbank – Erfahrung und Leidenschaft für Holz seit 1977",
      },
      {
        _key: "wg3",
        _type: "slideImage",
        image: imageAsset(imgWerkstatt1),
        caption: "Moderner Maschinenpark für millimetergenaue Profilierung und maßgefertigte Holzbauteile",
      },
      {
        _key: "wg4",
        _type: "slideImage",
        image: imageAsset(imgWerkstatt3),
        caption: "Montagelinie für maßgefertigte Holzfenster und Holz-Aluminium-Systeme (System Gutmann Mira)",
      },
      {
        _key: "wg5",
        _type: "slideImage",
        image: imageAsset(imgFensterAlu),
        caption: "Präzisionsfertigung flächenbündiger Holz-Aluminium-Fensterelemente",
      },
      {
        _key: "wg6",
        _type: "slideImage",
        image: imageAsset(imgWintergarten1),
        caption: "Tragwerksfertigung für Wintergärten und großflächige Hebeschiebetür-Anlagen",
      },
    ],
  });

  // 5. Populate Gallery Page
  console.log("Populating galleryPage...");
  await client.createOrReplace({
    _id: "galleryPage",
    _type: "galleryPage",
    badge: "Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn",
    title: "Galerie & Referenzen",
    subtitle: "Einblicke in unsere Meisterwerkstatt, Fertigung und Baustellen im Erzgebirge.",
    headerImage: imageAsset(imgWintergarten1),
  });

  // 6. Populate Shop Page
  console.log("Populating shopPage...");
  await client.createOrReplace({
    _id: "shopPage",
    _type: "shopPage",
    badge: "Aus unserer Meisterwerkstatt in Schönheide",
    title: "Shop & Deko-Katalog",
    subtitle: "Handgefertigte Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche zum Festpreis.",
    headerImage: imageAsset(imgSchneidebrett),
  });

  // 7. Populate Contact Page
  console.log("Populating contactPage...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    badge: "Meisterbetrieb in Schönheide",
    title: "Kontakt & Anfragen",
    subtitle: "Persönliche Fachberatung in unserer Werkstatt in Schönheide oder unverbindliches Angebot für Ihr Bauvorhaben.",
    headerImage: imageAsset(imgGebaeude),
  });

  // 8. Populate Company Info
  console.log("Populating companyInfo...");
  await client.createOrReplace({
    _id: "companyInfo",
    _type: "companyInfo",
    companyName: "Tischlerei Ronny Mehlhorn",
    owner: "Ronny Mehlhorn (Tischlermeister)",
    phone: "037755 / 2346",
    email: "tischlerei.mehlhorn@t-online.de",
    street: "Neuheider Straße 64 b",
    zipCity: "08304 Schönheide (Erzgebirge)",
    hoursWeekdays: "Mo - Fr: 07:00 - 16:30 Uhr",
    hoursSaturday: "Nach Vereinbarung",
  });

  // 9. Populate Team Members
  console.log("Populating teamMember documents...");
  const team = [
    {
      _id: "team-ronny",
      _type: "teamMember",
      name: "Ronny Mehlhorn",
      role: "Inhaber & Tischlermeister",
      image: imageAsset(imgWerkstatt2),
      bio: "Übernahme der Meisterwerkstatt 2012 in 2. Generation. Verantwortlich für Kundenberatung, Arbeitsvorbereitung, Statikplanung und Fertigung.",
      since: "Im Betrieb seit 1995 · Meisterbrief 2005",
      order: 1,
    },
    {
      _id: "team-roland",
      _type: "teamMember",
      name: "Roland Mehlhorn",
      role: "Firmengründer & Senior",
      image: imageAsset(imgWerkstatt1),
      bio: "Gründete den Betrieb 1977 mit traditionellem Gestellbau und baute 1992 das heutige Werkstattgebäude in der Neuheider Straße auf.",
      since: "Gründer 1977",
      order: 2,
    },
    {
      _id: "team-gesellen",
      _type: "teamMember",
      name: "Werkstatt-Team & Gesellen",
      role: "Tischlergeselle",
      image: imageAsset(imgWerkstatt3),
      bio: "Erfahrene Fachkräfte für den präzisen Zuschnitt, die Profilbearbeitung, Oberflächenveredelung und saubere RAL-Montage vor Ort.",
      since: "Langjährige Handwerkserfahrung",
      order: 3,
    },
    {
      _id: "team-hund",
      _type: "teamMember",
      name: "Balou",
      role: "Werkstatthund 🐾",
      image: imageAsset(imgGebaeude),
      bio: "Sorgt stets für gute Laune im Betrieb, begrüßt treue Kunden und überwacht zuverlässig die wohlverdienten Kaffeepausen.",
      since: "Im Dienst für gute Stimmung",
      order: 4,
    },
  ];

  for (const member of team) {
    await client.createOrReplace(member);
  }

  // 10. Populate Portfolio / Gallery Projects
  console.log("Populating portfolioProject documents...");
  const projects = [
    {
      _id: "proj-1",
      _type: "portfolioProject",
      title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
      category: "produktion",
      location: "Werkstatt Schönheide",
      year: "2024",
      mainImage: imageAsset(imgFensterAlu),
      gallery: [imageAsset(imgFensterAlu), imageAsset(imgFensterHolz)],
      description: "Flächenbündige Holz-Alu-Fertigung in unserer eigenen Werkstatt. Innen behagliches Naturholz, außen unverwüstliches Aluminium.",
      scope: ["System GUTMANN MIRA", "Eigene Holzverleimung", "3-fach Wärmeschutz"],
      featured: false,
    },
    {
      _id: "proj-2",
      _type: "portfolioProject",
      title: "Massivholz-Haustür mit Segmentbogen & Kassetten",
      category: "produktion",
      location: "Werkstatt Schönheide",
      year: "2024",
      mainImage: imageAsset(imgTuer5),
      gallery: [imageAsset(imgTuer5), imageAsset(imgTuer6)],
      description: "Traditionell gefräste Kassettenhaustür mit Segmentbogen und integrierter Mehrfachverriegelung nach Kundenmaß.",
      scope: ["Eiche Massivholz", "Sicherheitsbeschlag RC2", "Individuelle Schnitzprofile"],
      featured: false,
    },
    {
      _id: "proj-3",
      _type: "portfolioProject",
      title: "Schlüsselfertiger Wintergarten-Anbau",
      category: "montage",
      location: "Erzgebirge",
      year: "2024",
      mainImage: imageAsset(imgWintergarten1),
      gallery: [imageAsset(imgWintergarten1), imageAsset(imgWintergarten2)],
      description: "Komplette Vor-Ort-Montage eines beheizbaren Holz-Wintergartens mit Hebeschiebe-Türanlage und Sonnenschutz-Glasdach.",
      scope: ["Statik & Holztragwerk", "RAL-Bauanschluss", "Großflächen-Hebeschiebetür"],
      featured: false,
    },
    {
      _id: "proj-4",
      _type: "portfolioProject",
      title: "Komplettausstattung Architektenhaus mit Holz-Alu-Elementen",
      category: "projekte",
      location: "Region Erzgebirge",
      year: "2024",
      mainImage: imageAsset(imgGebaeude),
      gallery: [imageAsset(imgGebaeude), imageAsset(imgFensterAlu)],
      description: "Großprojekt: Fertigung und RAL-Montage von 24 Holz-Aluminium-Fenstern und einer exklusiven Portal-Eingangstür.",
      scope: ["24 Holz-Alu-Elemente", "1 Hauseingangsportal", "RAL-Güteüberwacht"],
      featured: true,
    },
    {
      _id: "proj-5",
      _type: "portfolioProject",
      title: "Montage Eingangstüranlage mit Seitenteil",
      category: "montage",
      location: "Schönheide",
      year: "2023",
      mainImage: imageAsset(imgTuer7),
      description: "Passgenauer Einbau einer mehrteiligen Haustürkombination mit festverglastem Oberlicht und Seitenteil.",
      scope: ["Staubarme Montage", "Thermisch getrennte Schwelle", "Sicherheitsglas"],
      featured: false,
    },
    {
      _id: "proj-6",
      _type: "portfolioProject",
      title: "Meisterbetrieb seit 1977 – Über 45 Jahre Qualität",
      category: "erfolge",
      location: "Schönheide",
      year: "1977 - Heute",
      mainImage: imageAsset(imgWerkstatt2),
      description: "Gegründet durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße, heute in 2. Generation geführt durch Tischlermeister Ronny Mehlhorn.",
      scope: ["Meisterbetrieb", "Eigene Fertigung", "Hunderte zufriedene Bauherren"],
      featured: false,
    },
  ];

  for (const project of projects) {
    await client.createOrReplace(project);
  }

  // 11. Populate Catalog Products
  console.log("Populating catalogProduct documents...");
  const products = [
    {
      _id: "prod-schneidebrett-xl",
      _type: "catalogProduct",
      title: "Schneidebrett Hirnholz XL",
      category: "schneidebretter",
      woodType: "Eiche massiv",
      dimensions: "40 × 30 × 5 cm",
      price: 89.0,
      available: true,
      description: "Massives Stirnholz-Schneidebrett aus heimischer Eiche mit Saftrille und Grifffräsung. Geölt mit lebensmittelechtem Leinöl.",
      images: [imageAsset(imgSchneidebrett)],
    },
    {
      _id: "prod-wandregal-eiche",
      _type: "catalogProduct",
      title: "Schwebendes Wandregal Eiche",
      category: "regale",
      woodType: "Eiche mit Natur-Baumkante",
      dimensions: "80 × 20 × 4 cm",
      price: 129.0,
      available: true,
      description: "Echtholz-Wandboard aus einer massiven Eichenbohle mit erhaltener Baumkante. Unsichtbare Wandbefestigung inklusive.",
      images: [imageAsset(imgRegal)],
    },
    {
      _id: "prod-schneidebrett-streifen",
      _type: "catalogProduct",
      title: "Schneidebrett Streifendesign",
      category: "schneidebretter",
      woodType: "Eiche & Buche",
      dimensions: "35 × 22 × 3 cm",
      price: 54.0,
      available: true,
      description: "Zweifarbig verleimtes Küchenbrett aus abwechselnden Lamellen aus Eiche und Buche.",
      images: [imageAsset(imgSchneidebrett)],
    },
    {
      _id: "prod-servierbrett",
      _type: "catalogProduct",
      title: "Servierbrett Eiche mit Griff",
      category: "schneidebretter",
      woodType: "Eiche massiv",
      dimensions: "45 × 18 × 2,5 cm",
      price: 45.0,
      available: true,
      description: "Schlankes Servier- und Brotzeitbrett mit ergonomisch gefrästem Griff und Lederband.",
      images: [imageAsset(imgSchneidebrett)],
    },
  ];

  for (const prod of products) {
    await client.createOrReplace(prod);
  }

  // 12. Populate Services
  console.log("Populating serviceItem documents...");
  const services = [
    {
      _id: "service-holzfenster",
      _type: "serviceItem",
      title: "Holzfenster aus eigener Produktion",
      category: "fenster",
      description: "Unsere handgefertigten Holzfenster entstehen in eigener Werkstatt in Schönheide. Sie verbinden traditionelle Zimmermannskunst mit modernsten Isolierverglasungen und denkmalgerechten Zierprofilen.",
      features: [
        "Auswahl edler Hölzer: Eiche massiv, Lärche, Kiefer",
        "2-fach und 3-fach Wärmeschutz- & Schallschutzverglasung",
        "Langlebige, umweltschonende Mehrschicht-Oberflächenlasuren",
        "Historische Kämpfer, Sprossen und Zierleisten nach Denkmalschutz",
      ],
      image: imageAsset(imgFensterHolz),
      order: 1,
    },
    {
      _id: "service-holzalu",
      _type: "serviceItem",
      title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
      category: "fenster",
      description: "Die Premium-Kombination aus eigener Fertigung: Innen natürliche Holzatmosphäre, außen eine witterungsbeständige Aluminium-Vorsatzschale im bewährten System Gutmann Mira. Nie wieder streichen.",
      features: [
        "Flächenbündige und flächenversetzte Ausführungsvarianten",
        "Original Profilsystem GUTMANN MIRA für dauerhaften Wetterschutz",
        "Aluminiumschalen in allen RAL-Farbtönen pulverbeschichtet",
        "Maximale Energieeffizienz für Niedrigenergie- und Passivhäuser",
      ],
      image: imageAsset(imgFensterAlu),
      order: 2,
    },
    {
      _id: "service-haustueren",
      _type: "serviceItem",
      title: "Hauseingangstüren aus eigener Produktion",
      category: "tueren",
      description: "Jede Haustür ist eine maßgefertigte Visitenkarte für Ihr Haus. In unserer Werkstatt fertigen wir individuelle Holztüren mit gefrästen Kassetten, Lichtausschnitten und hochsicherer Mehrfachverriegelung.",
      features: [
        "Massivholzkonstruktion oder formstabile Verbundplatten",
        "Sicherheits-Mehrfachverriegelungen mit Schwenkriegeln (RC2 / RC3)",
        "Elektronische Zutrittskontrollen (Fingerprint, Code)",
        "Individuelle Fräsungen, Sprossen und Oberflächen nach Wunsch",
      ],
      image: imageAsset(imgTuer5),
      order: 3,
    },
    {
      _id: "service-wintergaerten",
      _type: "serviceItem",
      title: "Wintergärten & Glasbauten",
      category: "wintergarten",
      description: "Individuell geplante Kalt- und Warmwintergärten in tragender Holz- oder Holz-Aluminium-Konstruktion. Wir planen die Statik, fertigen die Tragglieder in Schönheide und montieren Ihre Glasoase schlüsselfertig.",
      features: [
        "Tragwerksplanung und präzise statische Berechnung",
        "Sonnenschutz- und selbstreinigendes Isolierglas im Dachbereich",
        "Großflächige Hebe-Schiebetüren für barrierefreie Öffnung",
        "Komplette Montage inklusive fachgerechter Bauanschlussabdichtung",
      ],
      image: imageAsset(imgWintergarten1),
      order: 4,
    },
  ];

  for (const s of services) {
    await client.createOrReplace(s);
  }

  console.log("✨ ALL SANITY CMS DOCUMENTS AND ASSET UPLOADS HAVE BEEN SUCCESSFULLY POPULATED!");
}

seedAll().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
