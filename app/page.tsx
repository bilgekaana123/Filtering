import Search from "@/components/Search";
import { getAllProducts } from "./actions/product-action";
import ProductCard from "@/components/ProductCard";
import SortBy from "@/components/SortBy";
import Link from "next/link";
import Filters from "@/components/Filters";
import MobileFilters from "@/components/MobileFilters";
import { XCircle } from "lucide-react";
import { Suspense } from "react";
import ProductSkeleton from "@/components/ProductSkeleton";

export default async function Home(props: {
  searchParams?: Promise<{
    query: string;
    sortBy: string;
    color: string;
    size: string;
    price: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortByQ = searchParams?.sortBy || "";
  const colorQ = searchParams?.color || "";
  const sizeQ = searchParams?.size || "";
  const priceQ = searchParams?.price || "";

  const products = await getAllProducts(query, sortByQ, colorQ, sizeQ, priceQ);

  return (
    <div className="mx-auto py-8 px-16 max-w-7xl xl:max-w-[120rem]">
      <div className="flex flex-row items-center justify-between rounded-md p-2">
        <Link
          href="/"
          className="hidden md:block text-semibold text-3xl font-light"
        >
          HOME
        </Link>
        <Search />
        <div className="flex items-center">
          <MobileFilters />
          <SortBy />
        </div>
      </div>
      <div className="flex gap-8 mt-12 ">
        {/* Filters */}
        <Filters />
        {products.length === 0 ? (
          <div className="relative col-span-full h-80 w-full p-12 flex flex-col items-center justify-center">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="font-semibold text-xl">No products found</h3>
            <p className="text-zinc-500 text-sm">
              We found no search results for these filters.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 lg:col-span-3 gap-4">
            {products.map((product) => (
              <div key={product.id}>
                <Suspense fallback={<ProductSkeleton />}>
                  <ProductCard product={product} key={product.id} />
                </Suspense>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
