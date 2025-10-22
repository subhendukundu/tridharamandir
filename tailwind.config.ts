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
          primary: "#452937",
          secondary: "#A96842",
          accent: "#E5B76A",
          dark: "#1B0A2C",
          light: "#F5EEE7"
        },
        neutral: {
          950: "#180E14",
          900: "#22151F",
          800: "#351F2C",
          700: "#4B2F3E",
          600: "#644350",
          500: "#7E5A65",
          400: "#A47E86",
          300: "#CBA7AB",
          200: "#E3CBC9",
          100: "#F1E4DE",
          50: "#F8F1EA"
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
        soft: "0px 28px 80px -45px rgba(27, 10, 44, 0.35)"
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(180deg, rgba(27, 10, 44, 0.75) 0%, rgba(69, 41, 55, 0.4) 60%, rgba(69, 41, 55, 0.25) 100%)",
        "frosted-panel": "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
