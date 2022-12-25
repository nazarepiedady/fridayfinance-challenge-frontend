module.exports = {
  content: [
    './nuxt.config.js',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './components/**/*.{js,vue}',
  ],
  theme: {
    fontFamily: { sans: ['inter', 'sans-serif'] }
  },
  variants: {
    extend: { opacity: ['disabled'], cursor: ['disabled'] }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}