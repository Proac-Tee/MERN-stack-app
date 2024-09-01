import { plus_Jakarta_Sans } from "@/app/utils/fonts";
import React, { FC } from "react";

import delivery_image from "../../../assets/Delivery.svg";
import customer_centric_image from "../../../assets/Customer_Insights.svg";
import sustainability_practices_image from "../../../assets/Sustainability.svg";

import Image from "next/image";

const Overview: FC = () => {
  return (
    <section>
      <article className="flex flex-col justify-center items-center gap-[1rem] max-w-[616px] mx-auto py-[3rem]">
        <h2
          className={`text-[#18181B] leading-[2rem] md:leading-[3rem]  font-bold text-[1.625rem] md:text-[2.625rem] text-center ${plus_Jakarta_Sans.className}`}
        >
          Make every step user-centric
        </h2>
        <p
          className={`text-[#52525b] font-[400] text-[0.975rem] md:text-[1.125rem] leading-[1rem] md:leading-[1.75rem] text-center ${plus_Jakarta_Sans.className}`}
        >
          Connecting the World, One Delivery at a Time
        </p>
      </article>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex justify-center items-center sm:border-r border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-orange-100 rounded-full">
                <svg
                  className="w-6 h-6 text-orange-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Global Sourcing
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Sourcing high-quality products from trusted suppliers worldwide.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center border-r-0 lg:border-r border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-blue-100 rounded-full">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={delivery_image}
                  alt="Delivery image"
                  className=" w-[24px] h-[24px]"
                />
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Efficient Logistics
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Timely, cost-effective deliveries with transparent tracking and
                inventory management.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center  sm:border-r lg:border-r-0 border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-green-100 rounded-full">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={customer_centric_image}
                  alt="Customer centric image"
                  className=" w-[24px] h-[24px]"
                />
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Customer-Centric
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Tailored solutions, flexible orders, and dedicated support for
                every partner.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center border-r-0 lg:border-r border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-purple-100 rounded-full">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={sustainability_practices_image}
                  alt="Sustainability Practices"
                  className=" w-[24px] h-[24px]"
                />
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Sustainability Practices
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Minimizing environmental impact through reduced packaging and
                optimized transport.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center sm:border-r border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-gray-100 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 6.5h2M11 18h2m-7-5v-2m12 2v-2M5 8h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0 12h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm12 0h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0-12h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z"
                  />
                </svg>
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Technology Integration
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Leveraging advanced technology for seamless order processing and
                real-time updates.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center  border-r-0 border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-yellow-100 rounded-full">
                <svg
                  className="w-6 h-6 text-yellow-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Quality Assurance
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Strict quality control ensures compliance with international
                standards.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center sm:border-r border-b lg:border-b-0 h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-gray-100 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Strategic Partnerships
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Collaborating with industry leaders to expand our product
                offerings and services.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center border-r-0 lg:border-r border-b h-[286.5px] lg:border-0  border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-rose-100 rounded-full">
                <svg
                  className="w-6 h-6 text-rose-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                  <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                </svg>
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                Market Insights
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Providing data-driven insights to help partners make informed
                decisions and stay ahead of industry trends.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center border-[#E4E4E7] sm:border-r lg:border-0 h-[286.5px]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="p-[1rem] flex justify-center items-center bg-lime-100 rounded-full">
                <svg
                  className="w-6 h-6 text-lime-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"
                  />
                </svg>
              </div>
              <h3
                className={`text-[1rem] md:text-[1.3125rem] text-[#18181B] font-bold leading-[1.75rem] ${plus_Jakarta_Sans.className}`}
              >
                End-to-End Support
              </h3>
              <p
                className={`text-[0.875rem] md:text-[1rem]  leading-[18px] md:leading-[26px] text-[#52525b] font-[400] ${plus_Jakarta_Sans.className}`}
              >
                Offering comprehensive support, from sourcing to delivery,
                ensuring a smooth and efficient experience at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Overview;
