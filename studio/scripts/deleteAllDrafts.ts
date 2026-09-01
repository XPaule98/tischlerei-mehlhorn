import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function removeDrafts() {
  console.log("Removing all drafts...");
  const drafts = await client.fetch<string[]>('*[_id in path("drafts.**")]._id');
  console.log(`Found ${drafts.length} drafts to remove:`, drafts);

  for (const id of drafts) {
    await client.delete(id);
    console.log(`✓ Deleted draft: ${id}`);
  }

  console.log("✨ All drafts removed! Studio will now show published data directly!");
}

removeDrafts().catch(console.error);
