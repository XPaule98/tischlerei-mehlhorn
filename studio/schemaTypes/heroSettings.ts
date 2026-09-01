import { defineType, defineField } from "sanity";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero-Bereich Startseite",
  type: "document",
  fields: [
    defineField({
      name: "craftBadge",
      title: "Standard Dachzeile / Badge",
      type: "string",
      initialValue: "Meisterbetrieb seit 1977 · Schönheide (Erzgebirge)",
      description: "Bleibt fest stehen, wenn in den einzelnen Slides kein abweichender Text eingetragen ist.",
    }),
    defineField({
      name: "title",
      title: "Standard Hauptüberschrift",
      type: "string",
      initialValue: "Präzision in Holz. Beständigkeit für Generationen.",
      description: "Fester Haupttext auf der Startseite.",
    }),
    defineField({
      name: "subtitle",
      title: "Standard Untertitel / Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.",
    }),
    defineField({
      name: "primaryButtonText",
      title: "Haupt-Button Text",
      type: "string",
      initialValue: "Leistungen entdecken",
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Haupt-Button Link",
      type: "string",
      initialValue: "/leistungen",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "Zweiter Button Text",
      type: "string",
      initialValue: "Unverbindlich anfragen",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Zweiter Button Link",
      type: "string",
      initialValue: "/kontakt",
    }),
    defineField({
      name: "slides",
      title: "Hintergrund-Bilder & optionale Slide-Texte",
      type: "array",
      description:
        "Laden Sie hier Bilder für den sanften Hintergrundwechsel hoch. Lassen Sie Textfelder leer, damit die Standard-Texte ruhig stehen bleiben.",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Slide",
          fields: [
            defineField({
              name: "image",
              title: "Hintergrundbild",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "customTitle",
              title: "Eigener Titel für dieses Bild (optional)",
              type: "string",
              description: "Leer lassen, um den Standard-Titel ruhig stehen zu lassen.",
            }),
            defineField({
              name: "customSubtitle",
              title: "Eigener Untertitel für dieses Bild (optional)",
              type: "text",
              rows: 2,
              description: "Leer lassen, um den Standard-Untertitel ruhig stehen zu lassen.",
            }),
          ],
          preview: {
            select: {
              title: "customTitle",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Standard-Text (bleibt ruhig stehen)",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "backgroundVideoUrl",
      title: "Hintergrund-Video URL (optional, überschreibt Slideshow)",
      type: "url",
      description: "Direkter Link zu einer .mp4 / .webm Videodatei.",
    }),
  ],
});
