<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn } from 'rayyy-vue-table-components/components'
const count = ref(0)
</script>

<template>
  <BaseBtn text="增加" type="primary" is-fill @click="count++" />
  <BaseBtn type="success" plain>Slot 文字</BaseBtn>
  <BaseBtn text="不可操作" disabled />
  <output aria-live="polite">{{ count }}</output>
</template>
