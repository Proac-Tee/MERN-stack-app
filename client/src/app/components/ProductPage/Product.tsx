"use client";

import React, { useState } from "react";
import SideNav from "./SideNav";
import ProductGrid from "@/app/utils/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { getProductsData } from "@/app/action/actions";

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
  // id: string,
  name: string;
  description: string;
  category: ICategory; // A product has one category.
  createdAt: Date; // Timestamp for when the product was created.
}

// Define the initial categories with all the categories you provided
const initialCategories: ICategory[] = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Mobile devices", selected: false },
      { name: "Computers & peripherals", selected: false },
      { name: "Audio & video equipment", selected: false },
      { name: "Home appliances", selected: false },
    ],
  },
  {
    name: "Apparel & Accessories",
    subcategories: [
      { name: "Men's, women's, and children's clothing", selected: false },
      { name: "Footwear", selected: false },
      { name: "Bags and luggage", selected: false },
      { name: "Fashion accessories", selected: false },
    ],
  },
  {
    name: "Health & Beauty",
    subcategories: [
      { name: "Cosmetics", selected: false },
      { name: "Personal care products", selected: false },
      { name: "Healthcare products", selected: false },
      { name: "Fitness equipment", selected: false },
    ],
  },
  {
    name: "Home & Garden",
    subcategories: [
      { name: "Furniture", selected: false },
      { name: "Home décor", selected: false },
      { name: "Kitchenware", selected: false },
      { name: "Gardening tools", selected: false },
    ],
  },
  {
    name: "Automotive",
    subcategories: [
      { name: "Car parts and accessories", selected: false },
      { name: "Tools & equipment", selected: false },
      { name: "Maintenance products", selected: false },
      { name: "Motorcycle parts", selected: false },
    ],
  },
  {
    name: "Food & Beverage",
    subcategories: [
      { name: "Packaged foods", selected: false },
      { name: "Beverages", selected: false },
      { name: "Confectionery", selected: false },
      { name: "Health foods", selected: false },
    ],
  },
  {
    name: "Office Supplies",
    subcategories: [
      { name: "Stationery", selected: false },
      { name: "Office furniture", selected: false },
      { name: "Electronics", selected: false },
      { name: "Cleaning supplies", selected: false },
    ],
  },
  {
    name: "Toys & Games",
    subcategories: [
      { name: "Educational toys", selected: false },
      { name: "Puzzles", selected: false },
      { name: "Video games", selected: false },
      { name: "Outdoor play equipment", selected: false },
    ],
  },
  {
    name: "Industrial & Scientific",
    subcategories: [
      { name: "Machinery", selected: false },
      { name: "Tools and instruments", selected: false },
      { name: "Safety equipment", selected: false },
      { name: "Lab supplies", selected: false },
    ],
  },
  {
    name: "Sports & Outdoors",
    subcategories: [
      { name: "Sports equipment", selected: false },
      { name: "Camping gear", selected: false },
      { name: "Outdoor clothing", selected: false },
      { name: "Fitness gear", selected: false },
    ],
  },
];

const Product: React.FC = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => getProductsData(),
  });

  const [categories, setCategories] = useState<ICategory[]>(initialCategories);

  const handleSelectionChange = (updatedCategories: ICategory[]) => {
    setCategories(updatedCategories);
    console.log("Selected Categories:", updatedCategories);
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
            categories={categories}
            onSelectionChange={handleSelectionChange}
          />
        </aside>
        <section className="w-full md:w-[80%] lg:w-[75%] h-full flex flex-col gap-10">
          <ProductGrid products={data} />
        </section>
      </div>
    </section>
  );
};

export default Product;
