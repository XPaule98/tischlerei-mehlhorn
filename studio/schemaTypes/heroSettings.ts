import { defineType, defineField } from "sanity";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero-Bereich Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Präzision in Holz & moderne Bauelemente seit 1977",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel",
      type: "text",
      rows: 2,
      initialValue:
        "Tischlerei Mehlhorn – Über 45 Jahre Erfahrung. Qualität, die bleibt.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Hintergrundbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundVideoUrl",
      title: "Hintergrundvideo-URL (optional, überschreibt Bild)",
      type: "url",
    }),
  ],
});
