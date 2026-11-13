<script setup lang="ts">
import { reactive, ref } from 'vue'
import { DetailLayout, BaseInput, BaseBtn } from 'rayyy-vue-table-components/components'

const groups = [
  { title: '基本資訊', fields: [['name', '姓名'], ['email', '電子郵件'], ['phone', '電話']] },
  { title: '工作資訊', fields: [['department', '部門'], ['position', '職位'], ['joinDate', '入職日期']] },
  { title: '其他資訊', fields: [['salary', '薪資'], ['status', '狀態']] },
] as const

const isEditable = ref(false)
const pageLoading = ref(false)
const formData = reactive<Record<string, string>>({
  name: '張三',
  email: 'zhangsan@example.com',
  phone: '0912-345-678',
  department: '技術部',
  position: '前端工程師',
  joinDate: '2023-01-15',
  salary: '80000',
  status: '在職',
})
const backPayload = ref('尚未返回')

// 只更新畫面上的記憶體資料；實際儲存到後端由宿主決定。
const simulateLoading = () => {
  pageLoading.value = true
  setTimeout(() => {
    pageLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="stack">
    <div class="actions">
      <BaseBtn type="primary" :disabled="isEditable" @click="isEditable = true">開始編輯</BaseBtn>
      <BaseBtn type="success" @click="simulateLoading">模擬加載</BaseBtn>
    </div>
    <div class="panel">
      <DetailLayout
        title="員工詳細資料"
        show-back
        :is-editable="isEditable"
        :page-loading="pageLoading"
        @update:save-edit="isEditable = $event"
        @update:cancel-edit="isEditable = false"
        @click:back="backPayload = JSON.stringify($event)"
      >
        <template #detailHeader>
          <div class="header">
            <div>
              <h3 class="header-title">員工資訊</h3>
              <p class="header-desc">查看和編輯員工詳細資料</p>
            </div>
            <div class="header-meta">
              <div>員工編號: EMP001</div>
              <div>最後更新: 2024-01-15</div>
            </div>
          </div>
        </template>

        <template #main>
          <div class="body">
            <section v-for="group in groups" :key="group.title" class="group">
              <h4 class="group-title">{{ group.title }}</h4>
              <label v-for="[key, label] in group.fields" :key="key" class="field">
                <span class="field-label">{{ label }}</span>
                <BaseInput v-model="formData[key]" :disabled="!isEditable" :placeholder="`請輸入${label}`" />
              </label>
            </section>
          </div>
        </template>
      </DetailLayout>
    </div>
    <p class="result">click:back payload: <output aria-live="polite">{{ backPayload }}</output>（實際導頁由宿主決定）</p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.actions {
  display: flex;
  gap: 12px;
}
.panel {
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--el-color-primary-light-7);
  background: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
}
.header-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
.header-desc {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.header-meta {
  font-size: 13px;
  text-align: right;
  color: var(--el-text-color-secondary);
}
.body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  padding: 24px;
}
.group {
  display: grid;
  align-content: start;
  gap: 12px;
}
.group-title {
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--el-border-color);
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}
.field {
  display: grid;
  gap: 4px;
}
.field-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}
.result {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
