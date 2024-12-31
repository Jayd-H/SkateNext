module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1413",
        "bg-card": "#131918",
        "bg-surface": "#162120",
        "bg-elevated": "#1B2524",

        // Primary Accent Family (Teal)
        accent: "#34CDB3",
        "accent-bright": "#4FEDE2",
        "accent-muted": "#2A9E8A",
        "accent-dark": "#1D7267",
        "accent-surface": "#152925",

        // Text Colours
        text: "#EEFFFE",
        "text-muted": "#B4D2CF",
        "text-dim": "#7A9E9B",

        // Essential Greys
        "grey-light": "#404040",
        "grey-dark": "#262626",

        // Colour Pairs
        green: "#3EE9B4",
        "green-dark": "#2A916F",
        "green-surface": "#153B2E",

        yellow: "#FFD571",
        "yellow-dark": "#B38834",
        "yellow-surface": "#2E2516",

        red: "#FF7C98",
        "red-dark": "#B34359",
        "red-surface": "#2E1820",

        // Achievement Colors
        gold: "#FFE5A3",
        silver: "#D8E3E3",
        bronze: "#E5B199",

        success: "#A5FF75",
        "success-dark": "#588A3D",

        warning: "#FF3333",
        "warning-dark": "#B32424",
      },

      fontFamily: {
        montserrat: ["Montserrat"],
        "montserrat-light": ["Montserrat-Light"],
        "montserrat-medium": ["Montserrat-Medium"],
        "montserrat-semibold": ["Montserrat-SemiBold"],
        "montserrat-bold": ["Montserrat-Bold"],
        "montserrat-italic": ["Montserrat-Italic"],
        "montserrat-light-italic": ["Montserrat-LightItalic"],
        "montserrat-medium-italic": ["Montserrat-MediumItalic"],
        "montserrat-semibold-italic": ["Montserrat-SemiBoldItalic"],
        "montserrat-bold-italic": ["Montserrat-BoldItalic"],
        "montserrat-alt": ["MontserratAlternates"],
        "montserrat-alt-light": ["MontserratAlternates-Light"],
        "montserrat-alt-medium": ["MontserratAlternates-Medium"],
        "montserrat-alt-semibold": ["MontserratAlternates-SemiBold"],
        "montserrat-alt-bold": ["MontserratAlternates-Bold"],
        "montserrat-alt-italic": ["MontserratAlternates-Italic"],
        "montserrat-alt-light-italic": ["MontserratAlternates-LightItalic"],
        "montserrat-alt-medium-italic": ["MontserratAlternates-MediumItalic"],
        "montserrat-alt-semibold-italic": [
          "MontserratAlternates-SemiBoldItalic",
        ],
        "montserrat-alt-bold-italic": ["MontserratAlternates-BoldItalic"],
      },
    },
  },
  plugins: [],
};
