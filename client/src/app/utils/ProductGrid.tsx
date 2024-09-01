"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { FilesArrayType, FileType, IError, IProduct } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getProductsFiles } from "../action/actions";
import loading_image from "../../assets/loading.svg";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

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
  // Queries
  // Fetch files data
  const {
    data: fetchedFile,
    isLoading: filesLoading,
    error: filesError,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await getProductsFiles();
      const data: FilesArrayType = await response;

      return data.files; // Assume the response has a 'files' array
    },
  });

  const router = useRouter();
  const handleProductDetailsRoute = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (filesLoading)
    return (
      <div className="w-[100%] flex justify-center items-center max-w-[1440px] mx-auto p-4 ">
        <Image
          quality={100}
          sizes="(min-width: 768px) 100vw, 700px"
          src={loading_image}
          alt="hero image"
          className="w-8 h-8"
        />
      </div>
    );
  if (filesError) {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{filesError.message}</p>
        </div>
      </section>
    );
  }
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
              {fetchedFile && fetchedFile.length > 0 && (
                <ul>
                  {fetchedFile
                    .filter((file) => {
                      // Split the file name and remove the extension
                      const fileNameWithoutExtension = file.name
                        .split(".")
                        .slice(0, -1)
                        .join(".");
                      // Check if the name without the extension matches the product ID
                      return fileNameWithoutExtension === product._id;
                    })
                    .map((file: FileType) => (
                      <Image
                        key={file.id}
                        quality={100}
                        sizes="(min-width: 768px) 100vw, 300px"
                        src={`https://utfs.io/f/${file.key}`}
                        alt="Product image"
                        fill
                      />
                    ))}
                </ul>
              )}
            </div>
            <div className="px-[1rem] py-[1.5rem] border">
              <h3 className=" mb-2 text-lg text-primary_black font-bold">
                {capitalizeFirstLetter(product.name)}
              </h3>
              <p className="text-[#767676] text-[14px]">
                {capitalizeFirstLetter(product.category.name)}
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
