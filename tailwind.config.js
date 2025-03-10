  /** @type {import('tailwindcss').Config} */
  export default {
        content: ["./src/**/*.{js,ts,tsx,jsx}"],
        theme: {
          extend: {
            colors: {
              Branding: {
                Primary: {
                  primary: "linear-gradient(90deg, #0A0A0A 0%, #0D0D0D 100%",
                },
                Secondary: {

                },
                Accent: {
                  "Login-Button": "(#504F55, #000000/20)"
                }
              },
            },
            fontFamily: {
              "open-sans": ["Open_Sans", "sans-serif"],
              lato: ["Lato", "sans-serif"]
            }
          },
        },
        plugins: [],
      }