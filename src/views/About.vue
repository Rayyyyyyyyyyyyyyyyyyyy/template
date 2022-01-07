<template lang="pug">
p {{env}}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
  setup() {
    return {
      env: process.env.NODE_ENV
    };
  }
});
</script>

<style lang="scss" scoped></style>
