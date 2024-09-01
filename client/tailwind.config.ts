import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "767px",
        lg: "991px",
        xl: "1199px",
        mxl: "1440px",
        xlg: "1919px",
        xxl: "1920px",
      },
      colors: {
        primary_color: "#D02027",
        secondary_color: "#808285",
        primary_black: "#333333",
        secondary_black: "#252525",
        primary_gray: "#D9D9D9",
        secondary_gray: "#252525CC",
        secondary_whie: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default withUt(config);
