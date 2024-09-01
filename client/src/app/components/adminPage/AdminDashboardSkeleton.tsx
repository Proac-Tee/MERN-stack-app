"use client";
import Image from "next/image";
import React from "react";

import dashboardSkeleton from "../../../assets/dashboard_skeleton_image.png";
import { useAppContext } from "@/app/context/AppContext";

const AdminDashboardSkeleton = () => {
  const { setShowModal } = useAppContext();
  return (
    <section className="flex justify-center items-center min-h-[70vh] ">
      <div className="flex flex-col justify-center items-center">
        <div className="relative h-[142.37px] w-[183px] mb-[1.5rem]  ">
          <Image
            quality={100}
            fill
            sizes="(min-width: 768px) 100vw, 700px"
            src={dashboardSkeleton}
            priority
            alt="background image"
            className="rounded-[3rem]"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <h5 className="font-[700] text-[1.5rem] text-center">
          No Product Found
        </h5>
        <p className="font-[400] text-[1rem] pb-[2.5rem] text-center">
          Add and manage all your products here.
        </p>

        <button
          onClick={() => setShowModal("addProducts")}
          className="text-white  bg-primary_color  rounded-[50px] "
        >
          <p className="flex justify-center items-center px-[2rem] py-[0.75rem] gap-[0.75rem] h-[44px] font-[700] text-[0.875rem]">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1243 7.49984C11.1243 7.15466 10.8445 6.87484 10.4993 6.87484C10.1542 6.87484 9.87435 7.15466 9.87435 7.49984L9.87435 9.37486H7.99935C7.65417 9.37486 7.37435 9.65468 7.37435 9.99986C7.37435 10.345 7.65417 10.6249 7.99935 10.6249H9.87435V12.4998C9.87435 12.845 10.1542 13.1248 10.4993 13.1248C10.8445 13.1248 11.1243 12.845 11.1243 12.4998L11.1243 10.6249H12.9993C13.3445 10.6249 13.6243 10.345 13.6243 9.99986C13.6243 9.65468 13.3445 9.37486 12.9993 9.37486H11.1243V7.49984Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4993 1.0415C5.5518 1.0415 1.54102 5.05229 1.54102 9.99984C1.54102 14.9474 5.5518 18.9582 10.4993 18.9582C15.4469 18.9582 19.4577 14.9474 19.4577 9.99984C19.4577 5.05229 15.4469 1.0415 10.4993 1.0415ZM2.79102 9.99984C2.79102 5.74264 6.24215 2.2915 10.4993 2.2915C14.7565 2.2915 18.2077 5.74264 18.2077 9.99984C18.2077 14.257 14.7565 17.7082 10.4993 17.7082C6.24215 17.7082 2.79102 14.257 2.79102 9.99984Z"
                fill="white"
              />
            </svg>
            Add Product
          </p>
        </button>
      </div>
    </section>
  );
};

export default AdminDashboardSkeleton;
