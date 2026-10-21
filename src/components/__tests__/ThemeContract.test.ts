import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { compileString } from 'sass-embedded'
import postcss from 'postcss'
import { expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../../..')
const read = (file: string) => readFileSync(resolve(root, file), 'utf8')
const tokens = Object.fromEntries([...read('src/assets/styles/element/index.scss').matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [match[1], match[2]]))
const button = read('src/components/items/BaseBtn.vue')
const css = compileString(button.match(/<style[^>]*>([\s\S]*?)<\/style>/)![1]).css
const rules = postcss.parse(css)
const declarations = (selector: string) => {
  const values: Record<string, string> = {}
  rules.walkRules((rule) => {
    if (rule.selector === selector) rule.walkDecls((declaration) => { values[declaration.prop] = declaration.value })
  })
  return values
}
function luminance(color: string) {
  const [r, g, b] = color.slice(1).match(/../g)!.map((hex) => parseInt(hex, 16) / 255)
    .map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)
  return r * 0.2126 + g * 0.7152 + b * 0.0722
}
function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((a, b) => b - a)
  return (light + 0.05) / (dark + 0.05)
}
const color = (value: string) => value.startsWith('var(') ? tokens[value.slice(4, -1)] : value

it('keeps enabled button token pairs above 4.5 for normal, filled, hover and focus colors', () => {
  expect(contrast('#000000', '#ffffff')).toBe(21)
  expect(contrast('#ffffff', '#ffffff')).toBe(1)
  for (const variant of ['primary', 'success', 'warning', 'danger', 'info']) {
    const selector = `.el-button.el-button--${variant}`
    const outlined = declarations(selector)
    const filled = { ...outlined, ...declarations(`${selector}.is-fill`) }
    for (const [state, values] of [['outlined', outlined], ['filled', filled]] as const) {
      for (const prefix of ['', 'hover-']) {
        const foreground = color(values[`--el-button-${prefix}text-color`])
        const background = color(values[`--el-button-${prefix}bg-color`])
        expect(contrast(foreground, background), `${variant} ${state} ${prefix || 'normal/focus'}`).toBeGreaterThanOrEqual(4.5)
      }
    }
    const linkColor = color(outlined['--el-button-hover-link-text-color'])
    expect(contrast(linkColor, '#ffffff'), `${variant} link hover`).toBeGreaterThanOrEqual(4.5)
    expect(contrast(color(outlined['--control-text']), '#f5f7fa'), `${variant} text hover`).toBeGreaterThanOrEqual(4.5)
  }
  expect(css).toContain('.el-button:focus-visible')
})

it('keeps every homepage CTA background above 4.5 with white text for normal, hover and focus', () => {
  const preset = createRequire(import.meta.url)(resolve(root, 'tailwind-preset.cjs'))
  const template = document.createElement('template')
  template.innerHTML = read('src/views/HomePage.vue').split('<template>')[1].split('</template>')[0]
  const controls = [...template.content.querySelectorAll('button, a')]
  expect(controls).toHaveLength(3)
  const background = (name: string): string => {
    let value = preset.theme.extend.colors
    for (const part of name.split('-')) value = value[part]
    return typeof value === 'string' ? value : value.DEFAULT
  }
  for (const control of controls) {
    expect(control.classList.contains('text-white')).toBe(true)
    const backgrounds = [...control.classList].filter((name) => /^(hover:)?bg-/.test(name))
    expect(backgrounds).toHaveLength(2)
    for (const name of backgrounds) expect(contrast('#ffffff', background(name.replace(/^(hover:)?bg-/, ''))), name).toBeGreaterThanOrEqual(4.5)
    expect([...control.classList].some((name) => name.startsWith('focus-visible:outline-'))).toBe(true)
  }
})

it('keeps the explicit demo light theme outside the library style import graph', () => {
  const base = read('src/assets/base.css')
  expect(base).toContain('color-scheme: light')
  expect(base).not.toContain('prefers-color-scheme')
  expect(base).toContain('--color-text: var(--vt-c-text-light-1)')
  expect(contrast('#2c3e50', '#ffffff')).toBeGreaterThanOrEqual(4.5)
  expect(read('src/index.ts')).not.toContain("'./assets/base.css'")
  for (const file of ['tailwind.scss', '_base.scss', '_components.scss', '_tables.scss', '_dialogs.scss', 'element/index.scss']) {
    expect(read(`src/assets/styles/${file}`)).not.toMatch(/base\.css|color-scheme|prefers-color-scheme/)
  }
})

it('declares 44px icon targets, focus styles and pagination wrapping without hiding controls', () => {
  for (const file of ['src/components/layout/FunctionHeader.vue', 'src/components/tables/SortTable.vue']) {
    const source = read(file)
    expect(source).toContain('min-width: 44px')
    expect(source).toContain('min-height: 44px')
    expect(source).toContain(':focus-visible')
  }
  const pagination = read('src/components/layout/SearchableListPanel.vue')
  expect(pagination).toContain('flex-wrap: wrap')
  expect(pagination).toContain('prev, pager, next, total, sizes, jumper')
  expect(pagination).not.toMatch(/display:\s*none|overflow:\s*hidden/)
})
