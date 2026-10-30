import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: "#F6F3EC",
          warm: "#F0EBE0",
          deep: "#E8E1D3"
        },
        ink: {
          DEFAULT: "#1A1C14",
          dark: "#404637",
          darker: "#0A0C07",
          light: "#26281F",
          muted: "#3D3F35"
        },
        moss: {
          DEFAULT: "#718262",
          dark: "#404637",
          darker: "#2E3327",
          light: "#97B1A4",
          pale: "#C8D8C4"
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C068",
          lighter: "#F2D98A",
          dark: "#A07835",
          darker: "#7A5820",
          metallic: "#D4AF37",
          pale: "#F5EBD0",
          glow: "rgba(201, 168, 76, 0.3)"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"]
      },
      maxWidth: {
        prose: "68ch"
      },
      boxShadow: {
        "gold-sm": "0 2px 12px rgba(201, 168, 76, 0.2)",
        "gold": "0 4px 24px rgba(201, 168, 76, 0.3)",
        "gold-lg": "0 8px 40px rgba(201, 168, 76, 0.4)",
        "gold-xl": "0 12px 60px rgba(201, 168, 76, 0.5)",
        "glass": "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "luxury": "0 20px 60px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(201,168,76,0.15)",
        "card": "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(201,168,76,0.15)"
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E2C068 0%, #C9A84C 50%, #A07835 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        "dark-gradient": "linear-gradient(180deg, #404637 0%, #2E3327 100%)",
        "moss-gradient": "linear-gradient(135deg, #404637 0%, #718262 100%)",
        "sand-gradient": "linear-gradient(180deg, #F6F3EC 0%, #F0EBE0 100%)",
        "hero-gradient": "radial-gradient(ellipse at 60% 0%, rgba(201,168,76,0.12) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(64,70,55,0.12) 0%, transparent 50%)"
      },
      keyframes: {
        "gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(201,168,76,0.2)" },
          "50%": { boxShadow: "0 0 35px rgba(201,168,76,0.55)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "glow-ring": {
          "0%, 100%": { boxShadow: "0 0 0 2px rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 0 6px rgba(201,168,76,0)" }
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "gold-pulse": "gold-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "glow-ring": "glow-ring 2s ease-in-out infinite",
        "slide-right": "slide-right 1.5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
