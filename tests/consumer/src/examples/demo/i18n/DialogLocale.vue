<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const { locale, t } = useI18n()
const visible = ref(false)
</script>

<template>
  <div class="stack">
    <div class="actions">
      <BaseBtn type="primary" @click="visible = true">打開對話框</BaseBtn>
      <BaseBtn @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">切換語系 (當前: {{ locale }})</BaseBtn>
    </div>
    <p class="hint">
      測試項目：
      <br />
      確定按鈕：{{ t('common.confirm') }}
      <br />
      取消按鈕：{{ t('common.cancel') }}
    </p>
    <BaseDialog v-model="visible" title="測試對話框">
      <p>這是測試內容</p>
    </BaseDialog>
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
