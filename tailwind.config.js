/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{      
        accent: {
          DEFAULT: 'var(--accent-color)',
        },
        glow: {
          DEFAULT: 'var(--glow-color)',
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 10px var(--glow-color)',
      },
      animation: {
        'projectsFadeIn': 'projectsFadeIn 0.4s ease-in-out',
        'fadeIn': 'fadeIn 0.3s ease-in forwards',
        'terminal': 'flicker 3s infinite',
        'scanlines': 'scanlines 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 2px' },
        },
        projectsFadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        terminal: 'flicker 8s infinite',
      },
    },    
  },
  plugins: [],
};
