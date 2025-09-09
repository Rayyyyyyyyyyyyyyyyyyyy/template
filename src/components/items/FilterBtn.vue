<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import { BaseBtn } from '@/components'
import { Filter } from '@element-plus/icons-vue'
import FilterDrawer from './FilterDrawer.vue'

withDefaults(
  defineProps<{
    badgeValue?: number
    drawerSize?: string
  }>(),
  {
    drawerSize: '50%',
  },
)

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

const submitFilter = () => {
  emit('update:submit')
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
  <FilterDrawer
    v-model="showDrawer"
    :drawerSize="drawerSize"
    @reset="resetValue"
    @submit="submitFilter"
  >
    <slot></slot>
  </FilterDrawer>
</template>

<style scoped lang="scss"></style>
