// tailwind.config.js
import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accentCol: '#28c1c6',
      },
    },
  },
  plugins: [],
});
