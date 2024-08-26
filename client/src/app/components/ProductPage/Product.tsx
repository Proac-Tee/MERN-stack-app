"use client";

import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import ProductGrid from "@/app/utils/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { getProductsData } from "@/app/action/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { initialCategories } from "@/app/utils/intialCategories";
import { ICategory, IProduct } from "@/app/utils/types";

const Product: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);
  const { data, isPending, error } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => getProductsData(),
  });

  useEffect(() => {
    if (data) {
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
        selectedSubcategories.includes(
          product.category.subcategories.find((sub) => sub.selected)?.name || ""
        )
      );
    }

    setFilteredData(filteredProducts);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="max-w-[1440px] mx-auto p-4 ">
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
