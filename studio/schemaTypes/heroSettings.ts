import { defineType, defineField } from "sanity";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero-Bereich Startseite",
  type: "document",
  fields: [
    defineField({
      name: "craftBadge",
      title: "Badge über Überschrift",
      type: "string",
      initialValue: "Meisterbetrieb seit 1977 · Inh. Ronny Mehlhorn",
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift (groß)",
      type: "string",
      initialValue: "Präzision in Holz. Beständigkeit für Generationen.",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel",
      type: "text",
      rows: 2,
      initialValue:
        "Eigene Herstellung von Fenstern, Haustüren und Wintergärten sowie fachgerechte Montage geprüfter Marken-Bauelemente.",
    }),
    defineField({
      name: "backgroundImages",
      title: "Hintergrund-Bilder (Slideshow mit weichem Fade)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      description:
        "Laden Sie mehrere Bilder hoch – sie überblenden auf der Startseite automatisch sanft nacheinander.",
    }),
    defineField({
      name: "backgroundVideoUrl",
      title: "Hintergrund-Video URL (optional, überschreibt Bilder)",
      type: "url",
      description: "Direkter Link zu einer .mp4 / .webm Videodatei.",
    }),
  ],
});
