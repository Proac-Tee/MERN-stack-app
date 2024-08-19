import { inter, plus_Jakarta_Sans } from "@/app/utils/fonts";
import Link from "next/link";
import React, { FC } from "react";
import hero_image from "../../../assets/hero_image.png";
import Image from "next/image";

const Hero: FC = () => {
  return (
    <section className="relative w-[100%] h-[100%]">
      <section className="flex justify-between items-center flex-col lg:flex-row ">
        <div className="w-[100%] lg:w-[381px] xl:w-[481px] px-[1rem] flex flex-col gap-[1.5rem]">
          <h1
            className={`text-[#18181B] leading-[1.75rem] md:leading-[3.125rem] xl:leading-[4.125rem] font-extrabold text-[1.625rem] md:text-[2.625rem] xl:text-[3.625rem] ${plus_Jakarta_Sans.className}`}
          >
            Your Wholesale Distribution Partner
          </h1>

          <p
            className={`text-[#52525b] font-[400] text-[0.875rem] md:text-[1rem] max-w-[586px] leading-[1rem] md:leading-[1.625rem] ${inter.className}`}
          >
            Connecting the right partners to fuel your business growth with
            seamless, reliable, and efficient distribution solutions.
          </p>
          <div className="flex items-center gap-[2rem]">
            <Link
              href={`/contact-us`}
              className={`bg-primary_color text-white w-fit h-[3.25rem] py-[1.5rem] px-[3rem] rounded-[10px] flex justify-center items-center font-bold text-[0.875rem] md:text-[1.125rem] leading-[24px] hover:brightness-75 transition-all ease-in-out duration-300 ${plus_Jakarta_Sans.className}`}
            >
              Contact Us
            </Link>
            <Link
              className={`text-[#18181B] text-[0.75rem] md:text-[0.875rem] leading-[1.375rem] font-bold hover:text-primary_color transition-all ease-in-out duration-300 ${plus_Jakarta_Sans.className}`}
              href={`/products`}
            >
              Explore brands
            </Link>
          </div>
          <div className="flex lg:justify-between gap-[3rem] items-center">
            <div className="flex justify-between items-center gap-[0.5rem]">
              <p
                className={`font-medium text-[1.825rem] md:text-[2.625rem] leading-[62px]  ${plus_Jakarta_Sans.className}`}
              >
                35+
              </p>
              <span
                className={`text-[0.7125rem] md:text-[0.8125rem] leading-[16px] md:leading-[20px] font-[400] w-[77px] ${plus_Jakarta_Sans.className}`}
              >
                Brands Available
              </span>
            </div>
            <div className="flex justify-between items-center gap-[0.5rem]">
              <p
                className={`font-medium text-[1.825rem] md:text-[2.625rem] leading-[62px]  ${plus_Jakarta_Sans.className}`}
              >
                10223+
              </p>
              <span
                className={`text-[0.7125rem] md:text-[0.8125rem] leading-[16px] md:leading-[20px] font-[400] w-[77px] ${plus_Jakarta_Sans.className}`}
              >
                Products Available
              </span>
            </div>
          </div>
        </div>
        <div
          className="relative w-[100%] h-[400px] lg:h-[400px] xl:w-[554px] xl:h-[647px] lg:flex-1 
    "
        >
          <Image
            quality={100}
            fill
            sizes="(min-width: 768px) 100vw, 700px"
            src={hero_image}
            alt="hero image"
          />
        </div>
      </section>
    </section>
  );
};

export default Hero;
