import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          light: "#b8a8f8",
          dark: "#7e69ab",
        },
        secondary: {
          DEFAULT: "#f4f5f7",
          foreground: "#666",
        },
        status: {
          pending: "#ffd700",
          progress: "#00bfff",
          completed: "#32cd32",
        }
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;