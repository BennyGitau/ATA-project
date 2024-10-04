/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
      },
      colors: {
        'gold-primary': '#bf9000',
        'gold-secondary': '#875626',
        'black-primary': '#000000',
        'black-secondary': '#1c1c1c',
        'white-primary': '#ffffff',
        'white-secondary': '#f9f9f9',
      },
    },
    
  },
  plugins: [],
}