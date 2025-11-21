/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
import "./src/types/daisyui";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      colors: {
        primary: "#1d4ed8",   
        secondary: "#9333ea",
      },
    },
  },
  plugins: [
    require("daisyui"), 
  ],
  daisyui: {
    themes: [
      {
        dashboard: {
          primary: "#1d4ed8",
          secondary: "#9333ea",
          accent: "#f59e0b",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
  },
});
