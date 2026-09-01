import { defineType, defineField } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Referenzprojekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Projekttitel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Fenster & Türen", value: "fenster-tueren" },
          { title: "Wintergärten", value: "wintergaerten" },
          { title: "Innenausbau", value: "innenausbau" },
          { title: "Deko & Kleinmöbel", value: "deko" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "beforeImage",
      title: "Vorher-Bild (für Slider)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "afterImage",
      title: "Nachher-Bild (für Slider)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "completedAt",
      title: "Abgeschlossen am",
      type: "date",
    }),
  ],
});
