/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'hbf-yellow': '#F3A847',
        'hbf-yellow-light': '#F7BC74',
        'hbf-charcoal': '#2A2A2A',
        'hbf-charcoal-light': '#4F4F4F',
        'hbf-bluegray': '#8B9AAB',
        'hbf-white': '#FDFBF6',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        display: ['system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'canvas-texture': "url('/images/textures/canvas-subtle.png')",
      },
    },
  },
  plugins: [],
};
