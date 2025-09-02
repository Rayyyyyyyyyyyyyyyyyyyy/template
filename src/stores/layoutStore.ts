import { defineStore } from 'pinia'
import { nextTick } from 'vue'

const LayoutStore = defineStore('layoutStore', {
  state: () => ({
    doResetFilter: false,
  }),
  actions: {
    async filterDrawerResetClick() {
      this.doResetFilter = true
      await nextTick()
      this.doResetFilter = false
    },
  },
})

export const layoutStore = LayoutStore()
