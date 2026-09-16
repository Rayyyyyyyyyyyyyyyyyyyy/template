import { defineComponent } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages } from '../../locales'

export const createHostI18n = (locale = 'zh-TW') =>
  createI18n({ legacy: false, locale, fallbackLocale: 'zh-TW', messages })

export const commonStubs = {
  ElDivider: true,
  ElIcon: true,
  ElTable: true,
  ElTableColumn: true,
  ElButton: defineComponent({
    name: 'ElButton',
    emits: ['click'],
    template: '<button @click="$emit(\'click\', $event)"><slot /></button>',
  }),
  ElDialog: defineComponent({
    name: 'ElDialog',
    props: ['modelValue', 'width', 'title'],
    emits: ['update:modelValue'],
    template:
      '<section class="el-dialog-stub"><slot name="header" title-id="title" title-class="title" /><slot /><slot name="footer" /></section>',
  }),
  ElEmpty: defineComponent({
    name: 'ElEmpty',
    props: ['description'],
    template: '<div class="el-empty-stub">{{ description }}</div>',
  }),
  ElInput: defineComponent({
    name: 'ElInput',
    props: ['modelValue', 'placeholder'],
    emits: ['update:modelValue', 'clear'],
    template: '<input :value="modelValue" :placeholder="placeholder" />',
  }),
}
