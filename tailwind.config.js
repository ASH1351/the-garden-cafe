/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#FAF6EB',
          200: '#F6EFDC', // Main Parchment background
          300: '#EBDDBE',
          400: '#E0CAA0',
        },
        olive: {
          light: '#83983D',
          DEFAULT: '#6B7F2E', // Primary olive green
          dark: '#546424',
        },
        forest: {
          light: '#4E5C2C',
          DEFAULT: '#3E4A22', // Deep forest green
          dark: '#2A3317',
          darker: '#1B220E',
        },
        mustard: {
          light: '#F0BA4E',
          DEFAULT: '#E2A72E', // Golden mustard CTA & highlights
          dark: '#C58C1B',
        },
        espresso: {
          light: '#533C2C',
          DEFAULT: '#3B2A1E', // Main text & Garden lettering
          dark: '#261B13',
        },
        leaf: {
          light: '#94B852',
          DEFAULT: '#7FA043', // Secondary accent
          dark: '#678433',
        }
      },
      fontFamily: {
        heading: ['"Rozha One"', '"DM Serif Display"', 'serif'],
        display: ['"DM Serif Display"', 'serif'],
        sub: ['"Josefin Sans"', '"Montserrat"', 'sans-serif'],
        body: ['"Nunito"', '"DM Sans"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -1px rgba(59, 42, 30, 0.08), 0 1px 4px -1px rgba(59, 42, 30, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(59, 42, 30, 0.12), 0 4px 12px -2px rgba(59, 42, 30, 0.08)',
        'warm-lg': '0 16px 36px -6px rgba(59, 42, 30, 0.16), 0 8px 16px -4px rgba(59, 42, 30, 0.10)',
        'gold-glow': '0 0 25px rgba(226, 167, 46, 0.45)',
        'leaf-glow': '0 0 20px rgba(127, 160, 67, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-warm': 'pulseWarm 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-2deg)' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
