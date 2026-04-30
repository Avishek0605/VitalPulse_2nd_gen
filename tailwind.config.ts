import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071220",
        card: "#0F2033",
        teal: "#00D4FF",
        stable: "#22C55E",
        critical: "#EF4444",
        warning: "#F59E0B"
      }
    }
  },
  plugins: []
} satisfies Config;
