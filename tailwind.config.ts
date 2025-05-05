import type { Config } from 'tailwindcss'

export default {
      content: ["./src/**/*.{js,ts,tsx,jsx}"],
      theme: {
        extend: {
          colors: {
            Branding: {
              backgroundPrimary: "#181D27",
              cardPrimary: "#293056",
              textHeading: "#ffffff",
              textPrimary: "#ffffff",
              textSecondary: "#9a9a9a",
              textAccent: "#D4AF37",
              input: "#242424",
              buttonPrimary: '#403f44',
              buttonProceed: '#D4AF37',
            },
          },
          fontFamily: {
            "open-sans": ["Open Sans", "sans-serif"],
            lato: ["Lato", "sans-serif"],
            inter: ["Inter", "sans-serif"],
            DMSans: ["DM Sans", "sans-serif"],
          },
          fontWeight: {
            normal: "400",
            semibold: "600",
            bold: "700",
            extrabold: "900",
          },
        },
      },
      plugins: [],
    } satisfies Config;