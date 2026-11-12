import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DocsCenterPage from '../../views/DocsCenterPage.vue'
import InstallGuidePage from '../../views/InstallGuidePage.vue'
import ApiReferencePage from '../../views/ApiReferencePage.vue'
import ChangelogPage from '../../views/ChangelogPage.vue'
import ThemeTokensPage from '../../views/ThemeTokensPage.vue'
import ElementPlus from 'element-plus'
import router from '../../router'
import { apiReference } from '../../views/docs/apiReference'
import { themeTokens } from '../../views/docs/themeTokens'

const root = resolve(import.meta.dirname, '../../..')
const directory = resolve(root, 'tests/consumer/src/examples')
const files = readdirSync(directory).filter((name) => /\.(vue|ts)$/.test(name))
const source = (name: string) => readFileSync(resolve(directory, name), 'utf8')
const options = {
  global: {
    stubs: {
      RouterLink: { template: '<a><slot /></a>' },
      ElCard: { template: '<section><slot name="header" /><slot /></section>' },
      BaseBtn: { template: '<button><slot /></button>' },
    },
  },
}

it('shows every compilable example exactly once instead of hand-copied snippets', () => {
  const wrapper = mount(DocsCenterPage, options)
  const blocks = wrapper.findAll('pre code').map((block) => block.element.textContent)
  expect(blocks).toHaveLength(files.length)
  for (const name of files) expect(blocks, name).toContain(source(name))
  wrapper.unmount()
})

it('uses the canonical full and single-install examples in the install guide', () => {
  const wrapper = mount(InstallGuidePage, options)
  const blocks = wrapper.findAll('pre code').map((block) => block.element.textContent)
  expect(blocks).toEqual([source('main.ts'), source('NamedInstall.ts')])
  wrapper.unmount()
})

it('links every complete README example to the consumer fixture', () => {
  const readme = readFileSync(resolve(root, 'README.md'), 'utf8')
  expect(readme).not.toMatch(/```(?:vue|typescript|ts|javascript|js)\b/)
  for (const name of files) expect(readme, name).toContain(`](tests/consumer/src/examples/${name})`)
})

it('resolves the three docs routes to their pages', async () => {
  const pages = { '/docs/api': ApiReferencePage, '/docs/changelog': ChangelogPage, '/docs/theme': ThemeTokensPage }
  for (const [path, page] of Object.entries(pages)) {
    const loader = router.resolve(path).matched.at(-1)!.components!.default as () => Promise<{ default: unknown }>
    expect((await loader()).default, path).toBe(page)
  }
})

it('renders all five component names on the API reference page', () => {
  const wrapper = mount(ApiReferencePage, { global: { plugins: [ElementPlus] } })
  for (const name of ['BaseTable', 'SortTable', 'BaseDialog', 'SearchableListPanel', 'TransferDialog'])
    expect(wrapper.text(), name).toContain(name)
  wrapper.unmount()
})

// Slice one `export interface Xxx` block (up to the next top-level export) from the public types.
const types = readFileSync(resolve(root, 'src/types/components.ts'), 'utf8')
const block = (name: string) => {
  const start = types.search(new RegExp(`export interface ${name}\\b`))
  if (start < 0) return null
  const rest = types.slice(start + 1)
  const end = rest.search(/\nexport /)
  return end < 0 ? rest : rest.slice(0, end)
}
const declares = (text: string, name: string) =>
  new RegExp(`^\\s*['"]?${name.replace(/[$]/g, '\\$&')}['"]?\\??:`, 'm').test(text)

it('only documents props, events and slots that exist in the public types', () => {
  // BaseDialog and TransferDialog have no *Slots interface, so their slots are checked against the template.
  const slotSource: Record<string, string> = {
    BaseDialog: 'src/components/items/BaseDialog.vue',
    TransferDialog: 'src/components/transfer/TransferDialog.vue',
  }
  for (const { name, props, events, slots } of apiReference) {
    const sections = [
      [props, `${name}Props`],
      [events, `${name}EventMap`],
    ] as const
    for (const [rows, iface] of sections) {
      const text = block(iface)
      expect(text, iface).not.toBeNull()
      for (const row of rows) expect(declares(text!, row.name), `${iface}.${row.name}`).toBe(true)
    }
    const slotText = block(`${name}Slots`)
    for (const row of slots.filter((slot) => slot.name !== 'default')) {
      if (slotText) expect(declares(slotText, row.name), `${name}Slots.${row.name}`).toBe(true)
      else expect(readFileSync(resolve(root, slotSource[name]), 'utf8'), `${name} slot ${row.name}`).toContain(`name="${row.name}"`)
    }
  }
})

it('only lists theme tokens that the component sources use', () => {
  const sourceText = ['src/components', 'src/assets/styles']
    .flatMap((dir) => readdirSync(resolve(root, dir), { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => readFileSync(resolve(entry.parentPath, entry.name), 'utf8'))
    .join('\n')
  for (const { name } of themeTokens) expect(sourceText, name).toContain(name)
})

it('shows the unreleased section on the changelog page', () => {
  const wrapper = mount(ChangelogPage)
  expect(wrapper.text()).toContain('[Unreleased]')
  wrapper.unmount()
})
