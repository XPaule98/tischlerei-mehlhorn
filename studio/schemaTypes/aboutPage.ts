import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Über uns & Historie",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge / Dachzeile",
      type: "string",
      initialValue: "Familienbetrieb im Erzgebirge seit 1977",
    }),
    defineField({
      name: "headline",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Tradition, Meisterhandwerk & moderner Bauelementebau",
    }),
    defineField({
      name: "introText",
      title: "Einleitungstext",
      type: "text",
      rows: 4,
      initialValue:
        "Gegründet 1977 durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße 64 b, heute mit meisterhafter Präzision geführt durch Tischlermeister Ronny Mehlhorn.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Hintergrundbild für den Kopfbereich der Über-uns-Seite.",
    }),
    defineField({
      name: "milestones",
      title: "Meilensteine / Historie",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Jahr", type: "string" },
            { name: "title", title: "Titel", type: "string" },
            { name: "description", title: "Beschreibung", type: "text", rows: 2 },
          ],
        },
      ],
    }),
  ],
});
