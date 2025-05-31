/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors:{
        color1: '#222831',
        color2: '#393E46',
        color3: '#948979',
        color4: '#DFD0B8',
        color5: '#FCEFCB',

      }
    },
  },
  plugins: [],
}
