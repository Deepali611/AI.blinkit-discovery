import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        canvas: "#F7F6F2",
        secondary: "#F2F1EC",
        ink: "#1F1F1F",
        muted: "#5F6368",
        mutedSoft: "#8C8C8C",
        line: "#ECE8DE",
        brand: {
          yellow: "#F8CB45",
          yellowSoft: "#FFF6DD",
          green: "#54B226",
          greenHover: "#479B1F",
          nearBlack: "#1F1F1F",
          olive: "#59624B",
          oliveSoft: "#F3F5F1",
        },
        success: "#54B226",
        warning: "#F59E0B",
        risk: "#D64545",
        riskSoft: "#FFF5F5",
      },
      borderRadius: {
        lg: "18px", // Card radius
        xl: "22px", // Panel radius
        btn: "14px", // Button & Input radius
      },
      boxShadow: {
        standard: "0 6px 30px rgba(0,0,0,0.04)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
