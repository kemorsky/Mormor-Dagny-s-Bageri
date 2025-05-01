import type { Config } from 'tailwindcss'

export default {
      content: ["./src/**/*.{js,ts,tsx,jsx}"],
      theme: {
        extend: {
          backgroundImage: {
            'gradient-primary': "linear-gradient(180deg, #1A1A1A 20%, #0D0D0D 100%)",
            'gradient-card': "linear-gradient(135deg, #262626 0%, #1A1A1A 100%)"
          },
          colors: {
            Branding: {
              backgroundPrimary: "#1F1B16",
              cardPrimary: "#2C2B30",
              textHeading: "#ffffff",
              textPrimary: "#ffffff",
              textSecondary: "#9a9a9a",
              textAccent: "#D4AF37",
              input: "#2C2B30",
              primaryButton: '#403f44',
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