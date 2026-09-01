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
      name: "experienceYears",
      title: "Jahre Erfahrung (z.B. 45+)",
      type: "string",
      initialValue: "45+",
    }),
    defineField({
      name: "foundationYear",
      title: "Gründungsjahr (z.B. 1977)",
      type: "string",
      initialValue: "1977",
    }),
    defineField({
      name: "qualityStatement",
      title: "Qualitäts-Aussage (z.B. 100% Meisterqualität)",
      type: "string",
      initialValue: "100%",
    }),
    defineField({
      name: "backgroundImage",
      title: "Hintergrundbild",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
