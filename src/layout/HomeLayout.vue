<script setup lang="ts">
import { FunctionHeader } from '@/components'
import { ROUTES } from '@/router/constants.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showBack = computed(() => route.path !== ROUTES.DEMO)
</script>

<template>
  <el-container class="w-full">
    <el-main class="bg-white !p-0">
      <function-header v-if="showBack" :showBack="ROUTES.DEMO" title="Back to home" />

      <router-view v-slot="{ Component }">
        <keep-alive :include="/.*(Page|Detail)$/">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss"></style>
