// tailwind.config.js (Corrected CommonJS Syntax)

const defaultTheme = require('tailwindcss/defaultTheme'); // Use require

/** @type {import('tailwindcss').Config} */
module.exports = { // Use module.exports
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Your content paths look correct
  ],
  theme: {
    extend: {
      // Your custom theme extensions (these were correct inside)
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#2e667d',
        'background': '#c6efff', // This should now be recognized
      },
      screens: {
        'custom-sm': '600px',
        'custom-md': '800px',
      },
      boxShadow: {
        'custom-social': '0px 0px 8px 0px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Use require here too
  ],
}