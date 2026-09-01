import { getCliClient } from "sanity/cli";
import * as fs from "fs";
import * as path from "path";

const client = getCliClient();

async function uploadImage(filePath: string, filename: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  try {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename,
    });
    console.log(`✓ Uploaded ${filename} -> ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error);
    return null;
  }
}

async function updateHero() {
  console.log("Uploading high-res master hero images...");
  const baseDir = path.resolve(__dirname, "../../web/public/images");

  const heroBg = await uploadImage(path.join(baseDir, "hero-bg.jpg"), "hero-bg.jpg");
  const fenster = await uploadImage(path.join(baseDir, "service-fenster.jpg"), "service-fenster.jpg");
  const tuer = await uploadImage(path.join(baseDir, "service-tuer.jpg"), "service-tuer.jpg");
  const wintergarten = await uploadImage(path.join(baseDir, "service-wintergarten.jpg"), "service-wintergarten.jpg");

  function imageAsset(id: string | null) {
    if (!id) return undefined;
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: id,
      },
    };
  }

  const images = [
    imageAsset(heroBg),
    imageAsset(fenster),
    imageAsset(tuer),
    imageAsset(wintergarten),
  ].filter(Boolean);

  await client.createOrReplace({
    _id: "heroSettings",
    _type: "heroSettings",
    title: "Präzision in Holz. Beständigkeit für Generationen.",
    subtitle:
      "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.",
    primaryButtonText: "Leistungen entdecken",
    primaryButtonLink: "/leistungen",
    secondaryButtonText: "Unverbindlich anfragen",
    secondaryButtonLink: "/kontakt",
    images,
  });

  console.log("✓ Successfully updated heroSettings with high-res master landscape images and static text!");
}

updateHero().catch(console.error);
