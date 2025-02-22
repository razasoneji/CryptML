const defaultTheme = require("tailwindcss/defaultTheme");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    darkMode: "class",
    theme: {
      extend: {
        boxShadow: {
          'input': '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
        },
        animation: {
          aurora: "aurora 60s linear infinite",
          shimmer: "shimmer 2s linear infinite",
          move: "move 5s linear infinite",
        },
        
        keyframes: {
          aurora: {
            from: {
              backgroundPosition: "50% 50%, 50% 50%",
            },
            to: {
              backgroundPosition: "350% 50%, 350% 50%",
            },
          },
          move: {
            "0%": { transform: "translateX(-200px)" },
            "100%": { transform: "translateX(200px)" },
          },
          shimmer: {
            from: {
              backgroundPosition: "0 0",
            },
            to: {
              backgroundPosition: "-200% 0",
            },
          },
        },
      },
    },
<<<<<<< HEAD
    plugins: [require("tailwindcss-animate"),addVariablesForColors,require('tailwindcss-animate'),
      require('@tailwindcss/typography'),],
  }



  function addVariablesForColors({ addBase, theme }) {
=======
    plugins: [require("tailwindcss-animate")],
    plugins: [addVariablesForColors],
  }

  function addVariablesForColors({ addBase, theme }: any) {
>>>>>>> 9ce474f343981eb4edef645f0c1d309613bfcf09
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );
   
    addBase({
      ":root": newVars,
    });
  }