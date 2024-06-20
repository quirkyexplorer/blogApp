/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        'full': '100% 100%',
      },
      backgroundPosition: {
        'custom-pos': '0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(at left top, hsl(240, 100%, 3%), hsl(242, 93%, 46%))',
        'button-gradient': 'linear-gradient(90deg, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      },
     
    },
  },
  plugins: [],
}

