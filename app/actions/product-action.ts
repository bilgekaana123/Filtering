"use server";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { ilike, asc, desc, inArray } from "drizzle-orm";

export async function getAllProducts(
  query?: string,
  sortBy?: string,
  color?: string,
) {
  // Base query
  const queryBuild = db.select().from(products);

  // Apply Name Filtering
  if (query) {
    queryBuild.where(ilike(products.name, `%${query}%`));
  }

  // Apply Price-Sorting
  if (sortBy === "price-asc") {
    queryBuild.orderBy(asc(products.price));
  } else if (sortBy === "price-desc") {
    queryBuild.orderBy(desc(products.price));
  }

  // Apply Color Filtering
  if (color) {
    const colorsArray = color.split(",");
    queryBuild.where(inArray(products.color, colorsArray));
  }

  const data = await queryBuild;

  return data;
}
