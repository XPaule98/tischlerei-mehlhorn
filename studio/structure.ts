import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tischlerei Mehlhorn")
    .items([
      // Singletons
      S.listItem()
        .title("🖼️ Hero-Bereich (Startseite)")
        .id("heroSettings")
        .child(
          S.document()
            .schemaType("heroSettings")
            .documentId("heroSettings")
            .title("Hero-Bereich bearbeiten")
        ),

      S.listItem()
        .title("🏢 Firmendaten & Öffnungszeiten")
        .id("companyInfo")
        .child(
          S.document()
            .schemaType("companyInfo")
            .documentId("companyInfo")
            .title("Firmendaten bearbeiten")
        ),

      S.listItem()
        .title("📖 Über uns & Historie")
        .id("aboutPage")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("Über uns bearbeiten")
        ),

      S.divider(),

      // Lists
      S.documentTypeListItem("serviceItem").title("🪵 Leistungen & Gewerke"),
      S.documentTypeListItem("catalogProduct").title("🛍️ Deko-Katalog (Shop)"),
      S.documentTypeListItem("portfolioProject").title("📸 Referenzprojekte"),
    ]);
