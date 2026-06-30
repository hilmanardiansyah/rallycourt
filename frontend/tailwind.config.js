/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#07111F',
        lime: '#B7FF00',
        soft: '#F5F5F5',
        ink: '#111827'
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 24px 60px rgba(7, 17, 31, 0.12)'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-2deg)' }
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        floaty: 'floaty 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
