<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { BaseBtn, TransferDialog, TransferItem } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

const columns = ref<TableColumn[]>([
  { prop: 'id', label: 'ID', checkActive: true },
  { prop: 'name', label: '姓名', checkActive: true },
  { prop: 'email', label: '郵箱', checkActive: true },
  { prop: 'department', label: '部門', checkActive: false },
])
const visible = ref(false)

function confirm(value: TableColumn[]) {
  columns.value = value
  visible.value = false
}
</script>

<template>
  <div class="stack">
    <BaseBtn type="primary" @click="visible = true">配置欄位</BaseBtn>
    <p class="result">顯示欄位: {{ columns.filter((column) => column.checkActive).map((column) => column.label).join('、') || '無' }}</p>
    <TransferDialog v-model="visible" :columns-value="columns" transfer-title="配置欄位" @update:submit="confirm">
      <template #list-container="{ columns: items, clickItemProp, handleItemEvents, handleMousedown, handleReorder }">
        <draggable :model-value="items" item-key="prop" delay="200" @update:model-value="handleReorder">
          <template #item="{ element, index }">
            <TransferItem
              :dialog-modal-visible="visible"
              :columns-value="element"
              :columns-index="index"
              :columns-len="items.length"
              :class="{
                'transfer-active-bg': element.checkActive,
                'transfer-active-border': clickItemProp === element.prop,
              }"
              @mousedown="handleMousedown(element.prop)"
              @update:toTop="handleItemEvents.toTop(index)"
              @update:toBottom="handleItemEvents.toBottom(index)"
              @update:toPre="handleItemEvents.toPre(index)"
              @update:toNext="handleItemEvents.toNext(index)"
              @update:toLock="handleItemEvents.toLock(index)"
              @update:toUnLock="handleItemEvents.toUnLock(index)"
            />
          </template>
        </draggable>
      </template>
    </TransferDialog>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
  justify-items: start;
}
.result {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
