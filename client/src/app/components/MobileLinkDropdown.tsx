"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

const MobileLinkDropdown = ({ onClick, isOpen }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isLoading } = useKindeBrowserClient();

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
      <section className="px-[3rem]  flex flex-col gap-[20px]">
        {user && (
          <div>
            <Link
              href={"/"}
              onClick={onClick}
              className="flex items-center gap-[1rem] "
            >
              {user.picture ? (
                <div className="relative w-[32px] h-[32px] border-[1px] border-gray-200 rounded-full ">
                  <Image
                    quality={100}
                    fill
                    sizes="(min-width: 768px) 100vw, 700px"
                    src={user.picture}
                    priority
                    alt="background image"
                    className="rounded-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 5%",
                    }}
                  />
                </div>
              ) : (
                <div className="relative w-[32px] h-[32px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-10 h-10 text-gray-400 -left-1"
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
              )}
              <p className="flex justify-between gap-[0.3rem] text-[16px] items-center font-[600] text-white">
                {user.given_name}
              </p>
            </Link>

            <div className="py-[1.5rem]">
              <ul className="flex flex-col text-white gap-[20px] px-[0] py-[1.5rem] border-b-[1px] border-b-[#FFFFFF33] border-t-[1px] border-t-[#FFFFFF33]">
                {user && (
                  <>
                    <li>
                      <Link
                        onClick={onClick}
                        href={`/admin`}
                        className={`h-[40px] cursor-pointer hover:text-secondary_color transition-all duration-300 ease-in-out  flex gap-[1rem] text-[1rem] font-[500] items-center ${
                          pathname === "/admin" && "text-secondary_color"
                        }  `}
                      >
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.50008 14.3753C7.1549 14.3753 6.87508 14.6551 6.87508 15.0003C6.87508 15.3455 7.1549 15.6253 7.50008 15.6253H12.5001C12.8453 15.6253 13.1251 15.3455 13.1251 15.0003C13.1251 14.6551 12.8453 14.3753 12.5001 14.3753H7.50008Z"
                              fill="#fff"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.0001 1.04199C9.40998 1.04199 8.87386 1.21101 8.29221 1.49386C7.72995 1.76728 7.08043 2.1704 6.26913 2.67393L4.54699 3.74274C3.77932 4.21917 3.16462 4.60066 2.69083 4.9635C2.20021 5.33923 1.82337 5.7219 1.55117 6.21918C1.27954 6.71543 1.15722 7.24344 1.09857 7.86758C1.04174 8.47244 1.04174 9.21209 1.04175 10.1397V11.4835C1.04174 13.0701 1.04173 14.3225 1.169 15.3017C1.29956 16.3061 1.57388 17.1171 2.19371 17.7582C2.8164 18.4023 3.6088 18.69 4.58975 18.8265C5.54049 18.9587 6.75472 18.9587 8.28495 18.9587H11.7152C13.2454 18.9587 14.4597 18.9587 15.4104 18.8265C16.3914 18.69 17.1838 18.4023 17.8064 17.7582C18.4263 17.1171 18.7006 16.3061 18.8312 15.3017C18.9584 14.3225 18.9584 13.0701 18.9584 11.4835V10.1397C18.9584 9.21211 18.9584 8.47243 18.9016 7.86758C18.8429 7.24344 18.7206 6.71543 18.449 6.21918C18.1768 5.7219 17.8 5.33923 17.3093 4.9635C16.8355 4.60066 16.2209 4.21917 15.4532 3.74275L13.731 2.67392C12.9197 2.1704 12.2702 1.76728 11.708 1.49386C11.1263 1.21101 10.5902 1.04199 10.0001 1.04199ZM6.89969 3.75376C7.74615 3.22842 8.34133 2.85994 8.83887 2.61799C9.3236 2.38226 9.6669 2.29199 10.0001 2.29199C10.3333 2.29199 10.6766 2.38226 11.1613 2.61799C11.6588 2.85994 12.254 3.22841 13.1005 3.75376L14.7671 4.78814C15.5678 5.28507 16.13 5.63478 16.5493 5.95591C16.9573 6.26836 17.192 6.52621 17.3525 6.81937C17.5135 7.11357 17.6076 7.45753 17.6571 7.98452C17.7078 8.52415 17.7084 9.20517 17.7084 10.1703V11.4378C17.7084 13.0803 17.7072 14.2513 17.5916 15.1406C17.4781 16.0139 17.2642 16.5206 16.9078 16.8894C16.5541 17.2552 16.0727 17.4723 15.2382 17.5884C14.3836 17.7072 13.2564 17.7087 11.6667 17.7087H8.33341C6.74381 17.7087 5.61661 17.7072 4.76193 17.5884C3.92746 17.4723 3.44603 17.2552 3.09241 16.8894C2.73592 16.5206 2.52209 16.0139 2.40857 15.1406C2.29299 14.2513 2.29175 13.0803 2.29175 11.4378V10.1703C2.29175 9.20517 2.29238 8.52415 2.34309 7.98452C2.39261 7.45753 2.48662 7.11357 2.64766 6.81937C2.80813 6.52621 3.04285 6.26836 3.45085 5.95591C3.87016 5.63478 4.43233 5.28507 5.23302 4.78814L6.89969 3.75376Z"
                              fill="#fff"
                            />
                          </svg>
                        </span>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={onClick}
                        href={`/admin/chat`}
                        className={`h-[40px] cursor-pointer hover:text-secondary_color transition-all duration-300 ease-in-out  flex gap-[1.1rem] text-[1rem] font-[500] items-center ${
                          pathname === "admin/chat" && "text-secondary_color"
                        } `}
                      >
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.2864 2.70801H11.7138C13.2452 2.70799 14.4583 2.70798 15.4076 2.83562C16.3846 2.96698 17.1754 3.24374 17.799 3.86738C18.4227 4.49101 18.6994 5.2818 18.8308 6.25882C18.9584 7.20817 18.9584 8.4212 18.9584 9.95267V10.0467C18.9584 11.5782 18.9584 12.7912 18.8308 13.7405C18.6994 14.7175 18.4227 15.5083 17.799 16.132C17.1754 16.7556 16.3846 17.0324 15.4076 17.1637C14.4583 17.2914 13.2452 17.2914 11.7138 17.2913H8.28641C6.75494 17.2914 5.54191 17.2914 4.59256 17.1637C3.61554 17.0324 2.82475 16.7556 2.20112 16.132C1.57748 15.5083 1.30072 14.7175 1.16936 13.7405C1.04172 12.7912 1.04174 11.5782 1.04175 10.0467V9.95266C1.04174 8.42119 1.04172 7.20817 1.16936 6.25882C1.30072 5.2818 1.57748 4.49101 2.20112 3.86738C2.82475 3.24374 3.61554 2.96698 4.59256 2.83562C5.54191 2.70798 6.75493 2.70799 8.2864 2.70801ZM4.75912 4.07447C3.92071 4.18719 3.43768 4.39859 3.085 4.75126C2.73233 5.10394 2.52094 5.58697 2.40821 6.42538C2.29308 7.28177 2.29175 8.41066 2.29175 9.99968C2.29175 11.5887 2.29308 12.7176 2.40821 13.574C2.52094 14.4124 2.73233 14.8954 3.085 15.2481C3.43768 15.6008 3.92071 15.8122 4.75912 15.9249C5.61551 16.04 6.7444 16.0413 8.33341 16.0413H11.6667C13.2558 16.0413 14.3847 16.04 15.241 15.9249C16.0794 15.8122 16.5625 15.6008 16.9152 15.2481C17.2678 14.8954 17.4792 14.4124 17.5919 13.574C17.7071 12.7176 17.7084 11.5887 17.7084 9.99968C17.7084 8.41066 17.7071 7.28177 17.5919 6.42538C17.4792 5.58697 17.2678 5.10394 16.9152 4.75126C16.5625 4.39859 16.0794 4.18719 15.241 4.07447C14.3847 3.95934 13.2558 3.95801 11.6667 3.95801H8.33342C6.7444 3.95801 5.61551 3.95934 4.75912 4.07447ZM4.51994 6.26623C4.74092 6.00105 5.13502 5.96523 5.4002 6.1862L7.19928 7.68544C7.97674 8.33332 8.51652 8.78169 8.97223 9.07478C9.41337 9.3585 9.71252 9.45374 10.0001 9.45374C10.2876 9.45374 10.5868 9.3585 11.0279 9.07478C11.4836 8.78169 12.0234 8.33332 12.8009 7.68543L14.6 6.1862C14.8651 5.96523 15.2592 6.00105 15.4802 6.26623C15.7012 6.5314 15.6654 6.9255 15.4002 7.14648L13.5698 8.67182C12.8312 9.28737 12.2325 9.78628 11.7041 10.1261C11.1537 10.4801 10.6176 10.7037 10.0001 10.7037C9.38252 10.7037 8.84648 10.4801 8.29606 10.1261C7.76768 9.78628 7.16901 9.28737 6.43038 8.67183L4.59997 7.14648C4.33479 6.9255 4.29897 6.5314 4.51994 6.26623Z"
                              fill="#fff"
                            />
                          </svg>
                        </span>
                        Messages
                      </Link>
                    </li>

                    <li>
                      <LogoutLink
                        onClick={onClick}
                        className="h-[40px] cursor-pointer rounded-b-[0.5rem] text-white  hover:text-secondary_color transition-all duration-300 ease-in-out  flex gap-[1.3rem] text-[1rem] font-[500] items-center"
                      >
                        <span>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4545 0.0419926C10.3148 0.0419758 9.39619 0.0419622 8.67372 0.139096C7.92363 0.239943 7.29207 0.455688 6.79047 0.957285C6.35303 1.39473 6.132 1.93229 6.01597 2.56395C5.90322 3.17775 5.88165 3.92891 5.87664 4.83018C5.87472 5.17535 6.15298 5.45673 6.49815 5.45865C6.84332 5.46057 7.1247 5.18231 7.12662 4.83714C7.13169 3.92589 7.15536 3.27999 7.2454 2.78978C7.33216 2.31744 7.47148 2.04405 7.67436 1.84117C7.90499 1.61053 8.2288 1.46016 8.84028 1.37795C9.46974 1.29332 10.304 1.29199 11.5002 1.29199H12.3335C13.5297 1.29199 14.364 1.29332 14.9934 1.37795C15.6049 1.46016 15.9287 1.61053 16.1593 1.84117C16.39 2.0718 16.5403 2.39561 16.6226 3.00709C16.7072 3.63655 16.7085 4.47081 16.7085 5.66699V12.3337C16.7085 13.5298 16.7072 14.3641 16.6226 14.9936C16.5403 15.605 16.39 15.9289 16.1593 16.1595C15.9287 16.3901 15.6049 16.5405 14.9934 16.6227C14.364 16.7073 13.5297 16.7087 12.3335 16.7087H11.5002C10.304 16.7087 9.46974 16.7073 8.84028 16.6227C8.2288 16.5405 7.90499 16.3901 7.67436 16.1595C7.47148 15.9566 7.33216 15.6832 7.2454 15.2109C7.15536 14.7207 7.13169 14.0748 7.12662 13.1635C7.1247 12.8183 6.84332 12.5401 6.49815 12.542C6.15298 12.5439 5.87472 12.8253 5.87664 13.1705C5.88165 14.0717 5.90322 14.8229 6.01597 15.4367C6.132 16.0684 6.35303 16.6059 6.79047 17.0434C7.29207 17.545 7.92363 17.7607 8.67372 17.8616C9.39619 17.9587 10.3148 17.9587 11.4545 17.9587H12.3792C13.5189 17.9587 14.4375 17.9587 15.16 17.8616C15.9101 17.7607 16.5416 17.545 17.0432 17.0434C17.5448 16.5418 17.7606 15.9102 17.8614 15.1601C17.9585 14.4376 17.9585 13.519 17.9585 12.3794V5.62127C17.9585 4.48161 17.9585 3.56301 17.8614 2.84053C17.7606 2.09044 17.5448 1.45888 17.0432 0.957285C16.5416 0.455688 15.9101 0.239943 15.16 0.139096C14.4375 0.0419622 13.5189 0.0419758 12.3793 0.0419926H11.4545Z"
                              fill="#fff"
                            />
                            <path
                              d="M0.66748 8.37451C0.322302 8.37451 0.0424805 8.65434 0.0424805 8.99951C0.0424805 9.34469 0.322302 9.62451 0.66748 9.62451H10.6446L9.01074 11.025C8.74866 11.2496 8.71831 11.6442 8.94295 11.9063C9.16758 12.1683 9.56215 12.1987 9.82423 11.974L12.7409 9.47405C12.8794 9.35531 12.9591 9.18196 12.9591 8.99951C12.9591 8.81706 12.8794 8.64372 12.7409 8.52498L9.82423 6.02498C9.56215 5.80034 9.16758 5.83069 8.94295 6.09277C8.71831 6.35485 8.74866 6.74941 9.01074 6.97405L10.6446 8.37451H0.66748Z"
                              fill="#fff"
                            />
                          </svg>
                        </span>
                        Log out
                      </LogoutLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        <ul className="flex flex-col gap-[2.5rem]   text-white text-[1rem] w-auto">
          <li>
            <Link
              onClick={onClick}
              className={`underline-offset-[5px] hover:text-secondary_color font-[500] transition ease-in-out duration-300 ${
                pathname === "/about-us"
                  ? "text-secondary_color underline font-[700] decoration-2 "
                  : ""
              }`}
              href="/about-us"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              onClick={onClick}
              className={`underline-offset-[5px] hover:text-secondary_color font-[500] transition ease-in-out duration-300 ${
                pathname.startsWith("/products")
                  ? "text-secondary_color underline font-[700] decoration-2"
                  : ""
              }`}
              href="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={onClick}
              className={`underline-offset-[5px] hover:text-secondary_color font-[500] transition ease-in-out duration-300 ${
                pathname === "/contact-us"
                  ? "text-secondary_color underline font-[700] decoration-2 "
                  : ""
              }`}
              href="/contact-us"
            >
              Contact
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MobileLinkDropdown;
