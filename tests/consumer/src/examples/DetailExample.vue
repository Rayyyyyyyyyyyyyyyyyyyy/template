<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseInput, DetailLayout } from 'rayyy-vue-table-components/components'
const editing = ref(true)
const saved = ref('Ada')
const draft = ref(saved.value)
function save() { saved.value = draft.value; editing.value = false }
function cancel() { draft.value = saved.value; editing.value = false }
</script>

<template>
  <!-- 僅更新宿主記憶體；取消時恢復上次儲存的輸入。 -->
  <BaseBtn v-if="!editing" text="編輯" @click="editing = true" />
  <DetailLayout title="用戶資料" :is-editable="editing"
    @update:save-edit="save" @update:cancel-edit="cancel">
    <template #main>
      <BaseInput v-if="editing" v-model="draft" aria-label="姓名" />
      <p v-else>{{ saved }}</p>
    </template>
  </DetailLayout>
</template>
