/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    maxWidth: {
      content: "max-content",
    },
    extend: {
      flex: {
        2: "2 2 0%",
      },
    },
    colors: {
      bgColor: "rgba(17,25,40,0.75)",
      borderColor: "rgba(255,255,255,0.124)",
    },
  },
  plugins: [],
};
