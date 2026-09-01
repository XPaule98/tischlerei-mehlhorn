import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function seedCats() {
  console.log("Seeding product categories in Sanity...");

  const cat1 = {
    _id: "cat-schneidebretter",
    _type: "productCategory",
    title: "Schneidebretter",
    slug: { _type: "slug", current: "schneidebretter" },
    order: 1,
  };

  const cat2 = {
    _id: "cat-regale",
    _type: "productCategory",
    title: "Wandregale & Borde",
    slug: { _type: "slug", current: "regale" },
    order: 2,
  };

  const cat3 = {
    _id: "cat-deko",
    _type: "productCategory",
    title: "Wohnaccessoires & Deko",
    slug: { _type: "slug", current: "deko" },
    order: 3,
  };

  await client.createOrReplace(cat1);
  await client.createOrReplace(cat2);
  await client.createOrReplace(cat3);

  // Link existing products
  const products = [
    { id: "prod-schneidebrett-xl", catRef: "cat-schneidebretter" },
    { id: "prod-wandregal-eiche", catRef: "cat-regale" },
    { id: "prod-schneidebrett-streifen", catRef: "cat-schneidebretter" },
    { id: "prod-servierbrett", catRef: "cat-schneidebretter" },
  ];

  for (const p of products) {
    try {
      await client
        .patch(p.id)
        .set({
          categoryRef: {
            _type: "reference",
            _ref: p.catRef,
          },
        })
        .commit();
      console.log(`✓ Linked ${p.id} to ${p.catRef}`);
    } catch (e) {
      console.warn(`Could not patch ${p.id}:`, e);
    }
  }

  console.log("✨ Product categories successfully seeded and linked in Sanity!");
}

seedCats().catch(console.error);
