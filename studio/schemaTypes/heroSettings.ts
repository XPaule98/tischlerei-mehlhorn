import { defineType, defineField } from "sanity";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero-Bereich Startseite",
  type: "document",
  fields: [
    defineField({
      name: "slides",
      title: "Hero Slides (Bilder, Texte & Buttons)",
      type: "array",
      description:
        "Erstellen Sie mehrere Slides mit individuellen Bildern, Texten und Anzeigedauern. Bild und Text überblenden sanft nacheinander.",
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
              name: "craftBadge",
              title: "Badge / Dachzeile",
              type: "string",
              initialValue: "Meisterbetrieb seit 1977 · Schönheide",
            }),
            defineField({
              name: "title",
              title: "Hauptüberschrift",
              type: "string",
              validation: (rule) => rule.required(),
              initialValue: "Präzision in Holz. Beständigkeit für Generationen.",
            }),
            defineField({
              name: "subtitle",
              title: "Untertitel / Beschreibung",
              type: "text",
              rows: 2,
              initialValue:
                "Eigene Herstellung von Holzfenstern, Holz-Alu-Systemen (Gutmann Mira), Haustüren und Wintergärten.",
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
              title: "Zweiter Button Text (optional)",
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
              name: "durationSeconds",
              title: "Anzeigedauer in Sekunden (z. B. 6 bis 10)",
              type: "number",
              initialValue: 6,
              validation: (rule) => rule.min(3).max(20),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
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
