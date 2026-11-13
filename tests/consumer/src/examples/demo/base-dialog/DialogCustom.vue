<script setup lang="ts">
import { ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)
const form = ref({ name: '', email: '' })

const handleSubmit = () => {
  console.log('提交表單:', form.value)
  visible.value = false
}
</script>

<template>
  <BaseBtn type="success" @click="visible = true">打開自定義對話框</BaseBtn>
  <BaseDialog v-model="visible" title="自定義對話框" width="600px">
    <template #header>
      <div class="header">
        <el-icon class="header__icon" :size="24"><InfoFilled /></el-icon>
        <span class="header__text">自定義標題</span>
      </div>
    </template>

    <p>這是一個自定義標題的對話框。</p>
    <el-form :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="請輸入姓名" />
      </el-form-item>
      <el-form-item label="郵箱">
        <el-input v-model="form.email" placeholder="請輸入郵箱" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="footer">
        <BaseBtn type="default" @click="visible = false">取消</BaseBtn>
        <BaseBtn type="primary" @click="handleSubmit">確定</BaseBtn>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header__icon {
  color: var(--el-color-primary);
}
.header__text {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
