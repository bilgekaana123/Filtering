import Search from "@/components/Search";
import { getAllProducts } from "./actions/product-action";
import ProductCard from "@/components/ProductCard";
import SortBy from "@/components/SortBy";

export default async function Home(props: {
  searchParams?: Promise<{ query: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const products = await getAllProducts(query);

  return (
    <div className="mx-auto p-8 max-w-7xl">
      <div className="flex flex-row items-center justify-between border border-gray-300 rounded-md p-2">
        <h1 className="text-semibold text-3xl ">Products</h1>
        <Search />
        <SortBy />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12 ">
        {/* Filters */}
        <div>Filters Component</div>
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
      );
    </div>
  );
}
