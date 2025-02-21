"use server";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { ilike, asc, desc, inArray, and, SQL, gt, lte } from "drizzle-orm";

export async function getAllProducts(
  query?: string,
  sortBy?: string,
  color?: string,
  size?: string,
  price?: string,
) {
  const conditions: SQL[] = [];

  // Name search
  if (query) {
    conditions.push(ilike(products.name, `%${query}%`));
  }

  // Color filter
  if (color) {
    const colorArray = color.split(",");
    conditions.push(inArray(products.color, colorArray));
  }

  // Size filter
  if (size) {
    const sizeArray = size.split(",");
    conditions.push(inArray(products.size, sizeArray));
  }

  // Price filter
  if (price) {
    let priceCondition: SQL | undefined;
    if (price === "0-20") {
      priceCondition = and(gt(products.price, 0), lte(products.price, 20));
    } else if (price === "0-50") {
      priceCondition = and(gt(products.price, 0), lte(products.price, 50));
    } else if (price === "0-100") {
      priceCondition = and(gt(products.price, 0), lte(products.price, 100));
    }
    if (priceCondition) {
      conditions.push(priceCondition);
    }
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
