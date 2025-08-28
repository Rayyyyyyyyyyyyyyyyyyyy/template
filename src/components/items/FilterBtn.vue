<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { BaseBtn } from '@/components'
import { Search, Filter } from '@element-plus/icons-vue'

const { width } = useWindowSize()

defineProps<{
  badgeValue?: number
}>()

const showDrawer = ref(false)

function onClickBtn() {
  showDrawer.value = !showDrawer.value
}

const resetValue = () => {}
const computedDrawerSize = computed(() => {
  if (width.value > 1200) {
    return '30%'
  } else if (width.value < 500) {
    return '100%'
  } else {
    return '50%'
  }
})

const submitFilter = () => {
  showDrawer.value = false
}
</script>

<template>
  <base-btn type="primary" class="text-sky-800 hover:text-white hover:bg-sky-500 disabled:bg-white disabled:opacity-50 disabled:hover:bg-white" @click="onClickBtn">
    <el-badge :value="badgeValue" class="item" type="primary" v-if="badgeValue && badgeValue > 0">
      <el-icon class="text-xl"><Filter /></el-icon>
    </el-badge>
    <el-icon v-else class="text-xl"><Filter /></el-icon>
  </base-btn>
  <el-drawer v-model="showDrawer" append-to-body :size="computedDrawerSize">
    <template #header>
      <div class="flex justify-center text-base text-black font-semibold">
        <span>查詢條件</span>
      </div>
    </template>

    <div class="flex justify-between items-center pb-5 font-semibold">
      <div class="text-base">篩選條件</div>
      <div class="text-base text-primary cursor-pointer" @click="resetValue">重置</div>
    </div>

    <slot></slot>

    <template #footer>
      <base-btn type="primary" class="text-sky-800 hover:text-white hover:bg-sky-500 disabled:bg-white disabled:opacity-50 disabled:hover:bg-white" @click="submitFilter">
        <el-icon class="text-xl"><Search /></el-icon>
        <p class="ml-2 text-base text-black font-bold hover:text-white disabled:text-black/20">查詢</p>
      </base-btn>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
</style>
