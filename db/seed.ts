import { db } from "./drizzle";
import sampleData from "./sample-data";
import { products } from "./schema";

async function main() {
  // Clear existing products
  await db.delete(products).execute();

  // Insert new products
  await db.insert(products).values(sampleData.products); // Remove `{ data: ... }`

  console.log("Database seeded successfully!");
}

main().catch((error) => {
  console.error("Error seeding database:", error);
});
