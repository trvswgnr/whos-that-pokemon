const plugin = require('tailwindcss/plugin') // eslint-disable-line

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        poke: {
          yellow: '#f2bc18',
          red: '#e74d38',
          blue: '#1a6cb5',
          sky: '#cfebe7',
          cyan: '#41aaba'
        }
      },
      spacing: {
        gutter: '2rem'
      },
      fontFamily: {
        display: ['GarageShockCondensedHeavy', 'sans-serif']
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const textStroke = {
        '.text-stroke': {
          '--stroke-color': theme('colors.black'),
          '--stroke-width': '0.05em',
          '--stroke-width-neg': 'calc(var(--stroke-width) * -1)',

          textShadow: `var(--stroke-width-neg) var(--stroke-width) var(--stroke-color),
            var(--stroke-width) var(--stroke-width) var(--stroke-color),
            var(--stroke-width-neg) var(--stroke-width-neg) var(--stroke-color),
            var(--stroke-width) var(--stroke-width-neg) var(--stroke-color)`
        }
      }
      const colorGroups = theme('colors')
      const colors = Object.keys(colorGroups).reduce((acc, color) => {
        if (typeof colorGroups[color] === 'string') {
          acc[`.text-stroke-${color}`] = {
            '--stroke-color': colorGroups[color]
          }
        } else {
          Object.keys(colorGroups[color]).forEach((shade) => {
            acc[`.text-stroke-${color}-${shade}`] = {
              '--stroke-color': colorGroups[color][shade]
            }
          })
        }
        return acc
      }, {})
      const widths = Object.keys(theme('spacing')).reduce((acc, width) => {
        acc[`.text-stroke-${width}`] = {
          '--stroke-width': theme('spacing')[width]
        }
        return acc
      }, {})
      addUtilities({ ...textStroke, ...colors, ...widths }, ['responsive'])
    })
  ]
}
