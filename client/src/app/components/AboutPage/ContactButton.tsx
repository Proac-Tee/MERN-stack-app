"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const ContactButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className={`rounded-[6.25rem] bg-primary_color p-[1rem] text-white font-[600] ${
          pending && "brightness-75 cursor-not-allowed "
        } `}
      >
        {pending ? "Sending..." : "Send Message "}
      </button>
    </>
  );
};

export default ContactButton;
