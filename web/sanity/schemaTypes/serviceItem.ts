import { defineType, defineField } from "sanity";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Leistung / Angebot",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Bezeichnung der Leistung (Pflichtfeld)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "z. B. 'Holzfenster aus eigener Produktion' oder 'Kunststofffenster (VEKA & GEALAN)'",
    }),
    defineField({
      name: "subtitle",
      title: "Dachzeile / Kurzer Untertitel (optional)",
      type: "string",
      description: "z. B. 'Maßanfertigung für Neubau, Altbau & Denkmalschutz'",
    }),
    defineField({
      name: "category",
      title: "Bereich / Zuordnung",
      type: "string",
      options: {
        list: [
          { title: "Eigene Herstellung (Schönheide)", value: "eigenfertigung" },
          { title: "Bauelemente & Fachmontage", value: "bauelemente" },
        ],
        layout: "radio",
      },
      initialValue: "eigenfertigung",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hauptfoto / Vorzeigebild (optional)",
      type: "image",
      options: { hotspot: true },
      description: "Wird sowohl in der Voransicht als auch groß im ausgeklappten Bereich angezeigt.",
    }),
    defineField({
      name: "gallery",
      title: "Weitere Detail- / Baustellenfotos (optional)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      description: "Zusätzliche Fotos, die im ausgeklappten Zustand als Galerie angezeigt werden.",
    }),
    defineField({
      name: "description",
      title: "Ausführliche Beschreibung (optional)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "features",
      title: "Vorteile & Ausstattungsmerkmale (Stichpunkte, optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "z. B. '3-fach Wärmeschutz', 'Sicherheitsbeschlag RC2', 'RAL-Montage'",
    }),
    defineField({
      name: "order",
      title: "Sortier-Reihenfolge (1, 2, 3...)",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      const catMap: Record<string, string> = {
        eigenfertigung: "Eigene Herstellung",
        bauelemente: "Bauelemente & Montage",
      };
      return {
        title,
        subtitle: catMap[subtitle] || subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Reihenfolge aufsteigend",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
