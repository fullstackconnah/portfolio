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
        'fade-in-slow': 'fadeIn 2s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-in forwards',
        'terminal': 'flicker 3s infinite',
        'scanlines': 'scanlines 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        flicker: {
          '0%, 100%': { boxShadow: '0 0 8px var(--glow-color)' },
          '50%': { boxShadow: '0 0 4px var(--glow-color)' },
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
