import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem"
      },
      screens: {
        "2xl": "1320px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        support: "hsl(var(--support))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))"
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      },
      fontSize: {
        display: ["2.125rem", { lineHeight: "2.75rem", fontWeight: "700" }],
        "display-lg": ["2.5rem", { lineHeight: "3.25rem", fontWeight: "700" }],
        "heading-2": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "heading-3": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        body: ["0.9375rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.25rem", fontWeight: "500" }]
      },
      borderRadius: {
        lg: "var(--radius-control)",
        md: "calc(var(--radius-control) - 2px)",
        sm: "calc(var(--radius-control) - 4px)",
        xl: "var(--radius-surface)",
        "2xl": "calc(var(--radius-surface) + 0.5rem)"
      },
      boxShadow: {
        card: "var(--shadow-card)",
        hover: "var(--shadow-card-hover)",
        outline: "0 0 0 4px hsl(var(--primary) / 0.15)"
      },
      spacing: {
        3.5: "0.875rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        7.5: "1.875rem",
        13: "3.25rem"
      },
      maxWidth: {
        "2xl": "36rem"
      },
      transitionTimingFunction: {
        premium: "var(--ease-premium)"
      },
      transitionDuration: {
        200: "200ms",
        250: "250ms"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-up": {
          "0%": { opacity: "0.75", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.4s var(--ease-premium) forwards",
        "scale-in": "scale-in 0.3s var(--ease-premium) forwards",
        shimmer: "shimmer 2.4s linear infinite"
      }
    }
  },
  plugins: [animate]
};

export default config;
