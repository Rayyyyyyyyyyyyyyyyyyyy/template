import preset from './tailwind-preset.cjs'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,vue,ts,scss}'],
  presets: [preset],
  /**
   * To avoid the conflicts on button style with Element Plus
   * https://juejin.cn/post/7084614555598323719
   */
  corePlugins: {
    preflight: false,
  },
}
