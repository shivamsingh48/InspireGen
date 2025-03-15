/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        secondary: {
          light: '#f97316', // orange-500
          DEFAULT: '#ea580c', // orange-600
          dark: '#c2410c', // orange-700
        },
        background: {
          light: '#f9fafb', // gray-50
          dark: '#1f2937', // gray-800
        },
        text: {
          light: '#1f2937', // gray-800
          dark: '#f9fafb', // gray-50
        },
      },
    },
  },
  plugins: [],
}