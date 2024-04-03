/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Rubik"', "sans-serif"],
      },
      colors: {
        primary: "#4f46e5",
      },
    },
  },
  plugins: [],
};
