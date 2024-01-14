/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs', './views/**/*.ejs'],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

