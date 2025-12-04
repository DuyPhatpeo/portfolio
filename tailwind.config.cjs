module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./safelist.txt"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-deep": "var(--primary-deep)",
        "primary-mild": "var(--primary-mild)",
        "primary-subtle": "var(--primary-subtle)",
        secondary: "var(--secondary)",
        "secondary-deep": "var(--secondary-deep)",
        "secondary-mild": "var(--secondary-mild)",
        "secondary-subtle": "var(--secondary-subtle)",
        neutral: "var(--neutral)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.500"),
            maxWidth: "65ch",
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.400"),
          },
        },
      }),
    },
  },
};
