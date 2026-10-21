import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'
import { createHash } from 'node:crypto'

// Run after npm run build-demo -- --manifest, from the repository root.
const root = resolve('dist/demo')
const manifest = JSON.parse(readFileSync(resolve(root, '.vite/manifest.json'), 'utf8'))
function dependencies(graph, seeds) {
  const visited = new Set()
  function visit(key) {
    if (visited.has(key)) return
    assert.ok(graph[key], `Missing manifest dependency: ${key}`)
    visited.add(key)
    for (const child of graph[key].imports || []) visit(child)
  }
  seeds.forEach(visit)
  return [...visited]
}
assert.deepEqual(dependencies({ a: { imports: ['b', 'c'] }, b: { imports: ['c'] }, c: { imports: ['a'] } }, ['a']), ['a', 'b', 'c'])
const html = readFileSync(resolve(root, 'index.html'), 'utf8')
const preloadFiles = [...html.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="\/?([^"]+)"/g)].map((match) => match[1])
const entryKeys = Object.keys(manifest).filter((key) => manifest[key].isEntry)
const preloadKeys = preloadFiles.map((file) => {
  const key = Object.keys(manifest).find((key) => manifest[key].file === file)
  assert.ok(key, `Missing modulepreload: ${file}`)
  return key
})
assert.ok(entryKeys.length)
const summarize = (files) => {
  const entries = [...new Set(files)].sort().map((file) => {
    const bytes = readFileSync(resolve(root, file))
    return { file, bytes: bytes.length, gzip: gzipSync(bytes).length }
  })
  return { files: entries, bytes: entries.reduce((sum, file) => sum + file.bytes, 0), gzip: entries.reduce((sum, file) => sum + file.gzip, 0) }
}
const measure = (seeds) => {
  const keys = dependencies(manifest, [...entryKeys, ...preloadKeys, ...seeds])
  return {
    js: summarize(keys.map((key) => manifest[key].file).filter((file) => file.endsWith('.js'))),
    css: summarize(keys.flatMap((key) => manifest[key].css || [])),
  }
}
const bootstrap = measure([])
const homepage = measure(['src/layout/HomeLayout.vue', 'src/views/HomePage.vue'])
const routes = Object.keys(manifest).filter((key) => manifest[key].isDynamicEntry).map((route) => {
  const { js, css } = measure([route])
  return { route, js: { bytes: js.bytes, gzip: js.gzip }, css: { bytes: css.bytes, gzip: css.gzip } }
})
console.log(JSON.stringify({
  node: process.version,
  gzip: 'node:zlib gzipSync defaults (per file)',
  lockfileSha256: createHash('sha256').update(readFileSync('package-lock.json')).digest('hex'),
  entryKeys, preloadFiles, bootstrap, homepage, routes,
  allCss: summarize(Object.values(manifest).flatMap((entry) => [entry.file, ...(entry.css || [])]).filter((file) => file.endsWith('.css'))),
}, null, 2))
