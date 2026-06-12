import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-playfair)", ...defaultTheme.fontFamily.serif]
      },
      colors: {
        brand: {
          primary: "#4B1F32",
          secondary: "#9B5538",
          accent: "#D8A94C",
          dark: "#241019",
          light: "#FFF7EA"
        },
        neutral: {
          950: "#1B0B12",
          900: "#241019",
          800: "#3B2730",
          700: "#59454A",
          600: "#6D5E5D",
          500: "#8A7B74",
          400: "#B09E90",
          300: "#D6C3AA",
          200: "#EAD8BD",
          100: "#F6E9D5",
          50: "#FFFDF8"
        },
        // Semantic colors for forms, status, alerts
        semantic: {
          success: {
            DEFAULT: "#2D5016", // Deep green aligned with temple aesthetic
            light: "#4A7C29",
            bg: "#E8F5E0"
          },
          warning: {
            DEFAULT: "#A96842", // Uses brand secondary for consistency
            light: "#C98A5F",
            bg: "#FDF3E7"
          },
          error: {
            DEFAULT: "#8B2635", // Deep red complementing brand primary
            light: "#B53D4F",
            bg: "#FDE8EA"
          },
          info: {
            DEFAULT: "#452937", // Uses brand primary
            light: "#7E5A65",
            bg: "#F8F1EA"
          }
        }
      },
      boxShadow: {
        soft: "0 24px 70px rgba(75, 31, 50, 0.12)",
        card: "0 18px 45px rgba(75, 31, 50, 0.10)"
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(90deg, rgba(36, 16, 25, 0.88) 0%, rgba(36, 16, 25, 0.58) 46%, rgba(36, 16, 25, 0.16) 100%)",
        "frosted-panel": "linear-gradient(135deg, rgba(255,253,248,0.96) 0%, rgba(255,247,234,0.88) 100%)",
        "temple-paper": "linear-gradient(180deg, #fffdf8 0%, #fff7ea 100%)"
      }
    }
  },
  plugins: []
};

export default config;
