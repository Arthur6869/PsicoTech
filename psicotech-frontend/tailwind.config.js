/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPurple: '#D1C4E9',
        lightPink: '#F8BBD0',
        darkNavy: '#1E293B', // Cor escura para o botão principal
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #D1C4E9, #F8BBD0)'
      }
    }
  },
  plugins: []
};