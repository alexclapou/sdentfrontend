module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '740px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        'primary-color': '#73D8CE',
        'secondary-color': '#3FB0A4',
        'important-color': '#133C55',
        'hover-important': '#103349',
        'black-rgba': 'rgba(0, 0, 0 , 0.15)',
        'important-rgba': 'rgba(19, 60, 85, 0.5)',
        'primary-rgba': 'rgba(115, 216, 206, 0.35)'
      },
      blur: {
        xs: '0px'
      },
      backgroundImage: {
        'hero-main': "url('/src/assets/bkk.jpeg')"
      }
    }
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded']
  }
}
