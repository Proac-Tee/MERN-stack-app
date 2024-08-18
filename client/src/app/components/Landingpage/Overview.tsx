import { plus_Jakarta_Sans } from "@/app/utils/fonts";
import React from "react";
import global_sorucing_image from "../../../assets/Worldwide Delivery.svg";
import delivery_image from "../../../assets/Delivery.svg";
import customer_centric_image from "../../../assets/Customer Insights Manager.svg";
import sustainability_practices_image from "../../../assets/Worldwide Delivery.svg";
import technology_integration_image from "../../../assets/Decentralized Network.svg";
import quality_assurance_image from "../../../assets/Good Quality.svg";
import strategic_partnerships_image from "../../../assets/Handshake Heart.svg";
import market_insights_image from "../../../assets/Combo Chart.svg";
import end_to_end_support_image from "../../../assets/Headset.svg";

import Image from "next/image";

const Overview = () => {
  return (
    <section>
      <article className="flex flex-col justify-center items-center gap-[1rem] max-w-[616px] mx-auto pt-[3rem] md:pb-[5rem]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-[5rem]">
          <div className="flex justify-center items-center sm:border-r border-b h-[286.5px] border-[#E4E4E7]">
            <div className="flex flex-col gap-4 w-full max-w-[330px] h-[217px] p-4 justify-center items-center text-center">
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={global_sorucing_image}
                  alt="Global sorucing image"
                  className=" w-[44px] h-[44px]"
                />
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={delivery_image}
                  alt="Delivery image"
                  className=" w-[44px] h-[44px]"
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={customer_centric_image}
                  alt="Customer centric image"
                  className=" w-[44px] h-[44px]"
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={sustainability_practices_image}
                  alt="Sustainability Practices"
                  className=" w-[44px] h-[44px]"
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={technology_integration_image}
                  alt="Technology Integration"
                  className=" w-[44px] h-[44px]"
                />
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={quality_assurance_image}
                  alt="Quality Assurance"
                  className=" w-[44px] h-[44px]"
                />
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={strategic_partnerships_image}
                  alt="Strategic Partnerships"
                  className=" w-[44px] h-[44px]"
                />
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={market_insights_image}
                  alt="Market Insights"
                  className=" w-[44px] h-[44px]"
                />
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
              <div className="pb-[1rem] flex justify-center items-center">
                <Image
                  quality={100}
                  sizes="(min-width: 768px) 100vw, 700px"
                  src={end_to_end_support_image}
                  alt="End-to-End Support"
                  className=" w-[44px] h-[44px]"
                />
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
