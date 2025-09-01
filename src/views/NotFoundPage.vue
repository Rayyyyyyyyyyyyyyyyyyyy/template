<script setup lang="ts">
import { ref } from 'vue'

const errorMsg = ref('Oops~ 該頁面不存在唷~')
</script>
<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-4 text-black">
    <div class="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-lg">
      <div class="text-6xl text-gray-400">404</div>
    </div>
    <p class="text-center text-2xl font-bold">{{ errorMsg }}</p>
  </div>
</template>

<style scoped></style>
