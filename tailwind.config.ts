import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-yellow": "rgb(221, 249, 52)",
        "yellow": "#d9ed27",
        "purple": "rgb(96, 70, 247)",
        "neon-green": "#89fc00",
        "dark-blue": "#004777"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    },
  },
  plugins: [],
};
export default config;
