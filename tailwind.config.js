/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'calc-100vh-120px': 'calc(100vh - 120px)',
      },
    },
  },
  plugins: [],
}

