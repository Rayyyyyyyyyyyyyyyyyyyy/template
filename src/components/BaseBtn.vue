<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  text?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
  size?: 'default' | 'small' | 'large'
  plain?: boolean
  class?: string
  disabled?: boolean
  textBtn?: boolean
  icon?: object
  link?: boolean
  isFill?: boolean
  loading?: boolean
  dataCy?: string
}>()

const emits = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const click = (evt: MouseEvent) => {
  emits('click', evt)
}

const buttonClass = computed(() => {
  return {
    [props.class || '']: true,
    'is-fill': props.isFill
  }
})
</script>

<template>
  <el-button
    :type="props.type"
    :size="props.size"
    :plain="props.plain"
    :class="buttonClass"
    :disabled="props.disabled"
    :icon="props.icon"
    :link="props.link"
    :loading="props.loading"
    :text="props.textBtn"
    @click="click"
    :data-cy="props.dataCy"
  >
    <slot>
      {{ props.text }}
    </slot>
  </el-button>
</template>

<style scoped lang="scss">
.el-button {
  @apply text-sm;

  :deep(span) {
    @apply font-bold #{!important};
  }

  &:focus-visible {
    @apply outline-none #{!important};
  }

  // 主要按钮样式
  &--primary {
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--main-color);
    --el-button-hover-bg-color: var(--main-color);
    --el-button-hover-border-color: var(--main-color);
    --el-button-active-bg-color: var(--main-color-dark-2);
    --el-button-active-border-color: var(--main-color-dark-2);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--main-color-light-7);
    --el-button-text-color: var(--main-color);
    --el-button-hover-text-color: var(--el-fill-color-blank);

    &.is-fill {
      --el-button-bg-color: var(--main-color);
      --el-button-border-color: var(--main-color);
      --el-button-hover-bg-color: var(--main-color-dark-2);
      --el-button-hover-border-color: var(--main-color-dark-2);
      --el-button-active-bg-color: var(--main-color-dark-2);
      --el-button-active-border-color: var(--main-color-dark-2);
      --el-button-disabled-bg-color: var(--main-color-light-7);
      --el-button-disabled-border-color: var(--main-color-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 默认按钮样式
  &--default {
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--el-border-color);
    --el-button-hover-bg-color: var(--el-fill-color-light);
    --el-button-hover-border-color: var(--main-color);
    --el-button-hover-text-color: var(--main-color);
    --el-button-active-bg-color: var(--el-fill-color-light);
    --el-button-active-border-color: var(--main-color);
    --el-button-active-text-color: var(--main-color);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-border-color-lighter);
    --el-button-disabled-text-color: var(--el-text-color-placeholder);
    --el-button-text-color: var(--el-text-color-regular);
  }
}
</style>
