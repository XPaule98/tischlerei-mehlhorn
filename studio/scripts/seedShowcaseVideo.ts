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

async function seedVideo() {
  console.log("Seeding showcaseVideo document in Sanity...");
  const baseDir = path.resolve(__dirname, "../../web/public/images/real");
  const posterId = await uploadImage(path.join(baseDir, "werkstatt-2.jpg"), "werkstatt-2.jpg");

  await client.createOrReplace({
    _id: "showcaseVideo",
    _type: "showcaseVideo",
    title: "Fullwidth Video Startseite",
    badge: "Handwerkskunst in Schönheide",
    headline: "Vom Rohholz zum maßgefertigten Meisterwerk",
    subheadline: "Präzise Verarbeitung, handwerkliche Perfektion und modernste Profiltechnik in unserer Werkstatt im Erzgebirge.",
    posterImage: posterId
      ? {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: posterId,
          },
        }
      : undefined,
  });

  console.log("✓ showcaseVideo successfully seeded in Sanity!");
}

seedVideo().catch(console.error);
