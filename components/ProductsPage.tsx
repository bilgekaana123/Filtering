import React from "react";
import { getAllProducts } from "@/app/actions/product-action";
import ProductCard from "./ProductCard";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12 ">
      {/* Filters */}
      <div>Filters Component</div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3 gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
