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
      name: "location",
      title: "Ort / Region (optional)",
      type: "string",
      description: "z. B. 'Schönheide', 'Aue', 'Vogtland'",
      initialValue: "Schönheide (Erzgebirge)",
    }),
    defineField({
      name: "year",
      title: "Jahr / Zeitraum (optional)",
      type: "string",
      initialValue: "2024",
    }),
    defineField({
      name: "description",
      title: "Projektbeschreibung / Ausgeführte Arbeiten",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "scope",
      title: "Leistungsumfang (Stichpunkte)",
      type: "array",
      of: [{ type: "string" }],
      description: "z. B. '12 Holz-Aluminium-Fenster', '1 zweiflügelige Haustür', 'RAL-Montage'",
    }),
    defineField({
      name: "featured",
      title: "Als Großprojekt hervorheben (breitere Darstellung im Raster)",
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
