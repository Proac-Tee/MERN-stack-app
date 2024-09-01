"use client";

import DOMPurify from "dompurify";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { contactUsErrors, contactUsSchema } from "@/app/utils/types";
import ContactButton from "./ContactButton";

const ContactForm: React.FC = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formErrors, setFormErrors] = useState<contactUsErrors>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const maxCharCount = 1000;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;

    // Check if the character count exceeds the limit
    if (content.length <= maxCharCount) {
      setMessageContent(content);
      // Count the characters
      setCharCount(content.length);
    }
  };

  const formhandler = async (formData: FormData) => {
    setSubmitError("");
    // Convert FormData to a plain object for client-side validation
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = DOMPurify.sanitize(value as string);
    });

    const result = contactUsSchema.safeParse(data);

    if (!result.success) {
      const errorObj: { [key: string]: string } = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        errorObj[fieldName] = issue.message;
      });

      setFormErrors(errorObj);

      return;
    } else {
      try {
        const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const userId = process.env.NEXT_PUBLIC_USER_ID;

        if (!serviceId || !templateId || !userId) {
          throw new Error("Email service configuration missing.");
        }

        if (!ref.current) {
          return;
        }

        await emailjs.sendForm(serviceId, templateId, ref.current, userId);

        setMessageContent("");
        setCharCount(0);
        setFormErrors({});
        toast.success("Message Sent Sucessfully"); // Displays a success message

        ref.current?.reset();
      } catch (error: any) {
        // Handle  errors
        setSubmitError("An error occurred during form submission.");
        toast.error("Error sending Message"); // Displays an error
      }
    }
  };

  return (
    <>
      <form ref={ref} action={formhandler} className="flex flex-col gap-[1rem]">
        {submitError && (
          <p className="w-[100%] p-[0.5rem] m-auto flex justify-center items-center text-red-500 bg-red-200 rounded-sm my-[0.5rem]">
            {submitError}
          </p>
        )}
        <div>
          <label htmlFor="firstName" className="font-[500] text-[0.75rem] ">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            className="border-[1px] focus:outline-none border-gray-200  w-[100%] rounded-[6.25rem] h-[3rem] placeholder:text-[0.875rem] text-[1rem] p-[1rem]  "
          />
          <p className="text-[0.75rem] text-red-500 pt-[0.2rem] ">
            {formErrors.firstName}
          </p>
        </div>

        <div>
          <label htmlFor="lastName" className="font-[500] text-[0.75rem] ">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            className="border-[1px] focus:outline-none border-gray-200  w-[100%] rounded-[6.25rem] h-[3rem]  placeholder:text-[0.875rem] text-[1rem] p-[1rem]  "
          />
          <p className="text-[0.75rem] text-red-500 pt-[0.2rem] ">
            {formErrors.lastName}
          </p>
        </div>

        <div>
          <label htmlFor="email" className="font-[500] text-[0.75rem] ">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            className="border-[1px] focus:outline-none border-gray-200  w-[100%] rounded-[6.25rem] h-[3rem] placeholder:text-[0.875rem] text-[1rem] p-[1rem]  "
          />
          <p className="text-[0.75rem] text-red-500 pt-[0.2rem] ">
            {formErrors.email}
          </p>
        </div>

        <div>
          <label
            htmlFor="messageContent"
            className="font-[500] text-[0.75rem] "
          >
            Message
          </label>
          <textarea
            id="messageContent"
            placeholder="Type your message here.."
            className="border-[1px]  focus:outline-none border-gray-200  w-[100%] rounded-[1.25rem] 
      min-h-[5rem] max-h-[10rem] placeholder:text-[0.875rem] text-[1rem] p-[1rem]  "
            name="messageContent"
            value={messageContent}
            onChange={handleInputChange}
            disabled={charCount > maxCharCount}
          />
          <p className="text-[0.75rem] text-red-500 pt-[0.2rem] ">
            {formErrors.messageContent}
          </p>

          <div>
            <p className="text-gray-500 text-sm mt-2">
              {charCount} / {maxCharCount} characters
            </p>
          </div>
        </div>
        <ContactButton />
      </form>
    </>
  );
};

export default ContactForm;
