<script setup lang="ts">
import { ref } from 'vue'

const errorMsg = ref('Oops~ 該頁面不存在唷~')
</script>
<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-4 text-black">
    <figure class="w-48">
      <img src="../../assets/images/not-found.png" alt="" onerror="this.style.display='none'" />
    </figure>
    <p class="text-center text-2xl font-bold">{{ errorMsg }}</p>
  </div>
</template>

<style scoped></style>
