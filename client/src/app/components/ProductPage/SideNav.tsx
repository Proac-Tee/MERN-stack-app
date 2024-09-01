"use client";
import { Category } from "@/app/utils/types";
import React, { useState } from "react";

type SideNavProps = {
  categories: Category[];
  onSelectionChange: (updatedCategories: Category[]) => void;
};

const SideNav: React.FC<SideNavProps> = ({ categories, onSelectionChange }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCheckboxChange = (
    categoryIndex: number,
    subcategoryIndex: number
  ) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].subcategories[subcategoryIndex].selected =
      !updatedCategories[categoryIndex].subcategories[subcategoryIndex]
        .selected;

    onSelectionChange(updatedCategories); // Notify the parent component of the change
  };

  return (
    <div className="w-full">
      <>
        <h3 className="font-bold lg:text-xl text-primary_black">
          Browse by Category
        </h3>
      </>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="border-b-[1px] border-b-[#F0F0F0]">
          <div
            className="cursor-pointer p-4  flex justify-between items-center"
            onClick={() => handleToggle(categoryIndex)}
          >
            <span className="text-[#767676] text-sm lg:text-base">
              {category.name}
            </span>
            <span className="transition ease-in-out duration-300">
              {activeIndex === categoryIndex ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              )}
            </span>
          </div>
          {activeIndex === categoryIndex && (
            <div className="px-4">
              {category.subcategories.map((subcategory, subcategoryIndex) => (
                <div
                  key={subcategoryIndex}
                  className="p-2 hover:bg-gray-50 flex items-center text-[#767676] text-sm lg:text-base"
                >
                  <label className="cursor-pointer w-[100%]">
                    <input
                      type="checkbox"
                      checked={subcategory.selected}
                      onChange={() =>
                        handleCheckboxChange(categoryIndex, subcategoryIndex)
                      }
                      className="mr-2"
                    />
                    <span>{subcategory.name}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
