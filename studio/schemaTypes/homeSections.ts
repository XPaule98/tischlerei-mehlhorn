import { defineType, defineField } from "sanity";

export const homeSections = defineType({
  name: "homeSections",
  title: "Startseite Inhalte & Vorschau-Bereiche",
  type: "document",
  groups: [
    { name: "story", title: "1. Über uns (Story & 3 Fakten)" },
    { name: "services", title: "2. Leistungen-Vorschau" },
    { name: "shop", title: "3. Shop-Vorschau" },
  ],
  fields: [
    // ==========================================
    // 1. ÜBER UNS VORSCHAU (STORY & 3 FAKTEN)
    // ==========================================
    defineField({
      name: "storyEyebrow",
      title: "Kleine Dachzeile über der Überschrift",
      type: "string",
      group: "story",
      initialValue: "Handwerk aus Schönheide seit 1977",
    }),
    defineField({
      name: "storyHeadline",
      title: "Hauptüberschrift (Über uns)",
      type: "string",
      group: "story",
      initialValue: "Präzision aus Erfahrung. Leidenschaft für Holz.",
    }),
    defineField({
      name: "storyParagraph1",
      title: "Fließtext Absatz 1",
      type: "text",
      rows: 3,
      group: "story",
      initialValue:
        "Was 1977 durch Roland Mehlhorn als traditioneller Gestellbau begann, hat sich über Jahrzehnte zu einem geschätzten Meisterbetrieb für anspruchsvolle Architektenhäuser und private Bauherren entwickelt.",
    }),
    defineField({
      name: "storyParagraph2",
      title: "Fließtext Absatz 2",
      type: "text",
      rows: 3,
      group: "story",
      initialValue:
        "Seit 2012 führt Tischlermeister Ronny Mehlhorn die Tischlerei in der Neuheider Straße 64 b mit moderner Fertigungstechnik, fundiertem Fachwissen und dem Anspruch, langlebige Werte aus Holz zu schaffen.",
    }),

    // Die 3 Fakten / Zahlen
    defineField({
      name: "stat1Value",
      title: "Fakt 1: Zahl / Wert",
      type: "string",
      group: "story",
      initialValue: "45+",
      description: "z. B. '45+'",
    }),
    defineField({
      name: "stat1Label",
      title: "Fakt 1: Beschriftung",
      type: "string",
      group: "story",
      initialValue: "Jahre Erfahrung",
      description: "z. B. 'JAHRE ERFAHRUNG'",
    }),

    defineField({
      name: "stat2Value",
      title: "Fakt 2: Zahl / Wert",
      type: "string",
      group: "story",
      initialValue: "1992",
      description: "z. B. '1992'",
    }),
    defineField({
      name: "stat2Label",
      title: "Fakt 2: Beschriftung",
      type: "string",
      group: "story",
      initialValue: "Neubau Werkstatt",
      description: "z. B. 'NEUBAU WERKSTATT'",
    }),

    defineField({
      name: "stat3Value",
      title: "Fakt 3: Zahl / Wert",
      type: "string",
      group: "story",
      initialValue: "100%",
      description: "z. B. '100%'",
    }),
    defineField({
      name: "stat3Label",
      title: "Fakt 3: Beschriftung",
      type: "string",
      group: "story",
      initialValue: "Eigene Fertigung",
      description: "z. B. 'EIGENE FERTIGUNG'",
    }),

    // Foto rechts & Bildunterschrift
    defineField({
      name: "storyImage",
      title: "Foto rechts neben der Geschichte",
      type: "image",
      options: { hotspot: true },
      group: "story",
      description: "Laden Sie hier ein neues Foto hoch (z. B. Werkstatt, Team, Anhänger).",
    }),
    defineField({
      name: "storyImageCaption",
      title: "Bildunterschrift / schwarzer Banner auf dem Foto",
      type: "string",
      group: "story",
      initialValue: "Werkstatt Schönheide (Erzgebirge) · Eigene Herstellung in der Neuheider Straße 64 b",
    }),
    defineField({
      name: "storyButtonText",
      title: "Button-Text (Link zu 'Über uns')",
      type: "string",
      group: "story",
      initialValue: "Werkstatt & Geschichte",
    }),

    // ==========================================
    // 2. LEISTUNGEN VORSCHAU (KERNKOMPETENZEN)
    // ==========================================
    defineField({
      name: "servicesEyebrow",
      title: "Dachzeile (Leistungen)",
      type: "string",
      group: "services",
      initialValue: "Leistungsspektrum",
    }),
    defineField({
      name: "servicesHeadline",
      title: "Hauptüberschrift (Leistungen)",
      type: "string",
      group: "services",
      initialValue: "Handwerkliche Kernkompetenzen",
    }),
    defineField({
      name: "customServices",
      title: "Gezielte Leistungen für die Startseite (optional)",
      description:
        "Wählen Sie hier bestimmte Leistungen aus der 'Gewerke-Liste' aus. Wenn Sie dieses Feld leer lassen, werden die Standard-Gewerke angezeigt.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "serviceItem" }] }],
      group: "services",
    }),

    // ==========================================
    // 3. SHOP / DEKO VORSCHAU
    // ==========================================
    defineField({
      name: "shopEyebrow",
      title: "Dachzeile (Shop)",
      type: "string",
      group: "shop",
      initialValue: "Aus unserer Werkstatt",
    }),
    defineField({
      name: "shopHeadline",
      title: "Hauptüberschrift (Shop)",
      type: "string",
      group: "shop",
      initialValue: "Handgefertigte Werkstücke & Deko",
    }),
    defineField({
      name: "shopSubtitle",
      title: "Untertitel (Shop)",
      type: "string",
      group: "shop",
      initialValue: "Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche.",
    }),
    defineField({
      name: "featuredProducts",
      title: "Produkte für die Startseite auswählen (bis zu 3 Stück)",
      description:
        "Wählen Sie hier die 3 Werkstücke aus dem Shop aus, die auf der Startseite gezeigt werden sollen. Wenn leer, werden automatisch die neuesten Shop-Produkte angezeigt.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "catalogProduct" }] }],
      group: "shop",
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Startseite: Inhalte & Vorschau-Abschnitte",
        subtitle: "Über uns, 3 Zahlen, Leistungen & Shop-Produkte",
      };
    },
  },
});
