"use client";
import { getProductsData } from "@/app/action/actions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import x from "../../../assets/ZHENArtboard 1 copy@3x.png";

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

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const productId = params.id;
  const router = useRouter();

  // Fetch products data
  const { data, isLoading, error } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => getProductsData(),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + (error as Error).message;

  // Find the specific product by its ID
  const product = data?.find((product: IProduct) => product._id === productId);

  // If product is not found
  if (!product) {
    return <div>Product not found.</div>;
  }

  // Filter out the main product and randomly select three other products
  const otherProducts = data
    ?.filter((p: IProduct) => p._id !== productId) // Exclude the main product
    .slice(0, 3); // Select the first three products

  const handleOtherProductDetailsRoute = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleContactRoute = () => {
    router.push(`/contact-us`);
  };

  return (
    <section className="max-w-[1440px] w-[100%] min-h-[100vh] mx-auto px-4">
      <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full mt-5 xl:mt-8 pb-10 bg-gray-100 p-4 min-h-[300px]">
        <section className="h-full">
          {otherProducts && (
            <h3 className=" text-xl font-bold mb-6 underline underline-offset-4 decoration-[1px]">
              Featured Products
            </h3>
          )}

          <section className="flex flex-col gap-2">
            {otherProducts?.map((product: IProduct) => (
              <div
                key={product._id}
                className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2 cursor-pointer"
                onClick={() => handleOtherProductDetailsRoute(product._id)}
              >
                <div className="relative w-[95.99px] h-[95.99px] bg-gray-200">
                  <Image
                    quality={100}
                    sizes="(min-width: 768px) 100vw, 700px"
                    src={x}
                    alt="Product image"
                    fill
                  />
                </div>
                <div className="flex flex-col gap-2 font-semibold">
                  <h5 className="text-base font-medium">{product.name}</h5>
                  <p className="text-sm font-semibold">
                    {product.category.name}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </section>
        <section className="relative h-full min-h-[400px] xl:col-span-2 bg-gray-200">
          <Image
            quality={100}
            sizes="(min-width: 768px) 100vw, 700px"
            src={x}
            alt="Product image"
            fill
          />
        </section>
        <section className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-semibold">{product.name}</h2>
            <p className="text-base text-gray-600">{product.description}</p>
            <button
              onClick={handleContactRoute}
              className="w-full py-4 bg-[#262626] hover:bg-black duration-300 text-white text-lg font-semibold"
            >
              Contact Us
            </button>
            <p className="font-normal text-sm">
              <span className="text-base font-medium mr-2">Category:</span>
              {product.category.name}
            </p>
            <p className="font-normal text-sm">
              <span className="text-base font-medium mr-2 ">
                Subcategories:
              </span>
              {product.category.subcategories
                .map((subcategory: ICategory) => subcategory.name)
                .join(", ")}
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ProductDetails;
