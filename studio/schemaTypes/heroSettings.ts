import { defineType, defineField } from "sanity";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero-Bereich Startseite",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Präzision in Holz. Beständigkeit für Generationen.",
      description: "Feste, ruhige Hauptüberschrift der Startseite.",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel / Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.",
    }),
    defineField({
      name: "primaryButtonText",
      title: "Haupt-Button Text (optional)",
      type: "string",
      initialValue: "Leistungen entdecken",
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Haupt-Button Link (optional)",
      type: "string",
      initialValue: "/leistungen",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "Zweiter Button Text (optional)",
      type: "string",
      initialValue: "Unverbindlich anfragen",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Zweiter Button Link (optional)",
      type: "string",
      initialValue: "/kontakt",
    }),
    defineField({
      name: "images",
      title: "Hintergrund-Bilder (Slideshow)",
      type: "array",
      description: "Laden Sie hier hochauflösende Querformat-Fotos für den sanften Hintergrundwechsel hoch.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "backgroundVideoUrl",
      title: "Hintergrund-Video URL (optional)",
      type: "url",
      description: "Direkter Link zu einer .mp4 / .webm Videodatei (überschreibt die Slideshow).",
    }),
  ],
});
