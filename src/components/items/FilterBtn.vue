<script lang="ts" setup>
import { computed, ref, useAttrs } from 'vue'
import { BaseBtn } from '@/components'
import { Search, Filter } from '@element-plus/icons-vue'

const props = defineProps<{
  badgeValue?: number
  drawerSize?: string
}>()

// 獲取所有非 props 屬性
const attrs = useAttrs()

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
  if (props.drawerSize) {
    return props.drawerSize
  } else {
    return '50%'
  }
})

const submitFilter = () => {
  showDrawer.value = false
}
</script>

<template>
  <base-btn v-bind="attrs" type="primary" class="filter-btn" @click="onClickBtn">
    <el-badge
      :value="badgeValue"
      class="!flex justify-center items-center"
      type="primary"
      v-if="badgeValue && badgeValue > 0"
    >
      <slot name="fill-filter">
        <el-icon class="filter-icon fill-icon">
          <Filter />
        </el-icon>
      </slot>
    </el-badge>
    <slot name="filter-icon" v-else>
      <el-icon class="filter-icon">
        <Filter />
      </el-icon>
    </slot>
  </base-btn>
  <el-drawer v-model="showDrawer" append-to-body :size="computedDrawerSize">
    <template #header>
      <div class="flex justify-center text-base text-black font-semibold">
        <span>查詢條件</span>
      </div>
    </template>

    <div class="flex justify-between items-center pb-5 font-semibold">
      <div class="text-base text-black/70">篩選條件</div>
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
