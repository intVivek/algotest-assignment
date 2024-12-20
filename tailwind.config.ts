import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: "#fafafa",
        gray: "#d1d5db",
        graySkeleton: "#eaeaea",
        grayInk: '#737373',
        yellow: '#fffbe5',
        lightBlue: '#3c81af1a',
        blue: '#0b619b',
        blueInk: '#0085ff',
      },

      boxShadow: {
        "outline-gray-300": "0 0 0px 1px rgba(209, 213, 219, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
