/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        search: "hsl(280,100%,70%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
