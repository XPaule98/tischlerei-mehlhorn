import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function inspectAndFixDrafts() {
  console.log("Checking all documents and drafts in dataset...");
  const docs = await client.fetch(`*[_type in ["aboutPage", "heroSettings", "servicesPage", "galleryPage", "shopPage", "contactPage", "companyInfo", "showcaseVideo", "serviceItem", "catalogProduct", "portfolioProject", "teamMember"]] {
    _id,
    _type,
    title,
    headline,
    companyName
  }`);

  console.log("Found documents:", docs.map((d: any) => `${d._id} (${d._type})`));

  // Find all drafts
  const drafts = docs.filter((d: any) => d._id.startsWith("drafts."));
  console.log("Drafts found:", drafts.map((d: any) => d._id));

  // If a draft exists, let's delete the draft or overwrite it with the published document
  for (const draft of drafts) {
    const publishedId = draft._id.replace("drafts.", "");
    const publishedDoc = await client.getDocument(publishedId);
    if (publishedDoc) {
      console.log(`Overwriting draft ${draft._id} with published content from ${publishedId}...`);
      const syncedDraft = { ...publishedDoc, _id: draft._id };
      await client.createOrReplace(syncedDraft);
      console.log(`✓ Synced ${draft._id}`);
    } else {
      console.log(`Deleting orphan draft ${draft._id}...`);
      await client.delete(draft._id);
    }
  }

  console.log("✨ All drafts are now completely synchronized with published data!");
}

inspectAndFixDrafts().catch(console.error);
