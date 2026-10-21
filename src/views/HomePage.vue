<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDemo = () => {
  router.push('/demo')
}
</script>

<template>
  <div class="min-h-screen bg-navy-10 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Vue Table Components</h1>
      <p class="text-xl text-gray-600 mb-8">基於 Vue 3 + Element Plus 的強大表格組件庫</p>
      <div class="space-x-4">
        <button
          type="button"
          @click="goToDemo"
          class="px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark transition-colors"
        >
          查看示範
        </button>
        <a
          href="https://www.npmjs.com/package/rayyy-vue-table-components"
          target="_blank"
          class="inline-block px-6 py-3 bg-green-control text-white rounded-lg hover:bg-green-control-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-control transition-colors"
        >
          安裝套件
        </a>
        <a
          href="https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template"
          target="_blank"
          class="inline-block px-6 py-3 bg-navy-40 text-white rounded-lg hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-40 transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>
