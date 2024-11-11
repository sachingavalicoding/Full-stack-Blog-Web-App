/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your source files
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: "#39FF14",
        neonPink: "#FF007F",
        neonBlue: "#00FFFF",
        neonPurple: "#9400D3",
        neonYellow: "#FFFF00",
      },
      boxShadow: {
        neon: "0 0 5px 2px rgba(57, 255, 20, 0.7), 0 0 10px 5px rgba(57, 255, 20, 0.7)",
      },
    },
  },
  plugins: [],
};

