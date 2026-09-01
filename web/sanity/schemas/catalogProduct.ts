import { defineType, defineField } from "sanity";

export const catalogProduct = defineType({
  name: "catalogProduct",
  title: "Katalog-Produkt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Produktname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "dimensions",
      title: "Maße (z.B. 40 x 30 x 4 cm)",
      type: "string",
    }),
    defineField({
      name: "woodType",
      title: "Holzart (z.B. Eiche massiv)",
      type: "string",
      options: {
        list: [
          { title: "Eiche massiv", value: "eiche-massiv" },
          { title: "Buche massiv", value: "buche-massiv" },
          { title: "Kiefer massiv", value: "kiefer-massiv" },
          { title: "Nussbaum massiv", value: "nussbaum-massiv" },
          { title: "Ahorn massiv", value: "ahorn-massiv" },
          { title: "Diverse Hölzer", value: "diverse" },
        ],
      },
    }),
    defineField({
      name: "price",
      title: "Preis (€, inkl. MwSt.)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "available",
      title: "Verfügbar / Auf Lager",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "images",
      title: "Produktbilder",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "glbFile",
      title: "3D-Modell (.glb Datei, optional)",
      type: "file",
      options: {
        accept: ".glb,.gltf",
      },
    }),
  ],
});
