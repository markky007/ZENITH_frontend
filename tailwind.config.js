/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0F0F0F',
          white: '#FAFAFA',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          dark: '#D4AF37',
        },
        platinum: {
          DEFAULT: '#E5E4E2',
          dark: '#BCC6CC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
