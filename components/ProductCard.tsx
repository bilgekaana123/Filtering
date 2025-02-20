import Image from "next/image";

type ProductCardProps = {
  product: {
    id: string;
    imageId: string;
    name: string;
    size: string;
    color: string;
    price: number;
  };
};

export default async function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <div
        key={product.id}
        className="flex flex-col items-center w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75"
      >
        <Image
          src={product.imageId}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </div>
        <p className="text-sm font-medium">{product.price}</p>
      </div>
    </div>
  );
}
