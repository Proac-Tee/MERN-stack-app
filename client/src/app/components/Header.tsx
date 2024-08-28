"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { plus_Jakarta_Sans } from "../utils/fonts";
import Link from "next/link";
import MobileLinkDropdown from "./MobileLinkDropdown";
import { usePathname } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import HeaderDropdown from "./HeaderDropdown";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Header: FC = () => {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const { openProfile, setOpenProfile } = useAppContext();
  const { user, isLoading } = useKindeBrowserClient();

  const profileHandler = () => {
    setOpenProfile(!openProfile);
  };
  const openDropdown: () => void = () => {
    setDropDown(true);
  };

  const closeDropdown: () => void = () => {
    setDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click occurred outside of the profile dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
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
    <header
      className={` border-b border-gray-200 ${plus_Jakarta_Sans.className}`}
    >
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href={`/`}>Zhen</Link>

          <button
            onClick={openDropdown}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={dropDown ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className=" hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  aria-current="page"
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    pathname === "/"
                      ? "text-red-700 font-bold"
                      : "text-gray-900  "
                  }`}
                  href={`/`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    pathname.startsWith("/products")
                      ? "text-red-700 font-bold"
                      : "text-gray-900"
                  }`}
                  href={`/products`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href={`/about-us`}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    pathname === "/about-us"
                      ? "text-red-700 font-bold"
                      : "text-gray-900  "
                  }`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href={`/contact-us`}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    pathname === "/contact-us"
                      ? "text-red-700 font-bold"
                      : "text-gray-900  "
                  }`}
                >
                  Contact
                </Link>
              </li>
              {user && (
                <li>
                  <div ref={dropdownRef} className="relative">
                    <div
                      onClick={profileHandler}
                      className="relative w-[30px] h-[30px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                    >
                      <svg
                        className="absolute w-7 h-7 text-gray-400 -bottom-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <HeaderDropdown />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        <MobileLinkDropdown isOpen={dropDown} onClick={closeDropdown} />
      </nav>
    </header>
  );
};

export default Header;
