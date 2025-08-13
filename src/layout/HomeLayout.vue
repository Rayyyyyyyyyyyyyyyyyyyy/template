<script setup lang="ts">


</script>

<template>
  <el-container class="w-full">
    <el-main class="bg-white p-0">
      <router-view v-slot="{ Component }">
        <keep-alive :include="/.*(Page|Detail)$/">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
</style>
