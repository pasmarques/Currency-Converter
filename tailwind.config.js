/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#16a34a",
        bg: "#0f172a",
        cardBg: "#1e293b",
        inputBg: "#334155",
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        disabled: "#334155",
      },
    },
  },
  plugins: [],
};
