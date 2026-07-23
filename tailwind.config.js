/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Navy Blue — Trust & Stability
        navy: {
          50: '#eef2f7',
          100: '#dce4ee',
          200: '#b9c9dd',
          300: '#8da6c4',
          400: '#4f6f9f',
          500: '#2f5185',
          600: '#1f3a66',
          700: '#182d4f',
          800: '#122340',
          900: '#0b1a33',
          950: '#060f1f',
        },
        // Professional Red — Growth & Brand Identity
        brand: {
          50: '#fdf2f3',
          100: '#fce4e6',
          200: '#f9ccd0',
          300: '#f3a7ae',
          400: '#ea7580',
          500: '#dc4a58',
          600: '#c62d3d',
          700: '#a52230',
          800: '#89202c',
          900: '#75202b',
          950: '#410c12',
        },
        // Medical Blue — Healthcare accent
        medical: {
          50: '#eff8ff',
          100: '#dbeeff',
          200: '#bfe2ff',
          300: '#93d0ff',
          400: '#60b4ff',
          500: '#3b93fc',
          600: '#2574f1',
          700: '#1d5ede',
          800: '#1e4db4',
          900: '#1e438e',
          950: '#172a56',
        },
      },
      spacing: {
        18: '4.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(11, 26, 51, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(11, 26, 51, 0.18)',
        nav: '0 2px 16px -4px rgba(11, 26, 51, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0b1a33 0%, #152d4f 55%, #1f3a66 100%)',
        'brand-gradient': 'linear-gradient(135deg, #c62d3d 0%, #a52230 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
