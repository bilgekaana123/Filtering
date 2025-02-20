import Search from "@/components/Search";
import { getAllProducts } from "./actions/product-action";
import ProductCard from "@/components/ProductCard";
import SortBy from "@/components/SortBy";
import Link from "next/link";
import Filters from "@/components/Filters";

export default async function Home(props: {
  searchParams?: Promise<{
    query: string;
    sortBy: string;
    color: string;
    size: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortByQ = searchParams?.sortBy || "";
  const colorQ = searchParams?.color || "";
  const sizeQ = searchParams?.size || "";

  const products = await getAllProducts(query, sortByQ, colorQ);

  return (
    <div className="mx-auto p-8 max-w-7xl">
      <div className="flex flex-row items-center justify-between border border-gray-300 rounded-md p-2">
        <Link href="/" className="text-semibold text-3xl ">
          Products
        </Link>
        <Search />
        <SortBy />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12 ">
        {/* Filters */}
        <Filters />
        {products.length === 0 ? (
          <div className="font-bold col-span-2 text-center">
            No products found...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3 gap-4">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
