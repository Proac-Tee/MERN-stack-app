import { inter, plus_Jakarta_Sans } from "@/app/utils/fonts";
import React from "react";

const Guide = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold leading-tight text-primary_black sm:text-4xl lg:text-5xl ${plus_Jakarta_Sans.className}`}
          >
            How does it work?
          </h2>
          <p
            className={`max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600 ${inter.className}`}
          >
            Turnkey Brand Curation in Three Easy Steps
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <svg
              width="875"
              height="48"
              viewBox="0 0 875 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                stroke="#D4D4D8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 12"
              />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 1 </span>
              </div>
              <h3
                className={`mt-6 text-xl font-semibold leading-tight text-primary_black md:mt-10 ${plus_Jakarta_Sans.className}`}
              >
                Customize your vision
              </h3>
              <p className={`mt-4 text-base text-gray-600 ${inter.className}`}>
                Start by exploring our product page, where you can browse
                through a wide range of options tailored to your needs. Use our
                powerful filters to easily find the products that align with
                your business requirements.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 2 </span>
              </div>
              <h3
                className={`mt-6 text-xl font-semibold leading-tight text-primary_black md:mt-10 ${plus_Jakarta_Sans.className}`}
              >
                Streamline procurement
              </h3>
              <p className={`mt-4 text-base text-gray-600 ${inter.className}`}>
                Once you&rsquo;ve selected your products, reach out to our
                support team to discuss any customizations or specific needs.
                Our team is here to help ensure everything is perfectly aligned
                with your vision before finalizing your order.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 3 </span>
              </div>
              <h3
                className={`mt-6 text-xl font-semibold leading-tight text-primary_black md:mt-10 ${plus_Jakarta_Sans.className}`}
              >
                Execute Flawlessly
              </h3>
              <p className={`mt-4 text-base text-gray-600 ${inter.className}`}>
                After confirming the details and making the payment, your order
                will be processed and shipped. You&rsquo;ll receive regular
                updates to track your order&rsquo;s journey until it arrives at
                your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
