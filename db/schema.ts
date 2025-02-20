import { pgTable, text, uuid, integer, pgEnum } from "drizzle-orm/pg-core";

// export const sizeEnum = pgEnum("size", ["S", "M", "L"]);
// export const colorEnum = pgEnum("color", [
//   "white",
//   "beige",
//   "blue",
//   "green",
//   "purple",
// ]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  imageId: text("image_id").notNull(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  price: integer("price").notNull(),
});
