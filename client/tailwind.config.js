/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        canvas: "#FAFAF9", // warm neutral page background
        ink: {
          DEFAULT: "#1C1917", // near-black headings
          soft: "#44403C",
          muted: "#78716C",
          faint: "#A8A29E",
        },
        line: "#E7E5E4", // hairline borders
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,25,23,0.04), 0 4px 16px rgba(28,25,23,0.05)",
        "card-hover":
          "0 2px 4px rgba(28,25,23,0.06), 0 12px 32px rgba(28,25,23,0.10)",
        modal: "0 24px 64px rgba(28,25,23,0.20)",
        focus: "0 0 0 4px rgba(99,102,241,0.15)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
