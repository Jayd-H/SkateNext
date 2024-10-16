module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}",  "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0F1413',
        text: '#EBEFEF',
        accent: '#34CDB3',
        'accent-2': '#77B2A8',
        'accent-dark': '#183C36',
        buttonbg: '#151F1E',
        yellow: '#FFB53F',
        green: '#00FF44',
        red: '#880808',
        grey: '#A5ABAB',
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'montserrat-light': ['Montserrat-Light'],
        'montserrat-medium': ['Montserrat-Medium'],
        'montserrat-semibold': ['Montserrat-SemiBold'],
        'montserrat-bold': ['Montserrat-Bold'],
        'montserrat-italic': ['Montserrat-Italic'],
        'montserrat-light-italic': ['Montserrat-LightItalic'],
        'montserrat-medium-italic': ['Montserrat-MediumItalic'],
        'montserrat-semibold-italic': ['Montserrat-SemiBoldItalic'],
        'montserrat-bold-italic': ['Montserrat-BoldItalic'],
        'montserrat-alt': ['MontserratAlternates'],
        'montserrat-alt-light': ['MontserratAlternates-Light'],
        'montserrat-alt-medium': ['MontserratAlternates-Medium'],
        'montserrat-alt-semibold': ['MontserratAlternates-SemiBold'],
        'montserrat-alt-bold': ['MontserratAlternates-Bold'],
        'montserrat-alt-italic': ['MontserratAlternates-Italic'],
        'montserrat-alt-light-italic': ['MontserratAlternates-LightItalic'],
        'montserrat-alt-medium-italic': ['MontserratAlternates-MediumItalic'],
        'montserrat-alt-semibold-italic': ['MontserratAlternates-SemiBoldItalic'],
        'montserrat-alt-bold-italic': ['MontserratAlternates-BoldItalic'],
      },
    },
  },
  plugins: [],
}