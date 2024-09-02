"use client";
import React, { useState } from "react";
import { Category } from "@/app/utils/types";
import { useAppContext } from "@/app/context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";

type SideNavProps = {
  categories: Category[];
  onSelectionChange: (updatedCategories: Category[]) => void;
};

const MobileProductFilter: React.FC<SideNavProps> = ({
  categories,
  onSelectionChange,
}) => {
  const { showMobileFilter, setShowMobileFilter } = useAppContext();

  const searchParams = useSearchParams();

  const filterEntries = searchParams.get("subcategory");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const router = useRouter();

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

  const filterHandler = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  const resetFilterHandler = () => {
    // Clone the categories array
    const updatedCategories = categories.map((category) => ({
      ...category,
      subcategories: category.subcategories.map((subcategory) => ({
        ...subcategory,
        selected: false,
      })),
    }));

    // Reset active index and hide the filter
    setActiveIndex(null);
    setShowMobileFilter(!showMobileFilter);

    // Clear the search params
    const params = new URLSearchParams();

    // Notify the parent component with the updated categories
    onSelectionChange(updatedCategories);

    // Push the updated URL without any search params
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      onClick={filterHandler}
      className={`w-[100%] h-[100vh]  overflow-hidden fixed top-0 left-0 bg-opacity-20 z-50 bg-black transition duration-[300ms] ease-in ${
        showMobileFilter ? "translate-y-0" : "translate-y-[100%]"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-[1.5rem] p-[1rem] w-[100%] h-[450px] opacity-100 absolute bottom-0 left-0 "
      >
        <div className="py-[2rem] flex flex-col gap-[1rem]  w-[100%]">
          <h3 className="font-bold lg:text-xl text-primary_black">
            Browse by Category
          </h3>

          <div
            className={`${
              filterEntries ? "h-[200px]" : "h-[250px]"
            } overflow-y-scroll no-scrollbar`}
          >
            {categories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="border-b-[1px] border-b-[#F0F0F0]"
              >
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
                    {category.subcategories.map(
                      (subcategory, subcategoryIndex) => (
                        <div
                          key={subcategoryIndex}
                          className="p-2 hover:bg-gray-50 flex items-center text-[#767676] text-sm lg:text-base"
                        >
                          <label className="cursor-pointer w-[100%]">
                            <input
                              type="checkbox"
                              checked={subcategory.selected}
                              onChange={() =>
                                handleCheckboxChange(
                                  categoryIndex,
                                  subcategoryIndex
                                )
                              }
                              className="mr-2"
                            />
                            <span>{subcategory.name}</span>
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {filterEntries ? (
            <div className="flex flex-col gap-[1rem]">
              <button
                onClick={resetFilterHandler}
                className=" flex text-black text-[0.875rem] font-[600] items-center justify-center  border-[1px] bg-white border-[#0D0D0D] hover:border-primary_color rounded-full h-[48px] w-[100%] p-[0.5rem]"
              >
                Reset Filter
              </button>
              <button
                onClick={filterHandler}
                className=" flex text-[white] text-[0.875rem] font-[600] items-center justify-center border-[1px] bg-[#0D0D0D] border-[#0D0D0D] hover:text-black hover:bg-slate-200  rounded-full h-[48px] w-[100%] p-[0.5rem]"
              >
                Close Filter
              </button>
            </div>
          ) : (
            <button
              onClick={filterHandler}
              className=" flex text-[white] text-[0.875rem] font-[600] items-center justify-center border-[1px] bg-[#0D0D0D] border-[#0D0D0D] hover:bg-white hover:text-primary_black rounded-full h-[48px] w-[100%] p-[0.5rem]"
            >
              Apply Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileProductFilter;
