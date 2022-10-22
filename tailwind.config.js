/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        base: {
          100: 'var(--color-base-100)',
          200: 'var(--color-base-200)',
          300: 'var(--color-base-300)',
          400: 'var(--color-base-400)',
          500: 'var(--color-base-500)',
          600: 'var(--color-base-600)',
          700: 'var(--color-base-700)',
          800: 'var(--color-base-800)',
          900: 'var(--color-base-900)',
          primary: 'var(--color-base-primary)',
          secondary: 'var(--color-base-secondary)',
          success: 'var(--color-base-success)',
          danger: 'var(--color-base-danger)',
          warning: 'var(--color-base-warning)',
          info: 'var(--color-base-info)',
          muted: 'var(--color-base-muted)',
        },
      },
      backgroundColor: {
        base: {
          100: 'var(--color-base-100)',
          200: 'var(--color-base-200)',
          300: 'var(--color-base-300)',
          400: 'var(--color-base-400)',
          500: 'var(--color-base-500)',
          600: 'var(--color-base-600)',
          700: 'var(--color-base-700)',
          800: 'var(--color-base-800)',
          900: 'var(--color-base-900)',
          primary: 'var(--color-base-primary)',
          secondary: 'var(--color-base-secondary)',
          success: 'var(--color-base-success)',
          danger: 'var(--color-base-danger)',
          warning: 'var(--color-base-warning)',
          info: 'var(--color-base-info)',
          muted: 'var(--color-base-muted)',
        }
      },
      borderColor: {
        base: {
          100: 'var(--color-base-100)',
          200: 'var(--color-base-200)',
          300: 'var(--color-base-300)',
          400: 'var(--color-base-400)',
          500: 'var(--color-base-500)',
          600: 'var(--color-base-600)',
          700: 'var(--color-base-700)',
          800: 'var(--color-base-800)',
          900: 'var(--color-base-900)',
          primary: 'var(--color-base-border)',
          secondary: 'var(--color-base-secondary)',
        }
      }
    },
  },
  plugins: [],
}
