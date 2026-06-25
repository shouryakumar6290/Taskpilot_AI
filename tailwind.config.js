/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A', // Slate 900
          card: '#1E293B', // Slate 800
          text: '#F8FAFC', // Slate 50
        },
        primary: {
          DEFAULT: '#6366F1', // Indigo 500
          glow: '#818CF8', // Indigo 400
        },
        accent: {
          DEFAULT: '#EC4899', // Pink 500
          glow: '#F472B6', // Pink 400
        },
        success: '#10B981', // Emerald 500
        warning: '#F59E0B', // Amber 500
        danger: '#EF4444', // Red 500
      }
    },
  },
  plugins: [],
}
