/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#263146",
        secondary: "#f56565",
        tertiary: "#ED9D95",
        success: "#69E075",
        error: "#DE4545",
        warning: "#f2c94d",
        danger: "#f56565",
        info: "#6366f1",
        dim: "#BABABA",
      },
      backgroundColor: {
        main: "#010117",
        accent: "#0D0D25",
      },
      textColor: {
        main: "#E9E8E9",
        dim: "#BABABA",
        placeholder: "#7F7F7F",
        accent: "#0D0D25",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
