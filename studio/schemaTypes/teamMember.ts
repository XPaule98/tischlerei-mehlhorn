import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team / Mitarbeiter",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Ronny Mehlhorn",
    }),
    defineField({
      name: "role",
      title: "Funktion / Rolle",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Inhaber & Tischlermeister", value: "Inhaber & Tischlermeister" },
          { title: "Tischlermeister", value: "Tischlermeister" },
          { title: "Tischlergeselle", value: "Tischlergeselle" },
          { title: "Auszubildender", value: "Auszubildender" },
          { title: "Büro & Organisation", value: "Büro & Organisation" },
          { title: "Werkstatthund", value: "Werkstatthund" },
          { title: "Firmengründer & Senior", value: "Firmengründer & Senior" },
        ],
      },
      initialValue: "Inhaber & Tischlermeister",
    }),
    defineField({
      name: "image",
      title: "Porträtfoto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Kurzbeschreibung / Spezialgebiet",
      type: "text",
      rows: 3,
      description: "z. B. 'Zuständig für Kundenberatung, Arbeitsvorbereitung und Fertigung der Holz-Alu-Systeme.'",
    }),
    defineField({
      name: "since",
      title: "Im Betrieb seit (optional)",
      type: "string",
      description: "z. B. '1995' oder '2012'",
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
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
