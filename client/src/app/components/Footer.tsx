"use client";

import React, { FC } from "react";
import { plus_Jakarta_Sans } from "../utils/fonts";
import zhen_logo from "../../assets/ZHENArtboard 1 copy@3x.png";
import twitter_x from "../../assets/twitter.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer: FC = () => {
  const pathname = usePathname();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section
      className={`py-12 bg-gradient-to-r from-fuchsia-600 to-blue-600   ${plus_Jakarta_Sans.className}`}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            {/* <img className="w-auto mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo-alt-2.svg" alt="" /> */}

            <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">
              &copy; Copyright Zhen group {new Date().getFullYear()}
            </p>
          </div>

          <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
              <li>
                <Link
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  href={`/products`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  href={`/about-us`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  href={`/contact-us`}
                >
                  Contact us
                </Link>
              </li>
            </ul>

            <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>

            <ul className="flex items-center justify-center space-x-8 xl:justify-end">
              <li>
                <a
                  href="https://twitter.com/zhengroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/zhen_group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <button
                  onClick={handleScrollToTop}
                  className=" cursor-pointer py-[0.5rem] px-[0.3rem] rounded-[0.5rem] text-white border-x-primary_black bg-primary_black "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
