/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          deep: '#06040a',
          card: 'rgba(15, 10, 25, 0.45)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          gold: '#f59e0b',
          pink: '#ec4899',
          purple: '#a855f7',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.2))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
}
