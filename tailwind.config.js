/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in-slow': 'fadeIn 2s ease-out forwards',
        'terminal': 'flicker 3s infinite',
        'scanlines': 'scanlines 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        flicker: {
          '0%, 100%': { boxShadow: '0 0 8px #39FF14' },
          '50%': { boxShadow: '0 0 4px #39FF14' },
        },
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 2px' },
        },
      },
    },    
  },
  plugins: [],
};
