/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14110E',
          soft: '#3A342C',
          muted: '#7A7166',
        },
        line: {
          DEFAULT: '#E7E0D5',
          strong: '#D6CCBC',
        },
        canvas: '#FAF8F4',
        champagne: '#F4EADA',
        gold: {
          DEFAULT: '#B0863C',
          deep: '#8A6425',
          light: '#DCBE84',
          wash: '#FBF5E9',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        ar: ['"IBM Plex Sans Arabic"', 'Tajawal', '"Noto Kufi Arabic"', 'sans-serif'],
        arDisplay: ['"Noto Kufi Arabic"', '"IBM Plex Sans Arabic"', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,17,14,0.04), 0 8px 24px -12px rgba(20,17,14,0.12)',
        lift: '0 2px 4px rgba(20,17,14,0.05), 0 24px 48px -20px rgba(20,17,14,0.28)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.7)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        'ring-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'draw-check': {
          '0%': { strokeDashoffset: '60' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'ring-spin': 'ring-spin 1.4s linear infinite',
        'draw-check': 'draw-check 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both',
      },
    },
  },
  plugins: [],
};
