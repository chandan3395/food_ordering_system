/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Sora"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        ink: '#1B1410',
        canvas: '#FFF9F5',
        surface: '#FFFDFC',
        warm: '#F97316',
        cream: '#FDEBD5',
        coral: '#FFB677',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(240, 105, 27, 0.12)',
        card: '0 18px 40px rgba(27, 20, 16, 0.08)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 32%), radial-gradient(circle at right, rgba(255, 182, 119, 0.28), transparent 22%)',
      },
    },
  },
  plugins: [],
};

