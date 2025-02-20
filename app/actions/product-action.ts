"use server";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { ilike } from "drizzle-orm";

export async function getAllProducts(query?: string) {
  const data = db
    .select()
    .from(products)
    .where(query ? ilike(products.name, `%${query}%`) : undefined);

  return data;
}
