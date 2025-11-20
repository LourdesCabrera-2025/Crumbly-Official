/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",

    // Material Tailwind
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",

    // shadcn/ui
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
