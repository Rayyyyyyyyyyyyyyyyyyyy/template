<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/constants'

const router = useRouter()
</script>

<template>
  <div class="home-page">
    <div class="home-intro">
      <h1>Vue Table <br /><span>Components</span></h1>
      <p>基於 Vue 3 + Element Plus 的強大表格組件庫</p>
      <div class="home-actions">
        <button
          type="button"
          class="site-button site-button--primary"
          @click="router.push(ROUTES.DEMO)"
        >
          查看示範
        </button>
        <a
          class="site-button"
          href="https://www.npmjs.com/package/rayyy-vue-table-components"
          target="_blank"
          rel="noopener noreferrer"
        >
          安裝套件
        </a>
        <a
          class="site-button"
          href="https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
    <div class="home-reference">
      <h2>從表格到完整列表頁面</h2>
      <p>搜尋、篩選、分頁與欄位配置，沿用 Element Plus 的操作方式。</p>
      <dl class="home-components">
        <div>
          <dt>BaseTable</dt>
          <dd>資料展示與自訂欄位</dd>
        </div>
        <div>
          <dt>SearchableListPanel</dt>
          <dd>搜尋、篩選與分頁</dd>
        </div>
        <div>
          <dt>TransferDialog</dt>
          <dd>欄位顯示與拖曳排序</dd>
        </div>
      </dl>
      <code class="install-command">npm install rayyy-vue-table-components</code>
    </div>
  </div>
</template>
