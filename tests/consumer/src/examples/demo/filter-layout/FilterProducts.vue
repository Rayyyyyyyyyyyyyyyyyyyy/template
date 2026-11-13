<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FilterLayout, BaseInput, BaseBtn } from 'rayyy-vue-table-components/components'

const emptyForm = () => ({ keyword: '', category: '', status: '', dateRange: '', minPrice: '', maxPrice: '' })
const filterForm = reactive(emptyForm())

// 本範例只顯示固定的模擬資料；實際篩選（例如呼叫 API）由宿主實作。
const results = [
  { id: 1, name: '產品A', category: '電子產品', status: '在售', price: 2999 },
  { id: 2, name: '產品B', category: '服飾', status: '缺貨', price: 599 },
  { id: 3, name: '產品C', category: '電子產品', status: '在售', price: 1299 },
  { id: 4, name: '產品D', category: '家居用品', status: '在售', price: 399 },
  { id: 5, name: '產品E', category: '服飾', status: '停售', price: 799 },
]
const statusClass = { 在售: 'is-ok', 缺貨: 'is-out', 停售: 'is-stop' } as const
const showResults = ref(false)

const reset = () => {
  Object.assign(filterForm, emptyForm())
  showResults.value = false
}
</script>

<template>
  <div class="stack">
    <div class="panel">
      <FilterLayout main-title="產品篩選" filter-title="篩選條件" @submit-emit="showResults = true" @reset-emit="reset">
        <div class="form">
          <label class="field">
            <span class="label">關鍵字搜尋</span>
            <BaseInput v-model="filterForm.keyword" placeholder="請輸入產品名稱或描述" />
          </label>
          <div class="row">
            <label class="field">
              <span class="label">產品分類</span>
              <BaseInput v-model="filterForm.category" placeholder="請選擇分類" />
            </label>
            <label class="field">
              <span class="label">產品狀態</span>
              <BaseInput v-model="filterForm.status" placeholder="請選擇狀態" />
            </label>
          </div>
          <label class="field">
            <span class="label">上架日期範圍</span>
            <BaseInput v-model="filterForm.dateRange" placeholder="請選擇日期範圍" />
          </label>
          <div class="row">
            <label class="field">
              <span class="label">最低價格</span>
              <BaseInput v-model="filterForm.minPrice" placeholder="請輸入最低價格" type="number" />
            </label>
            <label class="field">
              <span class="label">最高價格</span>
              <BaseInput v-model="filterForm.maxPrice" placeholder="請輸入最高價格" type="number" />
            </label>
          </div>
        </div>
      </FilterLayout>
    </div>

    <div v-if="showResults" class="panel">
      <div class="results-head">
        <h3 class="results-title">篩選結果</h3>
        <BaseBtn type="default" @click="showResults = false">清除結果</BaseBtn>
      </div>
      <div class="cards">
        <div v-for="item in results" :key="item.id" class="card">
          <div class="card-head">
            <h4 class="card-name">{{ item.name }}</h4>
            <span class="card-id">#{{ item.id }}</span>
          </div>
          <div class="card-line">分類: {{ item.category }}</div>
          <div class="card-line">狀態: <span :class="statusClass[item.status as keyof typeof statusClass]">{{ item.status }}</span></div>
          <div class="card-price">NT$ {{ item.price.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.panel {
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
}
.form {
  display: grid;
  gap: 16px;
  padding: 24px;
}
.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.field {
  display: grid;
  gap: 8px;
}
.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}
.results-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--el-border-color);
}
.results-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px;
}
.card {
  display: grid;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-name {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}
.card-id {
  color: var(--el-text-color-secondary);
}
.card-price {
  font-weight: 500;
  color: var(--el-color-primary);
}
.is-ok {
  color: var(--el-color-success);
}
.is-out {
  color: var(--el-color-danger);
}
.is-stop {
  color: var(--el-text-color-secondary);
}
</style>
