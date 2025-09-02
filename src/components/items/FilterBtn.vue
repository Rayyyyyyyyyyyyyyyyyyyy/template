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

const emit = defineEmits<{
  (e: 'update:reset'): void
  (e: 'update:submit'): void
}>()

const resetValue = () => {
  emit('update:reset')
}
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
  <base-btn type="primary" class="filter-btn" @click="onClickBtn">
    <el-badge
      :value="badgeValue"
      class="!flex justify-center items-center"
      type="primary"
      v-if="badgeValue && badgeValue > 0"
    >
      <el-icon class="filter-icon fill-icon">
        <Filter />
      </el-icon>
    </el-badge>
    <el-icon v-else class="filter-icon">
      <Filter />
    </el-icon>
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
      <base-btn type="primary" class="filter-btn" @click="submitFilter">
        <el-icon>
          <Search />
        </el-icon>
        <p>查詢</p>
      </base-btn>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
