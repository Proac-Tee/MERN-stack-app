"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { initialCategories } from "@/app/utils/intialCategories";

const dateList: string[] = [
  "Last week",
  "Last Month",
  "Last 2months",
  "Last 6months",
];

interface SearchProps {
  selectedCategory: string[];
  selectedSector: string[];
  selectedDuration: string[];
}

const AdminFilter = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const categoryRef = useRef<HTMLDivElement>(null);
  const duartionRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);

  const [toggleCategory, setToggleCategory] = useState<boolean>(false);
  const [toggleDuration, setToggleDuration] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");

  const handleSearchInput = (option: string, type: string) => {
    switch (type) {
      case "category":
        const categoryIndex = selectedCategory.indexOf(option);
        if (categoryIndex === -1) {
          setSelectedCategory([...selectedCategory, option]);
        } else {
          setSelectedCategory(
            selectedCategory.filter((item) => item !== option)
          );
        }
        break;
      case "duration":
        const durationIndex = selectedDuration.indexOf(option);
        if (durationIndex === -1) {
          setSelectedDuration([...selectedDuration, option]);
        } else {
          setSelectedDuration(
            selectedDuration.filter((item) => item !== option)
          );
        }
        break;
      default:
        break;
    }
  };

  const clearAllCategory = () => {
    setSelectedCategory([]);
    setSelectedDuration([]);
    // Uncheck all checkboxes for Category options
    const categoryCheckboxes = document.getElementsByName("category");
    categoryCheckboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    // Uncheck all checkboxes for duration options
    const durationCheckboxes = document.getElementsByName("duration");
    durationCheckboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });

    // Uncheck all checkboxes for industry options
    const sectorCheckboxes = document.getElementsByName("sector");
    sectorCheckboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
  };

  const handleDuration = () => {
    setToggleDuration(!toggleDuration);
  };

  const handleCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  const handleUseSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  // Function to handle updating URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const queryParams: { [key: string]: string } = {};
    if (selectedCategory.length > 0) {
      queryParams.category = selectedCategory.join(",");
      params.set("category", queryParams.category);
    } else {
      params.delete("category");
    }

    if (selectedDuration.length > 0) {
      queryParams.duration = selectedDuration.join(",");
      params.set("duration", queryParams.duration);
    } else {
      params.delete("duration");
    }

    if (textSearch) {
      params.set("search", textSearch);
    } else {
      params.delete("search");
    }

    router.push(`/admin?${params.toString()}`);
  }, [selectedCategory, router, searchParams, selectedDuration, textSearch]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click occurred outside of the profile dropdown
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setToggleCategory(false);
      }

      if (duartionRef.current && !duartionRef.current.contains(event.target)) {
        setToggleDuration(false);
      }
    };

    // Add event listener to handle clicks outside of the profile dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup: remove event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="flex justify-between items-center">
      <div className="w-[100%] md:w-[278px] h-[36px]">
        <label
          htmlFor="search"
          className=" text-sm font-medium text-[#1C1C1C66] sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-[1.5rem] pointer-events-none">
            <svg
              className="w-4 h-4 text-[#1C1C1C66] "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="textSearch"
            value={textSearch}
            onChange={handleUseSearchChange}
            className="block w-full px-[1rem] py-[0.5rem] ps-[3rem] text-sm text-gray-900 border border-[#1C1C1C1A] rounded-[5rem] bg-white focus:outline-none  placeholder-gray-400   "
            placeholder="Search"
            required
          />
        </div>
      </div>
      <div className="hidden  md:flex justify-between items-center gap-[0.5rem]">
        <div ref={categoryRef} className="relative">
          <div
            className={`flex justify-between items-center gap-[0.2rem]  ${
              selectedCategory.length >= 1
                ? "rounded-[6.25rem] border-dashed border-[1px] border-[#1C1C1C1A]"
                : ""
            } `}
          >
            <button
              onClick={handleCategory}
              className="flex cursor-pointer justify-center rounded-[50px] bg-[#1C1C1C0D] text-[#1C1C1CCC] items-center px-[1.5rem] py-[0.5rem] gap-[0.75rem] h-[36px] font-[400] text-[0.875rem]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1072_990)">
                  <path
                    d="M8.50004 5.99967C8.50004 5.72353 8.27618 5.49967 8.00004 5.49967C7.7239 5.49967 7.50004 5.72353 7.50004 5.99967L7.50004 7.49969H6.00004C5.7239 7.49969 5.50004 7.72355 5.50004 7.99969C5.50004 8.27583 5.7239 8.49969 6.00004 8.49969H7.50004V9.99967C7.50004 10.2758 7.7239 10.4997 8.00004 10.4997C8.27618 10.4997 8.50004 10.2758 8.50004 9.99967L8.50004 8.49969H10C10.2762 8.49969 10.5 8.27583 10.5 7.99969C10.5 7.72355 10.2762 7.49969 10 7.49969H8.50004V5.99967Z"
                    fill="#1C1C1C"
                    fillOpacity="0.8"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00004 0.833008C4.042 0.833008 0.833374 4.04163 0.833374 7.99967C0.833374 11.9577 4.042 15.1663 8.00004 15.1663C11.9581 15.1663 15.1667 11.9577 15.1667 7.99967C15.1667 4.04163 11.9581 0.833008 8.00004 0.833008ZM1.83337 7.99967C1.83337 4.59392 4.59428 1.83301 8.00004 1.83301C11.4058 1.83301 14.1667 4.59392 14.1667 7.99967C14.1667 11.4054 11.4058 14.1663 8.00004 14.1663C4.59428 14.1663 1.83337 11.4054 1.83337 7.99967Z"
                    fill="#1C1C1C"
                    fillOpacity="0.8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1072_990">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Category
            </button>
            <p
              className={`flex cursor-pointer justify-center rounded-[50px]  bg-[#1C1C1C33] text-[#1C1C1CCC] items-center p-[1rem]  gap-[0.75rem] h-[36px] font-[400] text-[0.875rem] ${
                selectedCategory.length >= 1 ? "block" : "hidden"
              }`}
            >
              {selectedCategory.length}
            </p>
          </div>
          <div
            className={`absolute top-[3rem] category-dropdown left-0 bg-white border-[#F2F4F7] border-[1px] rounded-[0.5rem] z-20  py-2 w-[150px] md:w-[240px] max-h-[250px] overflow-x-hidden overflow-y-auto dropdown-scroll text-[1rem] text-[#494949]  ${
              toggleCategory ? "block" : "hidden"
            } `}
          >
            <ul>
              {initialCategories.map((category, index) => (
                <li
                  key={index}
                  className={`flex items-center h-[40px] overflow-hidden text-primary_black gap-[0.75rem] px-[1rem] py-[0.625rem]`}
                >
                  <input
                    type="checkbox"
                    name="category"
                    id={`category-${index}`}
                    onClick={() => handleSearchInput(category.name, "category")}
                    className="border-[1px] border-[#F2F4F7]"
                  />
                  <p className="flex justify-between items-center text-[0.875rem] w-[100%]">
                    {category.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div ref={duartionRef} className="relative">
          <div
            className={`flex justify-between items-center gap-[0.2rem]  ${
              selectedDuration.length >= 1
                ? "rounded-[6.25rem] border-dashed border-[1px] border-[#1C1C1C1A]"
                : ""
            } `}
          >
            <button
              onClick={handleDuration}
              className="flex cursor-pointer justify-center rounded-[50px] bg-[#1C1C1C0D] text-[#1C1C1CCC] items-center px-[1.5rem] py-[0.5rem] gap-[0.75rem] h-[36px] font-[400] text-[0.875rem]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1072_990)">
                  <path
                    d="M8.50004 5.99967C8.50004 5.72353 8.27618 5.49967 8.00004 5.49967C7.7239 5.49967 7.50004 5.72353 7.50004 5.99967L7.50004 7.49969H6.00004C5.7239 7.49969 5.50004 7.72355 5.50004 7.99969C5.50004 8.27583 5.7239 8.49969 6.00004 8.49969H7.50004V9.99967C7.50004 10.2758 7.7239 10.4997 8.00004 10.4997C8.27618 10.4997 8.50004 10.2758 8.50004 9.99967L8.50004 8.49969H10C10.2762 8.49969 10.5 8.27583 10.5 7.99969C10.5 7.72355 10.2762 7.49969 10 7.49969H8.50004V5.99967Z"
                    fill="#1C1C1C"
                    fillOpacity="0.8"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00004 0.833008C4.042 0.833008 0.833374 4.04163 0.833374 7.99967C0.833374 11.9577 4.042 15.1663 8.00004 15.1663C11.9581 15.1663 15.1667 11.9577 15.1667 7.99967C15.1667 4.04163 11.9581 0.833008 8.00004 0.833008ZM1.83337 7.99967C1.83337 4.59392 4.59428 1.83301 8.00004 1.83301C11.4058 1.83301 14.1667 4.59392 14.1667 7.99967C14.1667 11.4054 11.4058 14.1663 8.00004 14.1663C4.59428 14.1663 1.83337 11.4054 1.83337 7.99967Z"
                    fill="#1C1C1C"
                    fillOpacity="0.8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1072_990">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Date
            </button>
            <p
              className={`flex cursor-pointer justify-center rounded-[50px]  bg-[#1C1C1C33] text-[#1C1C1CCC] items-center p-[1rem]  gap-[0.75rem] h-[36px] font-[400] text-[0.875rem] ${
                selectedDuration.length >= 1 ? "block" : "hidden"
              }`}
            >
              {selectedDuration.length}
            </p>
          </div>
          <div
            className={`absolute top-[3rem] duration-dropdown left-0 bg-white border-[#F2F4F7] border-[1px] rounded-[0.5rem] z-20  py-2 w-[150px] md:w-[240px] max-h-[250px] overflow-x-hidden overflow-y-auto dropdown-scroll text-[1rem] text-[#494949] ${
              toggleDuration ? "block" : "hidden"
            } `}
          >
            <ul>
              {dateList.map((option, index) => (
                <li
                  key={index}
                  className={`flex items-center h-[40px] overflow-hidden px-[1rem] py-[0.625rem] gap-[0.75rem] text-primary_black`}
                >
                  <input
                    type="checkbox"
                    name="duration"
                    id={`duration-${index}`}
                    onClick={() => handleSearchInput(option, "duration")}
                    className="border-[1px] border-[#F2F4F7]  "
                  />
                  <p className="flex justify-between items-center text-[0.875rem] w-[100%]">
                    {option}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {selectedDuration.length >= 1 || selectedCategory.length >= 1 ? (
          <button
            onClick={clearAllCategory}
            className="flex cursor-pointer justify-center rounded-[50px] bg-[#1C1C1C0D] text-[#1C1C1CCC] items-center px-[1.5rem] py-[0.5rem] gap-[0.75rem] h-[36px] font-[400] text-[0.875rem]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0306 11.9695C13.1715 12.1104 13.2506 12.3015 13.2506 12.5007C13.2506 12.7 13.1715 12.8911 13.0306 13.032C12.8897 13.1729 12.6986 13.252 12.4993 13.252C12.3001 13.252 12.109 13.1729 11.9681 13.032L7.99997 9.06261L4.0306 13.0307C3.8897 13.1716 3.69861 13.2508 3.49935 13.2508C3.30009 13.2508 3.10899 13.1716 2.9681 13.0307C2.8272 12.8898 2.74805 12.6987 2.74805 12.4995C2.74805 12.3002 2.8272 12.1091 2.9681 11.9682L6.93747 8.00011L2.96935 4.03073C2.82845 3.88984 2.7493 3.69874 2.7493 3.49948C2.7493 3.30023 2.82845 3.10913 2.96935 2.96823C3.11024 2.82734 3.30134 2.74818 3.5006 2.74818C3.69986 2.74818 3.89095 2.82734 4.03185 2.96823L7.99997 6.93761L11.9693 2.96761C12.1102 2.82671 12.3013 2.74756 12.5006 2.74756C12.6999 2.74756 12.891 2.82671 13.0318 2.96761C13.1727 3.10851 13.2519 3.2996 13.2519 3.49886C13.2519 3.69812 13.1727 3.88921 13.0318 4.03011L9.06247 8.00011L13.0306 11.9695Z"
                fill="#363636"
              />
            </svg>
            Reset
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default AdminFilter;
