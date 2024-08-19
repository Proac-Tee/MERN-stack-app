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
      className={`w-[100%] md:w-[300px]  h-[100%] py-[4rem] min-h-[100vh] overflow-y-scroll overflow-x-hidden no-scrollbar fixed top-0 left-0 z-50 bg-gradient-to-l inset-0 from-[#036699] to-[#02344E] transition duration-[500ms] ease-in ${
        isOpen ? "translate-x-0" : "-translate-x-[100%]"
      } `}
    >
      MobileLinkDropdow n
    </div>
  );
};

export default MobileLinkDropdown;
