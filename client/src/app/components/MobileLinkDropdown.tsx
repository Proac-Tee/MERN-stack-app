"use client";
import React, { FC, useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

const MobileLinkDropdown = ({ onClick, isOpen }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  return (
    <div
      ref={dropdownRef}
      className={`w-[100%] md:w-[300px]  h-[100%] py-[4rem] min-h-[100vh] overflow-y-scroll overflow-x-hidden no-scrollbar fixed top-0 left-0 z-50 bg-gradient-to-l inset-0 from-red-700 to-red-500 transition duration-[500ms] ease-in ${
        isOpen ? "translate-x-0" : "-translate-x-[100%]"
      } `}
    >
      <div className="absolute top-[1rem] right-[1rem] text-white z-10">
        <button type="button" onClick={onClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 7L17 17M7 17L17 7"
              stroke="white"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileLinkDropdown;
