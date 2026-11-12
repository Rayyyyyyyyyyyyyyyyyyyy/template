import { readFileSync, writeFileSync } from 'node:fs'
import postcss from 'postcss'

const dir = 'dist/lib/'
const root = postcss.parse(readFileSync(`${dir}rayyy-vue-table-components.css`, 'utf8'))
const theme = postcss.root()

for (const rule of root.nodes.filter((n) => n.type === 'rule' && (n.selector === ':root' || n.selector === ':root.dark'))) {
  for (const node of rule.nodes) {
    if (node.type !== 'decl' || !node.prop.startsWith('--')) throw new Error(`${rule.selector} may only contain custom properties, found: ${node.toString()}`)
  }
  theme.append(rule.clone())
  rule.remove()
}
if (!theme.nodes.length) throw new Error('No :root / :root.dark rule found to split into theme')

writeFileSync(`${dir}styles-core.css`, root.toString())
writeFileSync(`${dir}styles-theme.css`, theme.toString())
console.log(`Split styles: core=${Buffer.byteLength(root.toString())} theme=${Buffer.byteLength(theme.toString())}`)
