/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      customText: {
        color: "#0000FF",
        backgroundColor: "grey",
        fontStyle: "italic",
      }
    },
  },
  plugins: [],
}

