<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BaseBtn, BaseTable } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

type Row = { id: number; name: string }

const { locale, t } = useI18n()
const rows: Row[] = [
  { id: 1, name: '測試 1' },
  { id: 2, name: '測試 2' },
  { id: 3, name: '測試 3' },
]
const columns: TableColumn<Row>[] = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'name', label: '名稱', align: 'center' },
]
const loading = ref(false)
const action = ref('')
</script>

<template>
  <div class="stack">
    <div class="actions">
      <BaseBtn type="primary" @click="loading = !loading">{{ loading ? '停止載入' : '開始載入' }}</BaseBtn>
      <BaseBtn @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">切換語系 (當前: {{ locale }})</BaseBtn>
    </div>
    <p class="hint">
      測試項目：
      <br />
      1. loading 文字：{{ t('common.loading') }}
      <br />
      2. 查看按鈕：{{ t('common.view') }}
      <br />
      3. 編輯按鈕：{{ t('common.edit') }}
    </p>
    <BaseTable
      :data="rows"
      :columns="columns"
      :loading="loading"
      show-check-btn
      show-edit-btn
      @click:check-row="action = `查看 ${$event.name}`"
      @click:edit-row="action = `編輯 ${$event.name}`"
    />
    <p class="hint">空資料時的文字：</p>
    <BaseTable :data="[]" :columns="columns" :loading="loading" show-check-btn show-edit-btn />
    <p v-if="action" class="hint">操作: {{ action }}</p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.hint {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
