/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode with a class
  theme: {
    extend: {
      colors: {
        customGreen: {
          light: '#6ee7b7',
          DEFAULT: '#34d399',
          dark: '#059669',
        },
        customGray: {
          light: '#d1d5db',
          DEFAULT: '#9ca3af',
          dark: '#4b5563',
        },
      },
    },
  },
  plugins: [],
}
