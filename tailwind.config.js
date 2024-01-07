/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,jsx,js,tsx,vue}", "./**/*.{html,js,jsx,js,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'primary': '#260385',
        'secondary': '#8e7cbf',
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}

