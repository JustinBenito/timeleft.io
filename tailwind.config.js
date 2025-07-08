/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '26': 'repeat(26, minmax(0, 1fr))',
      },
      colors: {
        gray: {
          850: '#1f2937',
          950: '#0f172a',
        },
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-rose-500',
  ],
};