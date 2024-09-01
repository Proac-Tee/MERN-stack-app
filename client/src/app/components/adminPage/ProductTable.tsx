"use client";
import React, { useEffect, useState } from "react";

import { useAppContext } from "@/app/context/AppContext";
import AdminDashboardDropdown from "@/app/utils/AdminDashboardDropdown";
import { formatDate } from "@/app/utils/formatDate";
import { IError, IProduct } from "@/app/utils/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import AdminFilter from "./AdminFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { calculateStartDate } from "@/app/utils/calculateStartDate";
import { productOptions } from "@/app/utils/products";
import Image from "next/image";
import loading_image from "../../../assets/loading.svg";
import AdminDashboardSkeleton from "./AdminDashboardSkeleton";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";

// Type guard to check if products is an array of IProduct
const isProductArray = (
  data: IProduct[] | IError | null
): data is IProduct[] => {
  return Array.isArray(data);
};

const ProductTable = () => {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredDatas, setFilteredData] = useState<IProduct[]>([]);

  const { setShowModal, setDropdownProductId, dropdownProductId } =
    useAppContext();

  const { data, isPending, error } = useSuspenseQuery(productOptions);

  useEffect(() => {
    if (data) {
      filterData();
    }
  }, [data, searchParams]);

  const filterData = () => {
    if (!data) return;

    let filteredProducts = data;

    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const selectedCategory = searchParams.get("category");
    const dateRange = searchParams.get("duration");

    // Filter by search query (matches product name)
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product: IProduct) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product: IProduct) => product.category.name === selectedCategory
      );
    }

    // Filter by date range
    if (dateRange) {
      const startDate = calculateStartDate(dateRange);

      if (startDate) {
        filteredProducts = filteredProducts.filter((product: IProduct) => {
          const productDate = new Date(product.createdAt);
          return productDate >= startDate;
        });
      }
    }

    setFilteredData(filteredProducts);
  };

  if (isPending)
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

  if (!data || data.length === 0) {
    return <AdminDashboardSkeleton />;
  }

  if (error) {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{error.message}</p>
        </div>
      </section>
    );
  }

  if ("status" in data && data.status === "error") {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{data.message}</p>
        </div>
      </section>
    );
  }

  const handleClick = (productId: string) => {
    setDropdownProductId(dropdownProductId === productId ? null : productId);
  };

  if (isProductArray(data)) {
    return (
      <section className="py-[2.5rem]">
        <div className="flex justify-between flex-wrap gap-[2rem]">
          {isLoading && (
            <div>
              <Image
                quality={100}
                sizes="(min-width: 768px) 30vw, 30px"
                src={loading_image}
                alt="hero image"
                className="w-8 h-8"
              />
            </div>
          )}
          {!isLoading && (
            <>
              {user ? (
                <h2 className="text-[#252C32] font-bold  text-[1.75rem] md:text-[2.25rem]">
                  Hi!, {user.given_name}
                </h2>
              ) : (
                <h2 className="text-[#252C32] font-bold  text-[1.75rem] md:text-[2.25rem]">
                  Dashboard
                </h2>
              )}
            </>
          )}
          <button
            onClick={() => setShowModal("addProducts")}
            className="w-[160px] h-[32px] rounded-[6px] py-[4px] pl-[8px] pr-[12px] flex justify-center items-center gap-[0.5rem] bg-primary_color text-white font-semibold leading-[1.5rem] text-[0.875rem] hover:brightness-75"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H13V16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V13H8C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929C7.48043 11.1054 7.73478 11 8 11H11V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7V7Z"
                fill="white"
              />
            </svg>
            Add Product
          </button>
        </div>

        {filteredDatas ? (
          <section className="my-[2rem]">
            <section className="pb-[2rem]">
              <AdminFilter />
            </section>
            <section className="overflow-x-scroll overflow-y-hidden no-scrollbar pb-[6rem] z-10 ">
              <div className="relative w-[1196px] md:w-[100%] h-auto border-[1px] mb-[1rem] z-10 border-[#1C1C1C1A] rounded-[0.75rem] ">
                <div className="h-[40px] table-grid">
                  <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                    Product Name
                  </p>
                  <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                    Description
                  </p>
                  <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                    Category
                  </p>
                  <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-left p-[0.75rem]  truncate">
                    Created At
                  </p>
                  <p className="text-[#84919A] font-semibold text-[0.75rem] leading-[1rem] text-center p-[0.75rem]  truncate"></p>
                </div>
                <div className="relative">
                  {filteredDatas.map((data) => (
                    <div
                      key={data._id}
                      className=" border-t-[1px] border-t-[#1C1C1C1A] table-grid"
                    >
                      <p className=" text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                        {capitalizeFirstLetter(data.name)}
                      </p>
                      <p className=" text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                        {capitalizeFirstLetter(data.description)}
                      </p>
                      <p className=" text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                        {data.category.name}
                      </p>
                      <p className="flex gap-[0.2rem]  items-center  text-left p-[0.75rem] font-[400] text-[0.875rem] truncate">
                        <span>
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 2.5H11.5V2C11.5 1.86739 11.4473 1.74021 11.3536 1.64645C11.2598 1.55268 11.1326 1.5 11 1.5C10.8674 1.5 10.7402 1.55268 10.6464 1.64645C10.5527 1.74021 10.5 1.86739 10.5 2V2.5H5.5V2C5.5 1.86739 5.44732 1.74021 5.35355 1.64645C5.25979 1.55268 5.13261 1.5 5 1.5C4.86739 1.5 4.74021 1.55268 4.64645 1.64645C4.55268 1.74021 4.5 1.86739 4.5 2V2.5H3C2.73478 2.5 2.48043 2.60536 2.29289 2.79289C2.10536 2.98043 2 3.23478 2 3.5V13.5C2 13.7652 2.10536 14.0196 2.29289 14.2071C2.48043 14.3946 2.73478 14.5 3 14.5H13C13.2652 14.5 13.5196 14.3946 13.7071 14.2071C13.8946 14.0196 14 13.7652 14 13.5V3.5C14 3.23478 13.8946 2.98043 13.7071 2.79289C13.5196 2.60536 13.2652 2.5 13 2.5ZM4.5 3.5V4C4.5 4.13261 4.55268 4.25979 4.64645 4.35355C4.74021 4.44732 4.86739 4.5 5 4.5C5.13261 4.5 5.25979 4.44732 5.35355 4.35355C5.44732 4.25979 5.5 4.13261 5.5 4V3.5H10.5V4C10.5 4.13261 10.5527 4.25979 10.6464 4.35355C10.7402 4.44732 10.8674 4.5 11 4.5C11.1326 4.5 11.2598 4.44732 11.3536 4.35355C11.4473 4.25979 11.5 4.13261 11.5 4V3.5H13V5.5H3V3.5H4.5ZM13 13.5H3V6.5H13V13.5Z"
                              fill="#1C1C1C"
                            />
                          </svg>
                        </span>
                        {formatDate(data.createdAt)}
                      </p>
                      <div className="relative flex justify-end">
                        <button
                          className="cursor-pointer text-center p-[0.75rem] font-[400] text-[0.875rem] truncate flex justify-center items-center"
                          onClick={(e) => {
                            handleClick(data._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                          </svg>
                        </button>
                        {dropdownProductId === data._id && (
                          <AdminDashboardDropdown _id={data._id} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        ) : (
          <div>No data found</div>
        )}
      </section>
    );
  }
};

export default ProductTable;
