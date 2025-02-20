"use server";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { ilike, asc, desc, inArray, and, SQL } from "drizzle-orm";

export async function getAllProducts(
  query?: string,
  sortBy?: string,
  color?: string,
  size?: string,
) {
  const conditions: SQL[] = [];

  // Add name search condition
  if (query) {
    conditions.push(ilike(products.name, `%${query}%`));
  }

  // Add color filter condition
  if (color) {
    const colorArray = color.split(",");
    conditions.push(inArray(products.color, colorArray));
  }

  // Add size filter condition
  if (size) {
    const sizeArray = size.split(",");
    conditions.push(inArray(products.size, sizeArray));
  }

  const baseQuery = db.select().from(products);

  const queryWithConditions =
    conditions.length > 0 ? baseQuery.where(and(...conditions)) : baseQuery;

  // Apply sorting
  const finalQuery =
    sortBy === "price-asc"
      ? queryWithConditions.orderBy(asc(products.price))
      : sortBy === "price-desc"
        ? queryWithConditions.orderBy(desc(products.price))
        : queryWithConditions;

  const data = await finalQuery;
  return data;
}
