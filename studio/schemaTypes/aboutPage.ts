import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Über uns Seite & Historie",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Holzhandwerk mit Leidenschaft – seit über 45 Jahren.",
    }),
    defineField({
      name: "introText",
      title: "Einleitungstext",
      type: "text",
      rows: 3,
      initialValue:
        "Gegründet 1977 durch Roland Mehlhorn, heute mit meisterhafter Präzision geführt durch Tischlermeister Ronny Mehlhorn.",
    }),
    defineField({
      name: "storyText",
      title: "Ausführliche Firmengeschichte",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "milestones",
      title: "Historie & Zeitstrahl Meilensteine",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Jahr", type: "string" }),
            defineField({ name: "tagline", title: "Untertitel (z.B. Die Gründung)", type: "string" }),
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "description", title: "Beschreibung", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
});
