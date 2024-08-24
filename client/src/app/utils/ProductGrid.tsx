"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface ISubcategory {
  name: string;
  selected: boolean; // Indicates if the subcategory is selected or not.
}

// Define the structure of a category that contains an array of subcategories.
interface ICategory {
  name: string;
  subcategories: ISubcategory[]; // An array of subcategories.
}

// Define the structure of a product that includes a category.
interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: ICategory; // A product has one category.
  createdAt: Date; // Timestamp for when the product was created.
}
type ProductGridProps = {
  products: IProduct[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const router = useRouter();
  const handleProductDetailsRoute = (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <section
      className="w-full grid grid-cols-1 md:grid-cols-2 
mxl:grid-cols-3 gap-10"
    >
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => handleProductDetailsRoute(product._id)}
          className="w-full overflow-hidden cursor-pointer"
        >
          <div className="bg-[#F3F3F3] h-[300px] p-4"></div>
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
};

export default ProductGrid;
