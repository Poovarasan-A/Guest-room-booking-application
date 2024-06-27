/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "370px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1300px",
      "2xl": "1400px",
    },
    extend: {},
  },
  plugins: [],
};
