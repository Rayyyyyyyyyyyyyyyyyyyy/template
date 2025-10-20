<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

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
}>()

const emits = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

// 獲取所有非 props 屬性
const attrs = useAttrs()

const click = (evt: MouseEvent) => {
  emits('click', evt)
}

const buttonClass = computed(() => {
  return {
    [props.class || '']: true,
    'is-fill': props.isFill,
  }
})
</script>

<template>
  <el-button
    v-bind="attrs"
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
  >
    <slot>
      {{ props.text }}
    </slot>
  </el-button>
</template>

<style scoped lang="scss">
.el-button {
  font-size: 0.875rem;
  line-height: 1.25rem;

  :deep(span) {
    font-weight: 700 !important;
  }

  &:focus-visible {
    outline: none !important;
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
    --el-button-disabled-text-color: var(--main-color-light-7);
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

  // 成功按钮样式
  &--success {
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--el-color-success);
    --el-button-hover-bg-color: var(--el-color-success);
    --el-button-hover-border-color: var(--el-color-success);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--el-color-success-dark-2);
    --el-button-active-border-color: var(--el-color-success-dark-2);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-success-light-7);
    --el-button-disabled-text-color: var(--el-color-success-light-7);
    --el-button-text-color: var(--el-color-success);

    &.is-fill {
      --el-button-bg-color: var(--el-color-success);
      --el-button-border-color: var(--el-color-success);
      --el-button-hover-bg-color: var(--el-color-success-dark-2);
      --el-button-hover-border-color: var(--el-color-success-dark-2);
      --el-button-active-bg-color: var(--el-color-success-dark-2);
      --el-button-active-border-color: var(--el-color-success-dark-2);
      --el-button-disabled-bg-color: var(--el-color-success-light-7);
      --el-button-disabled-border-color: var(--el-color-success-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 警告按钮样式
  &--warning {
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--el-color-warning);
    --el-button-hover-bg-color: var(--el-color-warning);
    --el-button-hover-border-color: var(--el-color-warning);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--el-color-warning-dark-2);
    --el-button-active-border-color: var(--el-color-warning-dark-2);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-warning-light-7);
    --el-button-disabled-text-color: var(--el-color-warning-light-7);
    --el-button-text-color: var(--el-color-warning);

    &.is-fill {
      --el-button-bg-color: var(--el-color-warning);
      --el-button-border-color: var(--el-color-warning);
      --el-button-hover-bg-color: var(--el-color-warning-dark-2);
      --el-button-hover-border-color: var(--el-color-warning-dark-2);
      --el-button-active-bg-color: var(--el-color-warning-dark-2);
      --el-button-active-border-color: var(--el-color-warning-dark-2);
      --el-button-disabled-bg-color: var(--el-color-warning-light-7);
      --el-button-disabled-border-color: var(--el-color-warning-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 危险按钮样式
  &--danger {
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--el-color-danger);
    --el-button-hover-bg-color: var(--el-color-danger);
    --el-button-hover-border-color: var(--el-color-danger);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--el-color-danger-dark-2);
    --el-button-active-border-color: var(--el-color-danger-dark-2);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-danger-light-7);
    --el-button-disabled-text-color: var(--el-color-danger-light-7);
    --el-button-text-color: var(--el-color-danger);

    &.is-fill {
      --el-button-bg-color: var(--el-color-danger);
      --el-button-border-color: var(--el-color-danger);
      --el-button-hover-bg-color: var(--el-color-danger-dark-2);
      --el-button-hover-border-color: var(--el-color-danger-dark-2);
      --el-button-active-bg-color: var(--el-color-danger-dark-2);
      --el-button-active-border-color: var(--el-color-danger-dark-2);
      --el-button-disabled-bg-color: var(--el-color-danger-light-7);
      --el-button-disabled-border-color: var(--el-color-danger-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 信息按钮样式
  &--info {
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--el-color-info);
    --el-button-hover-bg-color: var(--el-color-info);
    --el-button-hover-border-color: var(--el-color-info);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--el-color-info-dark-2);
    --el-button-active-border-color: var(--el-color-info-dark-2);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-info-light-7);
    --el-button-disabled-text-color: var(--el-color-info-light-7);
    --el-button-text-color: var(--el-color-info);

    &.is-fill {
      --el-button-bg-color: var(--el-color-info);
      --el-button-border-color: var(--el-color-info);
      --el-button-hover-bg-color: var(--el-color-info-dark-2);
      --el-button-hover-border-color: var(--el-color-info-dark-2);
      --el-button-active-bg-color: var(--el-color-info-dark-2);
      --el-button-active-border-color: var(--el-color-info-dark-2);
      --el-button-disabled-bg-color: var(--el-color-info-light-7);
      --el-button-disabled-border-color: var(--el-color-info-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 通用禁用样式
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      transform: none;
    }

    &:active {
      transform: none;
    }
  }

  // 填充樣式的禁用狀態 - 使用白色文字
  &.is-fill.is-disabled {
    color: white !important;
  }
}
</style>
