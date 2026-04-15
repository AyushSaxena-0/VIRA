/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Sora", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 18px 45px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.22) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
