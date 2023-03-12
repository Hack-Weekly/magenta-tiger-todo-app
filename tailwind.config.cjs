/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'ice-blue': '#e9f4ff',
      'light-blue': '#3d9afe',
      blue: '#007bff',
      'dark-blue': '#0067d5',
      black: 'black',
      white: 'white',
      'white-grey': '#fafafa',
      'light-grey': '#8c8c8c',
      'dark-grey': '#4b4b4b',
      'light-success': '#6affbc',
      success: '#0cfb90',
      'dark-success': '#00e07b',
      'light-danger': '#ff9191',
      danger: '#ff6868',
      'dark-danger': '#f44040',
      magenta: '#FF00FF',
    },
  },
  plugins: [],
};
