import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "z3grtien",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token:
    "skq2a2gUoFw4w8K4q8B0g4V0b4C4g0T0k2a2gUoFw4w8K4q8B0g4V0b4C4g0T0k2", // Read/write token or write if set
});

export const initialCompanyInfo = {
  _id: "companyInfo",
  _type: "companyInfo",
  companyName: "Tischlerei Ronny Mehlhorn",
  owner: "Ronny Mehlhorn (Tischlermeister)",
  phone: "037755 / 2346",
  email: "tischlerei.mehlhorn@t-online.de",
  street: "Neuheider Straße 64 b",
  zipCity: "08304 Schönheide (Erzgebirge)",
  hoursWeekdays: "Mo. – Fr.: 07:00 – 17:00 Uhr",
  hoursSaturday: "Samstag: Nach telefonischer Vereinbarung",
};

export const initialHeroSettings = {
  _id: "heroSettings",
  _type: "heroSettings",
  craftBadge: "Meisterbetrieb seit 1977 · Inh. Ronny Mehlhorn · Schönheide",
  title: "Präzision in Holz. Beständigkeit für Generationen.",
  subtitle:
    "Eigene Herstellung von Holz- und Holz-Aluminium-Fenstern (Gutmann Mira), Haustüren und Wintergärten in Schönheide (Erzgebirge).",
};

export const initialAboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  headline: "Tradition, Meisterhandwerk & moderner Bauelementebau",
  introText:
    "Seit 1977 steht der Name Mehlhorn in Schönheide für solide handwerkliche Qualitätsarbeit aus dem Erzgebirge. 1992 entstand das heutige Firmengebäude in der Neuheider Straße 64 b. Heute führt Tischlermeister Ronny Mehlhorn den Betrieb mit modernster Fertigungstechnik.",
  milestones: [
    {
      year: "1977",
      title: "Gründung durch Roland Mehlhorn",
      description: "Beginn der selbstständigen handwerklichen Tätigkeit mit Gestellbau in Schönheide.",
    },
    {
      year: "1992",
      title: "Neubau Firmengebäude Neuheider Straße",
      description: "Errichtung der modernen Produktionshalle und Erweiterung um den professionellen Fenster- und Türenbau.",
    },
    {
      year: "2012",
      title: "Übergabe an Tischlermeister Ronny Mehlhorn",
      description: "Übernahme durch Sohn Ronny Mehlhorn und Einführung innovativer Holz-Alu-Profilsysteme.",
    },
    {
      year: "Heute",
      title: "Meisterbetrieb für anspruchsvolle Bauherren",
      description: "Eigene Herstellung und fachgerechte Vor-Ort-Montage im gesamten Erzgebirge und Vogtland.",
    },
  ],
};
