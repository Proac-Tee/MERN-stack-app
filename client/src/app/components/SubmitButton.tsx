"use client";

import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";
import loading_image from "../../assets/loading.svg";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-[160px] h-[32px] rounded-[6px] py-[4px] pl-[8px] pr-[12px] flex justify-center items-center gap-[0.5rem] bg-primary_color text-white font-semibold leading-[1.5rem] text-[0.875rem] hover:brightness-75"
    >
      {pending ? (
        <span className="w-[18px] h-[18px]">
          <Image
            quality={70}
            sizes="(min-width: 768px) 100vw, 700px"
            src={loading_image}
            alt="Global sorucing image"
            className=" w-[18px] h-[18px]"
          />
        </span>
      ) : (
        "Add product"
      )}
    </button>
  );
};

export default SubmitButton;
