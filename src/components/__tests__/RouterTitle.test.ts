import { describe, expect, it } from 'vitest'
import router, { pageTitle } from '@/router'

const titleOf = (path: string) => pageTitle(router.resolve(path).meta.title)

describe('page titles', () => {
  it('uses the site name alone on the home page', () => {
    expect(titleOf('/')).toBe('RayTable')
  })

  it('prefixes the page title', () => {
    expect(titleOf('/demo')).toBe('組件目錄 · RayTable')
    expect(titleOf('/demo/base-btn')).toBe('BaseBtn · RayTable')
  })

  it('titles unknown paths as not found', () => {
    expect(titleOf('/no/such/page')).toBe('找不到頁面 · RayTable')
  })

  it('gives every child route except home a title', () => {
    const children = router.getRoutes().filter((r) => r.name !== 'HomeLayout' && r.name !== 'Home' && !r.redirect)
    expect(children.length).toBeGreaterThan(10)
    for (const r of children) expect(r.meta.title, String(r.name)).toBeTruthy()
  })

  it('redirects the old dialog demo path and titles the new one', async () => {
    await router.push('/demo/base-waring-dialog')
    expect(router.currentRoute.value.path).toBe('/demo/base-warning-dialog')
    expect(titleOf('/demo/base-warning-dialog')).toBe('BaseWarningDialog · RayTable')
  })

  it('sets document.title on navigation', async () => {
    await router.push('/demo/base-btn')
    await router.isReady()
    expect(document.title).toBe('BaseBtn · RayTable')
  })
})
