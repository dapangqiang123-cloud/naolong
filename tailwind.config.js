/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#bdcd9a',
        'on-surface-variant': '#c6c8ba',
        'outline-variant': '#45483e',
        'on-surface': '#e2e2e2',
        'surface-container': '#1f1f1f',
        'on-primary-container': '#222d0a',
        'primary-container': '#889668',
        'secondary': '#c6c6c6',
        'surface-container-high': '#2a2a2a',
        'surface-container-low': '#1b1b1b',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-highest': '#353535',
        'surface': '#131313',
        'outline': '#909286',
        'background': '#131313',
        'on-background': '#e2e2e2',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        label: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
