"use server";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";

export async function getAllProducts() {
  const data = await db.select().from(products);
  return data;
}
