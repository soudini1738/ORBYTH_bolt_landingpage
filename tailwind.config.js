/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FCFBF8',
        ink: '#17140E',
        stone: '#6B655A',
        gold: '#D1C4A9',
        bronze: '#7A6B47',
        'bronze-dark': '#5E5135',
        'gold-light': '#EAE3D3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
