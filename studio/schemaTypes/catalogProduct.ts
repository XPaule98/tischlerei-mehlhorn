import { defineType, defineField } from "sanity";

export const catalogProduct = defineType({
  name: "catalogProduct",
  title: "Shop-Produkt / Dekoartikel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Produktname (Pflichtfeld)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "z. B. 'Schneidebrett Hirnholz XL' oder 'Schwebendes Wandregal Eiche'",
    }),
    defineField({
      name: "price",
      title: "Preis (€ inkl. MwSt., Pflichtfeld)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "z. B. 89.00",
    }),
    defineField({
      name: "categoryRef",
      title: "Kategorie (Auswahl aus Shop-Kategorien)",
      type: "reference",
      to: [{ type: "productCategory" }],
      description: "Wählen Sie eine der im Studio angelegten Kategorien aus.",
    }),
    defineField({
      name: "category",
      title: "Kategorie manuell (optional)",
      type: "string",
      description: "Alternative manuelle Eingabe, falls keine Kategorie ausgewählt wurde.",
    }),
    defineField({
      name: "images",
      title: "Produktbilder (mindestens 1 Bild empfohlen)",
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
      title: "Beschreibung (optional)",
      type: "text",
      rows: 3,
      description: "Ausführlicher Beschreibungstext zum Werkstück.",
    }),
    defineField({
      name: "dimensions",
      title: "Maße (optional, z. B. 40 × 30 × 5 cm)",
      type: "string",
    }),
    defineField({
      name: "woodType",
      title: "Holzart / Material (optional, z. B. Eiche massiv)",
      type: "string",
    }),
    defineField({
      name: "available",
      title: "Verfügbar / Sofort lieferbar",
      type: "boolean",
      initialValue: true,
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
  preview: {
    select: {
      title: "title",
      price: "price",
      media: "images.0",
    },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: price !== undefined ? `${Number(price).toFixed(2).replace(".", ",")} €` : "Kein Preis",
        media,
      };
    },
  },
});
