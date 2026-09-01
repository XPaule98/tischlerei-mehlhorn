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

async function updateServices() {
  console.log("Linking images for all services in Sanity...");
  const baseDir = path.resolve(__dirname, "../../web/public/images/real");

  const imgFensterHolz = await uploadImage(path.join(baseDir, "fenster-holz-1.jpg"), "fenster-holz-1.jpg");
  const imgFensterAlu = await uploadImage(path.join(baseDir, "fenster-holzalu-buendig.jpg"), "fenster-holzalu-buendig.jpg");
  const imgTuer5 = await uploadImage(path.join(baseDir, "tuer-5.jpg"), "tuer-5.jpg");
  const imgTuer6 = await uploadImage(path.join(baseDir, "tuer-6.jpg"), "tuer-6.jpg");
  const imgWintergarten1 = await uploadImage(path.join(baseDir, "wintergarten-1.jpg"), "wintergarten-1.jpg");
  const imgWintergarten2 = await uploadImage(path.join(baseDir, "wintergarten-2.jpg"), "wintergarten-2.jpg");
  const imgGebaeude = await uploadImage(path.join(baseDir, "gebaeude-1.jpg"), "gebaeude-1.jpg");

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

  const services = [
    {
      _id: "service-holzfenster",
      _type: "serviceItem",
      title: "Holzfenster aus eigener Produktion",
      subtitle: "Maßanfertigung für Neubau, Altbau & Denkmalschutz",
      category: "eigenfertigung",
      image: imageAsset(imgFensterHolz),
      gallery: [imageAsset(imgFensterHolz)],
      description:
        "Unsere handgefertigten Holzfenster entstehen in eigener Werkstatt in Schönheide. Sie verbinden traditionelle Zimmermannskunst mit modernsten Isolierverglasungen und denkmalgerechten Zierprofilen.",
      features: [
        "Auswahl edler Hölzer: Eiche massiv, Lärche, Kiefer",
        "2-fach und 3-fach Wärmeschutz- & Schallschutzverglasung",
        "Langlebige, umweltschonende Mehrschicht-Oberflächenlasuren",
        "Historische Kämpfer, Sprossen und Zierleisten nach Denkmalschutz",
      ],
      order: 1,
    },
    {
      _id: "service-holzalu",
      _type: "serviceItem",
      title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
      subtitle: "Flächenbündige & flächenversetzte Ausführung",
      category: "eigenfertigung",
      image: imageAsset(imgFensterAlu),
      gallery: [imageAsset(imgFensterAlu), imageAsset(imgFensterHolz)],
      description:
        "Die Premium-Kombination aus eigener Fertigung: Innen natürliche Holzatmosphäre, außen eine witterungsbeständige Aluminium-Vorsatzschale im bewährten System Gutmann Mira. Nie wieder streichen.",
      features: [
        "Flächenbündige und flächenversetzte Ausführungsvarianten",
        "Original Profilsystem GUTMANN MIRA für dauerhaften Wetterschutz",
        "Aluminiumschalen in allen RAL-Farbtönen pulverbeschichtet",
        "Maximale Energieeffizienz für Niedrigenergie- und Passivhäuser",
      ],
      order: 2,
    },
    {
      _id: "service-haustueren",
      _type: "serviceItem",
      title: "Hauseingangstüren aus eigener Produktion",
      subtitle: "Massivholz & individuelle Unikate nach Kundenwunsch",
      category: "eigenfertigung",
      image: imageAsset(imgTuer5),
      gallery: [imageAsset(imgTuer5), imageAsset(imgTuer6)],
      description:
        "Jede Haustür ist eine maßgefertigte Visitenkarte für Ihr Haus. In unserer Werkstatt fertigen wir individuelle Holztüren mit gefrästen Kassetten, Lichtausschnitten und hochsicherer Mehrfachverriegelung.",
      features: [
        "Massivholzkonstruktion oder formstabile Verbundplatten",
        "Sicherheits-Mehrfachverriegelungen mit Schwenkriegeln (RC2 / RC3)",
        "Elektronische Zutrittskontrollen (Fingerprint, Code)",
        "Individuelle Fräsungen, Sprossen und Oberflächen nach Wunsch",
      ],
      order: 3,
    },
    {
      _id: "service-wintergaerten",
      _type: "serviceItem",
      title: "Wintergärten & Glasbauten",
      subtitle: "Lichtdurchfluteter Wohnraum zu jeder Jahreszeit",
      category: "eigenfertigung",
      image: imageAsset(imgWintergarten1),
      gallery: [imageAsset(imgWintergarten1), imageAsset(imgWintergarten2)],
      description:
        "Individuell geplante Kalt- und Warmwintergärten in tragender Holz- oder Holz-Aluminium-Konstruktion. Wir planen die Statik, fertigen die Tragglieder in Schönheide und montieren Ihre Glasoase schlüsselfertig.",
      features: [
        "Tragwerksplanung und präzise statische Berechnung",
        "Sonnenschutz- und selbstreinigendes Isolierglas im Dachbereich",
        "Großflächige Hebe-Schiebetüren für barrierefreie Öffnung",
        "Komplette Montage inklusive fachgerechter Bauanschlussabdichtung",
      ],
      order: 4,
    },
    {
      _id: "service-kunststoff",
      _type: "serviceItem",
      title: "Kunststofffenster (VEKA & GEALAN)",
      subtitle: "Markenprofile mit hohem Schall- und Wärmeschutz",
      category: "bauelemente",
      image: imageAsset(imgGebaeude),
      description:
        "Modernste Mehrkammer-Kunststofffenster führender Profilsysteme wie VEKA und Gealan. Pflegeleicht, hochisolierend und in vielen Dekorfarben erhältlich.",
      features: [
        "Markenprofile VEKA & Gealan",
        "Schallschutzklassen 1 bis 5",
        "RAL-zertifizierte Fachmontage durch unser Team",
      ],
      order: 5,
    },
    {
      _id: "service-innentueren",
      _type: "serviceItem",
      title: "Innentüren & Zargensysteme",
      subtitle: "Echtholz, CPL & Ganzglastüren",
      category: "bauelemente",
      image: imageAsset(imgTuer6),
      description:
        "Von der klassischen Weißlacktür über hochwertige Echtholzfurniere bis hin zu modernen Ganzglastüren und Schiebetürsystemen.",
      features: [
        "CPL-, Furnier- und Massivholztüren",
        "Ganzglastüren mit Edelstahlbeschlägen",
        "Passgenaue Zargenmontage",
      ],
      order: 6,
    },
    {
      _id: "service-garagentore",
      _type: "serviceItem",
      title: "Garagentore & Antriebe",
      subtitle: "Sektional- und Rolltore mit Funksteuerung",
      category: "bauelemente",
      image: imageAsset(imgGebaeude),
      description:
        "Wärmegedämmte Sektionaltore und Rolltore führender Hersteller inklusive leiser Funk-Elektroantriebe.",
      features: [
        "Sektionaltore & Schwingtore",
        "Sicherheits-Abschaltautomatik",
        "Handsender & Smart-Home-Bedienung",
      ],
      order: 7,
    },
    {
      _id: "service-rollladen",
      _type: "serviceItem",
      title: "Beschattungen & Rollladensysteme",
      subtitle: "Sonnen-, Sicht- und Einbruchschutz",
      category: "bauelemente",
      image: imageAsset(imgFensterAlu),
      description:
        "Vorbau- und Aufsatzrollladen, Klappläden und Insektenschutzgitter für zuverlässigen Sonnen-, Sicht- und Einbruchschutz.",
      features: [
        "Aluminium- & Kunststofflamellen",
        "Funk- und Zeitschaltuhrmotorisierung",
        "Integrierbare Insektenschutzrollos",
      ],
      order: 8,
    },
  ];

  for (const s of services) {
    await client.createOrReplace(s);
  }

  // Also remove any lingering drafts for these
  for (const s of services) {
    try {
      await client.delete(`drafts.${s._id}`);
    } catch {}
  }

  console.log("✓ All services updated in Sanity with images and gallery support!");
}

updateServices().catch(console.error);
