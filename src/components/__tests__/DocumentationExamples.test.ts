import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DocsCenterPage from '../../views/DocsCenterPage.vue'
import InstallGuidePage from '../../views/InstallGuidePage.vue'

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
