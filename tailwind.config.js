/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,vue,ts}'],
  presets: [require('./tailwind-preset.js')],
  /**
   * To avoid the conflicts on button style with Element Plus
   * https://juejin.cn/post/7084614555598323719
   */
  corePlugins: {
    preflight: false,
  },
}
