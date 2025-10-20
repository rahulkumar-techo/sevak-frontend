/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ff99",       // Neon green
        primary2: "#b3ff00",      // Yellow-green
        secondary: "#00d4a8",     // Teal/Aquamarine
        accent: "#00ff99",        // Neon accent
        neutral100: "#111111",     // Card/section background
        neutral200: "#222222",     // Darker section
        neutral300: "#333333",     // Disabled buttons
        neutral400: "#e0e0e0",     // Primary text
        neutral500: "#b0b0b0",     // Secondary text
        neutral600: "#888888",     // Disabled text
      },
      backgroundImage: theme => ({
        'gradient-primary': 'linear-gradient(to right, #00ff99, #b3ff00)',
        'gradient-primary-hover': 'linear-gradient(to right, #b3ff00, #00ff99)',
      }),
      boxShadow: {
        'neon-glow': '0 0 20px #00ff99, 0 0 40px #b3ff00',
      },
    },
  },
  plugins: [],
};
