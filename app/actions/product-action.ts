"use server";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { ilike, asc, desc } from "drizzle-orm";

export async function getAllProducts(query?: string, sortBy?: string) {
  // Query
  const queryBuild = db
    .select()
    .from(products)
    .where(query ? ilike(products.name, `%${query}%`) : undefined);

  // Apply Sorting
  if (sortBy === "price-asc") {
    queryBuild?.orderBy(asc(products.price));
  } else if (sortBy === "price-desc") {
    queryBuild?.orderBy(desc(products.price));
  }

  const data = await queryBuild;

  return data;
}
