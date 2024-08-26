"use client";
import { useRouter } from "next/navigation";
import React from "react";
import x from "../../assets/ZHEN_blackArtboard 1@3x.png";
import Image from "next/image";
import { IError, IProduct } from "./types";

type ProductGridProps = {
  products: IProduct[] | IError | null;
};

// Type guard to check if products is an array of IProduct
const isProductArray = (
  data: IProduct[] | IError | null
): data is IProduct[] => {
  return Array.isArray(data);
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const router = useRouter();
  const handleProductDetailsRoute = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (!products) {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No Products Found</h2>
          <p className="text-lg">Please try again later.</p>
        </div>
      </section>
    );
  }

  if ("status" in products && products.status === "error") {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{products.message}</p>
        </div>
      </section>
    );
  }

  if (isProductArray(products)) {
    return (
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 
lg:grid-cols-3 gap-10"
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductDetailsRoute(product._id)}
            className="w-full overflow-hidden cursor-pointer"
          >
            <div className="relative bg-[#F3F3F3] h-[300px] p-4">
              <Image
                quality={100}
                sizes="(min-width: 768px) 100vw, 700px"
                src={x}
                alt="Product image"
                fill
              />
            </div>
            <div className="px-[1rem] py-[1.5rem] border">
              <h3 className=" mb-2 text-lg text-primary_black font-bold">
                {product.name}
              </h3>
              <p className="text-[#767676] text-[14px]">
                {product.category.name}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // If none of the conditions match, return a fallback UI
  return (
    <section className="w-full flex justify-center items-center min-h-[300px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Unexpected State</h2>
        <p className="text-lg">Something went wrong, please try again later.</p>
      </div>
    </section>
  );
};

export default ProductGrid;
