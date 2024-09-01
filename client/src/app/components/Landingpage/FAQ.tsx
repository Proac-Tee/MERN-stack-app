"use client";
import { inter, plus_Jakarta_Sans } from "@/app/utils/fonts";
import Image from "next/image";
import React, { FC, useState } from "react";
import avatar_group_image from "../../../assets/Avatar group.svg";
import Link from "next/link";
import AccordionItem from "@/app/utils/AccordionItem";
type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We provide global sourcing, efficient logistics, customer-centric solutions, sustainability practices, and more to connect wholesalers with distributors.",
  },
  {
    question: "How do you ensure product quality?",
    answer:
      "We follow strict quality assurance processes, including regular inspections and adherence to international standards, to guarantee high-quality products.",
  },
  {
    question: "What are your sustainability practices?",
    answer:
      "We implement sustainable practices such as reducing packaging waste and optimizing transportation routes to minimize our environmental impact.",
  },
  {
    question: "How does your logistics network operate?",
    answer:
      "Our logistics network is optimized for timely and cost-effective deliveries, with real-time tracking and inventory management for transparency.",
  },
  {
    question: "Do you offer tailored solutions?",
    answer:
      "Yes, we offer customized solutions, including flexible order quantities and dedicated account management to meet the unique needs of our partners.",
  },
];

const FAQ: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section>
      <div className="flex flex-col gap-[0.5rem] pt-[1rem] md:pt-[6rem]">
        <h3
          className={`text-white leading-[1.75rem] md:leading-[2.75rem] font-semibold text-[1.25rem] md:text-[2.25rem] text-center ${plus_Jakarta_Sans.className}`}
        >
          Frequently asked questions
        </h3>
        <p
          className={`text-black text-center text-[0.875rem] md:text-[1.25rem] ${plus_Jakarta_Sans.className}`}
        >
          What you need to know
        </p>
      </div>

      <section className="w-full max-w-4xl mx-auto py-[2rem] md:py-[4rem]">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            index={index}
            activeIndex={activeIndex}
            toggleAccordion={toggleAccordion}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </section>
      <section className="bg-[#F9FAFB] rounded-[1rem] min-h-[294px] mb-[3rem]">
        <div className="pt-[2rem] flex justify-center items-center">
          <Image
            quality={100}
            sizes="(min-width: 768px) 100vw, 700px"
            src={avatar_group_image}
            alt="Avatar group image"
            className=" w-[120px] h-[56px]"
          />
        </div>
        <div className=" flex flex-col items-center  gap-[2rem]">
          <div className="pt-[2rem] px-[1rem]">
            <h4
              className={`text-[#101828] text-center text-[0.875rem] md:text-[1.25rem] font-medium  ${plus_Jakarta_Sans.className}`}
            >
              Still have questions?
            </h4>
            <p
              className={`text-[#667085] text-center text-[0.75rem] md:text-[1.125rem] font-medium ${inter.className}`}
            >
              Can&rsquo;t find the answer you&rsquo;re looking for? Please chat
              to our friendly team.
            </p>
          </div>
          <Link
            href={`/contact-us`}
            className="w-[130px] h-[44px] flex justify-center items-center rounded-[0.5rem] bg-primary_color text-white text-[1rem] font-medium hover:brightness-75 "
          >
            Get in touch
          </Link>
        </div>
      </section>
    </section>
  );
};

export default FAQ;
