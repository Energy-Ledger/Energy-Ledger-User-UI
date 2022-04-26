module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  mode:'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'coalblack': '#27272E',
        'light-coalblack': '#7A7A9D',
        'slate-gray': '#8492A6',
        'blight': '#F7FAFC',
        'dark-green' : '#34A853',
        'dark-red' : '#EB4338',
        'dark-yellow' : '#F9BE02',
        'pestel-pink': '#FF92AE',
        'regular-blue': '#4C6FFF',
        'grinish-blue': '#68DBF2',
        
        'coalblack': '#425466',
        'blacktext': '#27272E',
        'blue-medium' : '#4C6FFF',
        'gray-medium' : '#7B8698',

      },
      boxShadow: {
        lg: '0 0px 15px 0px rgba(76, 111, 255, 0.1), 0 4px 6px -2px rgba(76, 111, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
