<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDemo = () => {
  router.push('/demo')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Vue Table Components
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        基於 Vue 3 + Element Plus 的強大表格組件庫
      </p>
      <div class="space-x-4">
        <button
          @click="goToDemo"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          查看示範
        </button>
        <a
          href="https://www.npmjs.com/package/rayyy-vue-table-components"
          target="_blank"
          class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          安裝套件
        </a>
      </div>
    </div>
  </div>
</template>
