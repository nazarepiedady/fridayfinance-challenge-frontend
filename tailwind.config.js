module.exports = {
  content: [
    './nuxt.config.js',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './components/**/*.{js,vue}',
  ],
  theme: {},
  variants: {
    extend: { opacity: ['disabled'], cursor: ['disabled'] }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}