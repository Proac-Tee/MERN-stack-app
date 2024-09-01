"use client";
import React, { useEffect, useRef } from "react";
import { plus_Jakarta_Sans } from "./fonts";

type AccordionItemProps = {
  index: number;
  activeIndex: number | null;
  toggleAccordion: (index: number) => void;
  question: string;
  answer: string;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  activeIndex,
  toggleAccordion,
  question,
  answer,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight =
        activeIndex === index ? `${contentRef.current.scrollHeight}px` : "0px";
    }
  }, [activeIndex, index]);

  return (
    <div className="border-b py-[0.5rem] border-gray-200">
      <button
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={() => toggleAccordion(index)}
      >
        <span
          className={`text-lg font-medium text-[#18181B] ${plus_Jakarta_Sans.className}`}
        >
          {question}
        </span>
        <span className="text-gray-800">
          {activeIndex === index ? (
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 14H16M22 14C22 19.5228 17.5228 24 12 24C6.47715 24 2 19.5228 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14Z"
                stroke="#D02027"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 10V18M8 14H16M22 14C22 19.5228 17.5228 24 12 24C6.47715 24 2 19.5228 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14Z"
                stroke="#D02027"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div
          className={`pb-[2rem] text-[1rem] font-[400] text-white ${plus_Jakarta_Sans.className}`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
