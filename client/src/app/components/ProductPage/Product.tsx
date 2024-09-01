"use client";

import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import ProductGrid from "@/app/utils/ProductGrid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { initialCategories } from "@/app/utils/intialCategories";
import { ICategory, IProduct } from "@/app/utils/types";
import Image from "next/image";
import loading_image from "../../../assets/loading.svg";
import { productOptions } from "@/app/utils/products";

const Product: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);

  const { data, isPending, error } = useSuspenseQuery(productOptions);

  useEffect(() => {
    if (data && data.length > 0) {
      filterData();
    }
  }, [data, searchParams]);

  const updateSearchParams = (updatedCategories: ICategory[]) => {
    const params = new URLSearchParams();

    updatedCategories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        if (subcategory.selected) {
          params.append("subcategory", subcategory.name);
        }
      });
    });

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const filterData = () => {
    let filteredProducts = data;

    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const selectedSubcategories = searchParams.getAll("subcategory");

    // Filter by search query (matches product name)
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product: IProduct) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }
    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter((product: IProduct) =>
        product.category.subcategories.some((sub) =>
          selectedSubcategories.includes(sub.name)
        )
      );
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

  if (error) {
    return (
      <section className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-lg">{data.message}</p>
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

  if (!data || data.length === 0) {
    return (
      <div className="w-[100%] flex justify-center items-center max-w-[1440px] mx-auto p-4 min-h-[40vh]">
        <p>No product data found</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto p-4 my-[2.5rem]">
      <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
        <h1 className="text-5xl text-primary_black font-titleFont font-bold">
          Products
        </h1>
      </div>

      <div className="w-full h-full flex pb-20 gap-10">
        <aside className="w-[20%] md:w-[25%] hidden md:inline-flex h-full">
          <SideNav
            categories={initialCategories}
            onSelectionChange={updateSearchParams}
          />
        </aside>
        <section className="w-full md:w-[80%] lg:w-[75%] h-full flex flex-col gap-10">
          <ProductGrid products={filteredData} />
        </section>
      </div>
    </section>
  );
};

export default Product;
