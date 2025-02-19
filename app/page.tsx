import Filtering from "@/components/Filtering";
import ProductsPage from "@/components/ProductsPage";

export default async function Home() {
  return (
    <div className="mx-auto p-8 max-w-7xl">
      <div className="flex flex-row justify-between border border-gray-300 rounded-md p-2">
        <h1 className="text-semibold text-3xl ">Products</h1>
        <Filtering />
      </div>
      <ProductsPage />
    </div>
  );
}
