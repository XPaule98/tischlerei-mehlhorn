import { defineType, defineField } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Produkt-Kategorie (Shop)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kategorie-Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "z. B. 'Schneidebretter', 'Wandregale & Borde', 'Wohnaccessoires'",
    }),
    defineField({
      name: "slug",
      title: "URL-Kürzel / ID",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sortier-Reihenfolge",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "order",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle !== undefined ? `Reihenfolge: ${subtitle}` : undefined,
      };
    },
  },
  orderings: [
    {
      title: "Reihenfolge aufsteigend",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
