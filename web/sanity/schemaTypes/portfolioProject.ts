import { defineType, defineField } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Galerie & Baustellen-Projekte",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Projekt-Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "z. B. 'Historische Holzfenster Villa Schönheide' oder 'Wintergarten Montage'",
    }),
    defineField({
      name: "category",
      title: "Kategorie / Zuordnung",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Eigene Produktion", value: "produktion" },
          { title: "Montage & Baustellen", value: "montage" },
          { title: "Großprojekte & Referenzen", value: "projekte" },
          { title: "Erfolge & Werkstatt", value: "erfolge" },
        ],
      },
    }),
    defineField({
      name: "mainImage",
      title: "Hauptfoto / Vorschaubild",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Weitere Baustellen- / Detailfotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Kurze Beschreibung (optional)",
      type: "text",
      rows: 2,
      description: "Optionale kurze Erklärung zum Projekt / Werkstück",
    }),
    defineField({
      name: "featured",
      title: "Als Highlight hervorheben (breitere Darstellung im Raster)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      const catMap: Record<string, string> = {
        produktion: "Eigene Produktion",
        montage: "Montage & Baustellen",
        projekte: "Großprojekt / Referenz",
        erfolge: "Erfolg & Werkstatt",
      };
      return {
        title,
        subtitle: catMap[subtitle] || subtitle,
        media,
      };
    },
  },
});
