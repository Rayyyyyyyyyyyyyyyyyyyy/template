<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">TransferItem 組件示範</h1>

      <!-- 基礎穿梭框項目 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎穿梭框項目</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 左側列表 -->
          <div>
            <h3 class="text-lg font-medium mb-4">可選項目</h3>
            <div class="space-y-2">
              <TransferItem
                v-for="item in availableItems"
                :key="item.id"
                :item="item"
                :selected="selectedItems.includes(item.id)"
                @select="handleSelect"
              />
            </div>
          </div>

          <!-- 右側列表 -->
          <div>
            <h3 class="text-lg font-medium mb-4">已選項目</h3>
            <div class="space-y-2">
              <TransferItem
                v-for="item in selectedItemsData"
                :key="item.id"
                :item="item"
                :selected="true"
                @select="handleDeselect"
              />
            </div>
          </div>
        </div>
      </el-card>

      <!-- 拖拽功能 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">拖拽功能</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 左側可拖拽列表 -->
          <div>
            <h3 class="text-lg font-medium mb-4">可拖拽項目</h3>
            <div class="space-y-2">
              <TransferItem
                v-for="item in draggableItems"
                :key="item.id"
                :item="item"
                :draggable="true"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
              />
            </div>
          </div>

          <!-- 右側拖拽目標 -->
          <div>
            <h3 class="text-lg font-medium mb-4">拖拽目標區域</h3>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-32"
              @drop="handleDrop"
              @dragover.prevent
              @dragenter.prevent
            >
              <div v-if="droppedItems.length === 0" class="text-gray-500 text-center">
                拖拽項目到此處
              </div>
              <div v-else class="space-y-2">
                <TransferItem
                  v-for="item in droppedItems"
                  :key="item.id"
                  :item="item"
                  :selected="true"
                />
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 禁用狀態 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">禁用狀態</h2>
        </template>
        <div class="space-y-2">
          <TransferItem
            v-for="item in disabledItems"
            :key="item.id"
            :item="item"
            :disabled="item.disabled"
            :selected="false"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TransferItem } from '@/components'

// 可用項目
const availableItems = ref([
  { id: 1, name: '項目一', description: '這是項目一的描述' },
  { id: 2, name: '項目二', description: '這是項目二的描述' },
  { id: 3, name: '項目三', description: '這是項目三的描述' },
  { id: 4, name: '項目四', description: '這是項目四的描述' },
  { id: 5, name: '項目五', description: '這是項目五的描述' }
])

// 已選項目ID
const selectedItems = ref([1, 3])

// 已選項目數據
const selectedItemsData = computed(() => {
  return availableItems.value.filter(item => selectedItems.value.includes(item.id))
})

// 可拖拽項目
const draggableItems = ref([
  { id: 6, name: '拖拽項目一', description: '可以拖拽的項目一' },
  { id: 7, name: '拖拽項目二', description: '可以拖拽的項目二' },
  { id: 8, name: '拖拽項目三', description: '可以拖拽的項目三' }
])

// 已拖拽項目
const droppedItems = ref([])

// 禁用項目
const disabledItems = ref([
  { id: 9, name: '禁用項目一', description: '這個項目被禁用了', disabled: true },
  { id: 10, name: '正常項目', description: '這個項目是正常的', disabled: false },
  { id: 11, name: '禁用項目二', description: '這個項目也被禁用了', disabled: true }
])

// 事件處理
const handleSelect = (item: any) => {
  if (!selectedItems.value.includes(item.id)) {
    selectedItems.value.push(item.id)
  }
  console.log('選中項目:', item)
}

const handleDeselect = (item: any) => {
  const index = selectedItems.value.indexOf(item.id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  }
  console.log('取消選中項目:', item)
}

const handleDragStart = (item: any) => {
  console.log('開始拖拽:', item)
}

const handleDragEnd = (item: any) => {
  console.log('結束拖拽:', item)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  const itemId = parseInt(event.dataTransfer?.getData('text/plain') || '0')
  const item = draggableItems.value.find(i => i.id === itemId)
  if (item && !droppedItems.value.find(i => i.id === itemId)) {
    droppedItems.value.push(item)
  }
  console.log('拖拽放置:', item)
}
</script>

<style scoped></style>
