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
        canvas: "#FAF8F5",
        ink: "#1E221F",
        muted: "#6B7566",
        line: "#E4E8E1",
        brand: {
          green: "#00B140",
          greenDark: "#028A34",
          greenSoft: "#E7F8ED",
          yellow: "#F8CB46",
          yellowSoft: "#FFF6DD",
        },
        risk: {
          red: "#8B263E",
          redSoft: "#FDF2F4",
          blue: "#3B5BDB",
          purple: "#7C5CBF",
        },
      },
      borderRadius: {
        lg: "12px",
        xl: "14px",
        "2xl": "16px",
      },
      boxShadow: {
        hero: "0 10px 28px rgba(22,32,26,.035)",
        featured: "0 14px 34px rgba(22,32,26,.055)",
        standard: "0 5px 16px rgba(22,32,26,.025)",
        subtle: "0 1px 2px rgba(22,32,26,.015)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
