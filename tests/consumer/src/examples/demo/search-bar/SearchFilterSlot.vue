<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar } from 'rayyy-vue-table-components/components'

const category = ref('')
const status = ref('')
const result = ref('')
</script>

<template>
  <div class="stack">
    <SearchBar show-search @keydown:enter="result = `搜尋關鍵字: ${$event}`" @update:clear="result = ''">
      <template #customerFilter>
        <div class="filters">
          <el-select v-model="category" placeholder="選擇類別" clearable aria-label="類別">
            <el-option label="用戶" value="user" />
            <el-option label="產品" value="product" />
            <el-option label="訂單" value="order" />
          </el-select>
          <el-select v-model="status" placeholder="選擇狀態" clearable aria-label="狀態">
            <el-option label="啟用" value="active" />
            <el-option label="停用" value="inactive" />
          </el-select>
        </div>
      </template>
    </SearchBar>
    <p class="result">篩選: {{ category || '未選類別' }} / {{ status || '未選狀態' }}<template v-if="result">，{{ result }}</template></p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filters .el-select {
  width: 140px;
}
.result {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
