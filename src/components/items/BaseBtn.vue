<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import type { BaseBtnSlots, BaseBtnEventMap, BaseBtnProps } from '../../types/components'

const props = defineProps<BaseBtnProps>()

const emits = defineEmits<BaseBtnEventMap>()

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
defineSlots<BaseBtnSlots>()
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
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
  }

  // 主要按钮样式
  &.el-button--primary {
    --control-text: var(--main-color);
    --el-button-hover-link-text-color: var(--main-color-dark-2);
    --el-button-active-color: var(--main-color-dark-2);
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
  &.el-button--default {
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
  &.el-button--success {
    --control-text: var(--control-success);
    --el-button-hover-link-text-color: var(--control-success-hover);
    --el-button-active-color: var(--control-success-hover);
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--control-success);
    --el-button-hover-bg-color: var(--control-success);
    --el-button-hover-border-color: var(--control-success);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--control-success-hover);
    --el-button-active-border-color: var(--control-success-hover);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-success-light-7);
    --el-button-disabled-text-color: var(--el-color-success-light-7);
    --el-button-text-color: var(--control-success);

    &.is-fill {
      --el-button-bg-color: var(--control-success);
      --el-button-border-color: var(--control-success);
      --el-button-hover-bg-color: var(--control-success-hover);
      --el-button-hover-border-color: var(--control-success-hover);
      --el-button-active-bg-color: var(--control-success-hover);
      --el-button-active-border-color: var(--control-success-hover);
      --el-button-disabled-bg-color: var(--el-color-success-light-7);
      --el-button-disabled-border-color: var(--el-color-success-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 警告按钮样式
  &.el-button--warning {
    --control-text: var(--control-warning);
    --el-button-hover-link-text-color: var(--control-warning-hover);
    --el-button-active-color: var(--control-warning-hover);
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--control-warning);
    --el-button-hover-bg-color: var(--control-warning);
    --el-button-hover-border-color: var(--control-warning);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--control-warning-hover);
    --el-button-active-border-color: var(--control-warning-hover);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-warning-light-7);
    --el-button-disabled-text-color: var(--el-color-warning-light-7);
    --el-button-text-color: var(--control-warning);

    &.is-fill {
      --el-button-bg-color: var(--control-warning);
      --el-button-border-color: var(--control-warning);
      --el-button-hover-bg-color: var(--control-warning-hover);
      --el-button-hover-border-color: var(--control-warning-hover);
      --el-button-active-bg-color: var(--control-warning-hover);
      --el-button-active-border-color: var(--control-warning-hover);
      --el-button-disabled-bg-color: var(--el-color-warning-light-7);
      --el-button-disabled-border-color: var(--el-color-warning-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 危险按钮样式
  &.el-button--danger {
    --control-text: var(--control-danger);
    --el-button-hover-link-text-color: var(--control-danger-hover);
    --el-button-active-color: var(--control-danger-hover);
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--control-danger);
    --el-button-hover-bg-color: var(--control-danger);
    --el-button-hover-border-color: var(--control-danger);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--control-danger-hover);
    --el-button-active-border-color: var(--control-danger-hover);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-danger-light-7);
    --el-button-disabled-text-color: var(--el-color-danger-light-7);
    --el-button-text-color: var(--control-danger);

    &.is-fill {
      --el-button-bg-color: var(--control-danger);
      --el-button-border-color: var(--control-danger);
      --el-button-hover-bg-color: var(--control-danger-hover);
      --el-button-hover-border-color: var(--control-danger-hover);
      --el-button-active-bg-color: var(--control-danger-hover);
      --el-button-active-border-color: var(--control-danger-hover);
      --el-button-disabled-bg-color: var(--el-color-danger-light-7);
      --el-button-disabled-border-color: var(--el-color-danger-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  // 信息按钮样式
  &.el-button--info {
    --control-text: var(--control-info);
    --el-button-hover-link-text-color: var(--control-info-hover);
    --el-button-active-color: var(--control-info-hover);
    --el-button-bg-color: var(--el-fill-color-blank);
    --el-button-border-color: var(--control-info);
    --el-button-hover-bg-color: var(--control-info);
    --el-button-hover-border-color: var(--control-info);
    --el-button-hover-text-color: var(--el-fill-color-blank);
    --el-button-active-bg-color: var(--control-info-hover);
    --el-button-active-border-color: var(--control-info-hover);
    --el-button-disabled-bg-color: var(--el-fill-color-blank);
    --el-button-disabled-border-color: var(--el-color-info-light-7);
    --el-button-disabled-text-color: var(--el-color-info-light-7);
    --el-button-text-color: var(--control-info);

    &.is-fill {
      --el-button-bg-color: var(--control-info);
      --el-button-border-color: var(--control-info);
      --el-button-hover-bg-color: var(--control-info-hover);
      --el-button-hover-border-color: var(--control-info-hover);
      --el-button-active-bg-color: var(--control-info-hover);
      --el-button-active-border-color: var(--control-info-hover);
      --el-button-disabled-bg-color: var(--el-color-info-light-7);
      --el-button-disabled-border-color: var(--el-color-info-light-7);
      --el-button-text-color: var(--el-fill-color-blank);
      --el-button-hover-text-color: var(--el-fill-color-blank);
    }
  }

  &.is-text:not(.is-disabled),
  &.is-link:not(.is-disabled) {
    --el-button-text-color: var(--control-text, var(--el-text-color-regular));
  }

  &.is-text:not(.is-disabled):hover {
    color: var(--control-text, var(--el-text-color-regular));
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
