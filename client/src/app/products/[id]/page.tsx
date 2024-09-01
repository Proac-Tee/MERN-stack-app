"use client";
import { getProductsFiles } from "@/app/action/actions";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FilesArrayType, FileType } from "@/app/utils/types";
import loading_image from "../../../assets/loading.svg";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { productOptions } from "@/app/utils/products";
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

  // Fetch products data
  const { data, isPending, error } = useSuspenseQuery(productOptions);

  if (isPending || filesLoading)
    return (
      <section className="min-h-[100vh]">
        <div className="w-[100%] flex justify-center items-center max-w-[1440px] mx-auto p-4 ">
          <Image
            quality={100}
            sizes="(min-width: 768px) 100vw, 700px"
            src={loading_image}
            alt="hero image"
            className="w-8 h-8"
          />
        </div>
      </section>
    );

  if (error) {
    return (
      <section className="w-full flex justify-center items-center min-h-[100vh]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{(error as Error).message}</p>
        </div>
      </section>
    );
  }

  if (filesError) {
    return (
      <section className="w-full flex justify-center items-center min-h-[100vh]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{filesError.message}</p>
        </div>
      </section>
    );
  }

  // Find the specific product by its ID
  const product = data?.find((product: IProduct) => product._id === productId);

  // If product is not found
  if (!product) {
    return (
      <section className="w-full flex justify-center items-center min-h-[100vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No Products Found</h2>
          <p className="text-lg">Please try again later.</p>
        </div>
      </section>
    );
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
      <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full mt-5 xl:mt-8 pb-10 bg-gray-100 p-4 min-h-[100vh]">
        <section className="h-full w-[100%]">
          {otherProducts && (
            <h3 className=" text-xl font-bold mb-6 underline underline-offset-4 decoration-[1px]">
              Featured Products
            </h3>
          )}

          <section className="flex flex-col  gap-2 w-[100%]">
            {otherProducts?.map((product: IProduct) => (
              <div
                key={product._id}
                className="flex items-center w-[100%] gap-4 border-b-[1px] border-b-gray-300 py-2 cursor-pointer"
                onClick={() => handleOtherProductDetailsRoute(product._id)}
              >
                {fetchedFile && fetchedFile.length > 0 && (
                  <div className="relative min-w-[95.99px] w-[95.99px] h-[95.99px] bg-gray-200">
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
                  </div>
                )}
                <div className="flex flex-col overflow-hidden gap-2 font-semibold">
                  <h5 className="text-base font-medium truncate">
                    {product.name}
                  </h5>
                  <p className="text-sm font-semibold truncate">
                    {product.category.name}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </section>
        <section className="relative h-[400px] xl:col-span-2 bg-gray-200">
          {fetchedFile && fetchedFile.length > 0 && (
            <>
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
            </>
          )}
        </section>
        <section className="h-full w-full md:col-span-2 xl:col-span-3 xl:px-14 xl:py-[1rem] flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-semibold">
              {capitalizeFirstLetter(product.name)}
            </h2>
            <p className="text-base text-gray-600">
              {capitalizeFirstLetter(product.description)}
            </p>
            <button
              onClick={handleContactRoute}
              className="w-full py-4 bg-[#262626] hover:bg-black duration-300 text-white text-lg font-semibold"
            >
              Contact Us
            </button>
            <p className="font-normal text-sm">
              <span className="text-base font-medium mr-2">Category:</span>
              {capitalizeFirstLetter(product.category.name)}{" "}
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
