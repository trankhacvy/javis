const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  prefix: "jv-",
  darkMode: 'class',
  // important: true,
  theme: {
    extend: {
      colors: {
        primary: colors.rose,
        gray: {
          100: "#F9FAFB",
          200: "#F4F6F8",
          300: "#DFE3E8",
          400: "#C4CDD5",
          500: "#919EAB",
          600: "#637381",
          700: "#454F5B",
          800: "#212B36",
          900: "#161C24",
        },
      },
      boxShadow: {
        card: "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        "card-dark":
          "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 12px 24px -4px rgba(0, 0, 0, 0.12)",
        dialog: "-40px 40px 80px -8px rgba(145, 158, 171, 0.24)",
        "dialog-dark": "-40px 40px 80px -8px rgba(0, 0, 0, 0.24)",
        dropdown:
          "0px 0px 2px rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
        "dropdown-dark":
          "0px 0px 2px rgba(0, 0, 0, 0.24), -20px 20px 40px -4px rgba(0, 0, 0, 0.24)",
      },
      opacity: {
        8: ".08",
        16: ".16",
        24: ".24",
      },
      animation: {
        slide: "slide 250ms ease-in",
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translate3d(-50%, 25%, 0)",
            opacity: "0",
            scale: "0.9",
          },
          "100%": {
            transform: "translate3d(-50%, 0, 0)",
            opacity: "0.9",
            scale: "1",
          },
        },
        dotsLoader: {
          "0%": {
            opacity: "1",
          },
          "50%, 100%": {
            opacity: "0.15",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
