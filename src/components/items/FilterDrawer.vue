<script lang="ts" setup>
import { computed } from 'vue'
import { BaseBtn } from '@/components'
import { Search } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    drawerSize?: string
  }>(),
  {
    drawerSize: '50%',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'reset'): void
  (e: 'submit'): void
}>()

const showDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const resetValue = () => {
  emit('reset')
}

const submitFilter = () => {
  emit('submit')
  showDrawer.value = false
}
</script>

<template>
  <el-drawer v-model="showDrawer" :size="drawerSize">
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
