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
        canvas: "#F7F8F6",
        ink: "#16201A",
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
          red: "#D93025",
          redSoft: "#FCEAE9",
          blue: "#3B5BDB",
          purple: "#7C5CBF",
        },
      },
      borderRadius: {
        lg: "8px",
        xl: "8px",
        "2xl": "8px",
      },
      boxShadow: {
        hero: "0 10px 28px rgba(22,32,26,.055)",
        featured: "0 14px 34px rgba(22,32,26,.075)",
        standard: "0 5px 16px rgba(22,32,26,.045)",
        subtle: "0 1px 2px rgba(22,32,26,.035)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
