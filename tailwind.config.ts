/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1F4B',
        dusk: '#1D4FB8',
        amber: '#F2A93B',
        gold: '#D98A1F',
        terracotta: '#4A2418',
        cream: '#F6E7CB',
        teal: '#1F9A94',
        ink: '#1A1209',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
