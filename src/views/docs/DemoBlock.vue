<script setup lang="ts">
import { computed, ref } from 'vue'
import { CopyDocument, Document } from '@element-plus/icons-vue'
import { useCopySource } from './useCopySource'

const props = defineProps<{ title: string; description?: string; source: string }>()
const { copying, status, copySource } = useCopySource(() => props.source)
const expanded = ref(false)
const anchor = computed(() => props.title.replace(/\s+/g, '-'))
const codeId = computed(() => `${anchor.value}-code`)
</script>

<template>
  <section class="demo-block">
    <h2 :id="anchor" class="demo-block__title">{{ title }}</h2>
    <p v-if="description" class="demo-block__desc">{{ description }}</p>
    <div class="demo-block__box">
      <div class="demo-block__live"><slot /></div>
      <div class="demo-block__bar">
        <span role="status" class="demo-block__status">{{ status }}</span>
        <button type="button" class="demo-block__icon" data-test="copy" aria-label="複製程式碼"
          :aria-busy="copying" @click="copySource">
          <CopyDocument aria-hidden="true" />
        </button>
        <button type="button" class="demo-block__icon" aria-label="查看程式碼"
          :aria-expanded="expanded" :aria-controls="codeId" @click="expanded = !expanded">
          <Document aria-hidden="true" />
        </button>
      </div>
      <div v-show="expanded" :id="codeId" class="demo-block__code">
        <pre><code v-text="source" /></pre>
        <button type="button" class="demo-block__hide" data-test="hide-code" @click="expanded = false">
          隱藏程式碼
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-block { margin-bottom: 32px; }
.demo-block__title { margin: 0 0 8px; font-size: 24px; font-weight: 600; color: var(--el-text-color-primary); }
.demo-block__desc { margin: 0 0 16px; color: var(--el-text-color-regular); }
.demo-block__box { border: 1px solid var(--el-border-color); border-radius: 4px; min-width: 0; }
.demo-block__live { padding: 24px; }
.demo-block__bar {
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  padding: 8px 12px; border-top: 1px solid var(--el-border-color-lighter);
}
.demo-block__status { margin-right: auto; font-size: 13px; color: var(--el-text-color-secondary); }
.demo-block__icon {
  display: inline-flex; padding: 6px; border: 0; border-radius: 4px; background: transparent;
  color: var(--el-text-color-secondary); cursor: pointer;
}
.demo-block__icon svg { width: 18px; height: 18px; }
.demo-block__icon:hover { color: var(--el-color-primary); background: var(--el-fill-color-light); }
.demo-block__icon:focus-visible,
.demo-block__hide:focus-visible { outline: 2px solid var(--el-color-primary); outline-offset: 2px; }
.demo-block__code { border-top: 1px solid var(--el-border-color-lighter); background: var(--el-fill-color-light); }
.demo-block__code pre {
  margin: 0; padding: 16px 20px; overflow-x: auto; color: var(--el-text-color-primary);
  font: 13px/1.8 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; tab-size: 2;
}
.demo-block__hide {
  display: block; width: 100%; padding: 10px; border: 0; border-top: 1px solid var(--el-border-color-lighter);
  background: transparent; color: var(--el-text-color-secondary); cursor: pointer;
}
.demo-block__hide:hover { color: var(--el-color-primary); }
</style>
