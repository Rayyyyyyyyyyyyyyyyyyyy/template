import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { compileString } from 'sass-embedded'
import postcss from 'postcss'
import { expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../../..')
const read = (file: string) => readFileSync(resolve(root, file), 'utf8')
const tokens = Object.fromEntries([...read('src/assets/styles/element/index.scss').split(':root.dark')[0].matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [match[1], match[2]]))
const button = read('src/components/items/BaseBtn.vue')
const css = compileString(button.match(/<style[^>]*>([\s\S]*?)<\/style>/)![1]).css
const rules = postcss.parse(css)
const declarations = (selector: string, stylesheet = rules) => {
  const values: Record<string, string> = {}
  stylesheet.walkRules((rule) => {
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
const color = (value: string) => value.startsWith('var(') ? tokens[value.slice(4, -1).split(',')[0].trim()] : value

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

it('keeps primary and secondary homepage actions readable in normal and hover states', () => {
  const stylesheet = postcss.parse(read('src/assets/demo.css'))
  const template = document.createElement('template')
  template.innerHTML = read('src/views/HomePage.vue').split('<template>')[1].split('</template>')[0]
  const controls = [...template.content.querySelectorAll('.home-actions button, .home-actions a')]
  expect(controls).toHaveLength(3)
  for (const control of controls) {
    expect(control.classList.contains('site-button')).toBe(true)
    const normal = {
      ...declarations('.site-button', stylesheet),
      ...(control.classList.contains('site-button--primary') ? declarations('.site-button--primary', stylesheet) : {}),
    }
    const hover = {
      ...normal,
      ...declarations('.site-button:hover', stylesheet),
      ...(control.classList.contains('site-button--primary') ? declarations('.site-button--primary:hover', stylesheet) : {}),
    }
    for (const values of [normal, hover]) {
      expect(contrast(color(values.color), color(values.background))).toBeGreaterThanOrEqual(4.5)
    }
  }
  expect(read('src/assets/demo.css')).toContain('.site-shell :focus-visible')
})

it('keeps native primary button hover and plain text readable in the demo site', () => {
  const stylesheet = postcss.parse(read('src/assets/demo.css'))
  const primary = declarations('.site-shell .el-button--primary', stylesheet)
  expect(contrast('#ffffff', color(primary['--el-button-hover-bg-color']))).toBeGreaterThanOrEqual(4.5)
  expect(contrast('#ffffff', color(primary['--el-button-hover-link-text-color']))).toBeGreaterThanOrEqual(4.5)
  const plain = declarations('.site-shell .el-button--primary.is-plain', stylesheet)
  expect(contrast(color(plain['--el-button-text-color']), tokens['--main-color-light-9'])).toBeGreaterThanOrEqual(4.5)
})

it('shares the primary palette between native Element Plus, wrapped controls and Tailwind', () => {
  const theme = read('src/assets/styles/element/index.scss')
  const preset = createRequire(import.meta.url)(resolve(root, 'tailwind-preset.cjs'))
  expect(preset.theme.extend.colors.primary.DEFAULT).toBe(tokens['--main-color'])
  expect(preset.theme.extend.colors.primary.dark).toBe(tokens['--main-color-dark-2'])
  for (const suffix of ['', '-light-3', '-light-5', '-light-7', '-light-8', '-light-9', '-dark-2']) {
    expect(theme).toContain(`--el-color-primary${suffix}: var(--main-color${suffix})`)
  }
})

it('reads the primary palette from element/index.scss instead of hard-coding it', () => {
  const { primary } = createRequire(import.meta.url)(resolve(root, 'tailwind-preset.cjs')).theme.extend.colors
  for (const key of ['', '-10', '-15', '-20', '-40', '-60', '-80', '-dark']) {
    expect(primary[key.slice(1) || 'DEFAULT'], key).toBe(tokens[`--color-primary${key}`])
  }
  expect(read('tailwind-preset.cjs')).not.toMatch(/#f5f7fa|#d9e8f7|#a8c8e9/)
})

it('redeclares the primary and control tokens under :root.dark with readable control colors', () => {
  const stylesheet = postcss.parse(compileString(read('src/assets/styles/element/index.scss')).css)
  const light = declarations(':root', stylesheet)
  const dark = declarations(':root.dark', stylesheet)
  for (const name of Object.keys(light).filter((name) => /^--(main-color|el-color-primary|control-)/.test(name))) {
    expect(dark, name).toHaveProperty([name])
  }
  for (const name of ['success', 'warning', 'danger', 'info'].flatMap((variant) => [`--control-${variant}`, `--control-${variant}-hover`])) {
    expect(contrast(dark[name], '#141414'), name).toBeGreaterThanOrEqual(4.5)
  }
  expect(dark['--el-color-primary-light-3']).toBe('var(--main-color-light-3)')
})

it('keeps the explicit demo light theme outside the library style import graph', () => {
  const base = read('src/assets/base.css')
  expect(base).toContain('color-scheme: light')
  expect(base).not.toContain('prefers-color-scheme')
  expect(base).toContain('--color-text: #303133')
  expect(contrast('#303133', '#ffffff')).toBeGreaterThanOrEqual(4.5)
  expect(read('src/index.ts')).not.toMatch(/base\.css|demo\.css/)
  for (const file of ['tailwind.scss', '_base.scss', '_components.scss', '_tables.scss', '_dialogs.scss', 'element/index.scss']) {
    expect(read(`src/assets/styles/${file}`)).not.toMatch(/base\.css|demo\.css|color-scheme|prefers-color-scheme/)
  }
})

it('declares 44px icon targets, focus styles and pagination wrapping without hiding controls', () => {
  for (const file of ['src/components/layout/FunctionHeader.vue', 'src/components/tables/SortTable.vue']) {
    const source = read(file)
    expect(source).toContain('min-width: var(--rvtc-control-min-size, 44px)')
    expect(source).toContain('min-height: var(--rvtc-control-min-size, 44px)')
    expect(source).toContain(':focus-visible')
  }
  const pagination = read('src/components/layout/SearchableListPanel.vue')
  expect(pagination).toContain('flex-wrap: wrap')
  expect(pagination).toContain('prev, pager, next, total, sizes, jumper')
  expect(pagination).not.toMatch(/display:\s*none|overflow:\s*hidden/)
})

it('exposes layout heights as overridable CSS variables with the original values as fallback', () => {
  const mainPanel = read('src/components/layout/MainPanel.vue')
  const detail = read('src/components/layout/DetailLayout.vue')
  expect(mainPanel).toContain('var(--rvtc-panel-max-height, calc(100vh - 180px))')
  expect(detail).toContain('var(--rvtc-detail-min-height, calc(100vh - 200px))')
  expect(detail).toContain('var(--rvtc-detail-content-max-height, calc(100vh - 100px))')
})

it('exposes component colors and control size as overridable --rvtc tokens with Element Plus fallbacks', () => {
  const sort = read('src/components/tables/SortTable.vue')
  const title = read('src/components/tables/TitleTable.vue')
  const header = read('src/components/layout/FunctionHeader.vue')
  const btn = read('src/components/items/BaseBtn.vue')
  expect(read('src/assets/styles/_components.scss')).toContain('var(--rvtc-toolbar-bg, var(--el-fill-color))')
  expect(header).toContain('var(--rvtc-header-bg, var(--el-fill-color-light))')
  expect(header).toContain('var(--rvtc-text, var(--el-text-color-primary))')
  expect(btn).toContain('var(--rvtc-on-fill, var(--el-color-white))')
  for (const source of [header, sort]) {
    expect(source).toContain('min-width: var(--rvtc-control-min-size, 44px)')
    expect(source).toContain('min-height: var(--rvtc-control-min-size, 44px)')
  }
  for (const source of [sort, title]) {
    expect(source).not.toContain('bg-gray-200')
    expect(source).toContain('rvtc-toolbar')
  }
  expect(header).not.toContain('bg-primary-10')
  expect(header).not.toContain('text-black')
  expect(btn).not.toContain('color: white')
})

it('gives every theme variable reference in core sources a fallback', () => {
  const walk = (dir: string): string[] => readdirSync(resolve(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : walk(path)
    return path.endsWith('.vue') || /\/_[^/]*\.scss$/.test(path) ? [path] : []
  })
  for (const file of [...walk('src/components'), ...walk('src/assets/styles').filter((path) => !path.includes('/element/'))]) {
    expect(read(file), file).not.toMatch(/var\(--(main-color|control-)[a-z0-9-]*\)/)
  }
})

it('gives TransferItem buttons a 44px touch target', () => {
  expect(read('src/components/transfer/transferItem.vue')).toContain('min-width: var(--rvtc-control-min-size, 44px)')
})

it('SortTable excel icon is switched by CSS and uses no @/ alias', () => {
  const source = read('src/components/tables/SortTable.vue')
  expect(source).not.toContain('@/assets')
  expect(source).not.toContain('itemOnHover')
  expect(source).toContain(':focus-visible .excel-icon--active')
})

it('routes table header, dialog header and link colors through --rvtc tokens with the original light hex as fallback', () => {
  const tables = read('src/assets/styles/_tables.scss')
  const preset = createRequire(import.meta.url)(resolve(root, 'tailwind-preset.cjs')).theme.extend.colors
  const bg = `var(--rvtc-table-header-bg, ${preset.primary[15]})`
  const text = `var(--rvtc-table-header-text, ${preset.text.DEFAULT})`
  const link = `var(--rvtc-link-text, ${preset.blue[10]})`
  expect(tables.split(`background-color: ${bg}`)).toHaveLength(4)
  expect(tables).toContain(`color: ${text}`)
  expect(tables.split(`color: ${link}`)).toHaveLength(3)
  expect(tables).not.toMatch(/bg-primary-15|text-text|text-blue-10/)
  expect(read('src/assets/styles/_dialogs.scss')).toContain(`background-color: var(--rvtc-dialog-header-bg, ${preset.primary[15]})`)
  expect(read('src/assets/styles/_base.scss')).toContain(`color: ${link}`)
})

it('declares the four new tokens under :root.dark with a link color readable on both dark surfaces', () => {
  const dark = declarations(':root.dark', postcss.parse(compileString(read('src/assets/styles/element/index.scss')).css))
  for (const name of ['--rvtc-table-header-bg', '--rvtc-table-header-text', '--rvtc-dialog-header-bg', '--rvtc-link-text']) {
    expect(dark, name).toHaveProperty([name])
  }
  expect(contrast(dark['--rvtc-link-text'], '#141414')).toBeGreaterThanOrEqual(4.5)
  expect(contrast(dark['--rvtc-link-text'], '#262727')).toBeGreaterThanOrEqual(4.5)
  expect(read('src/components/tables/BaseTable.vue')).toMatch(/(?<!:root)\.dark \.row-action\s*\{\s*background-color: transparent/)
})
