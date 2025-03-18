<script setup lang="ts">
import {ref} from 'vue';

import type {Language} from 'element-plus/es/locale';

const elLocale = ref<Language>();

</script>

<template>
  <div class="app__container bg-primary-20">
    <el-config-provider :locale="elLocale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<style scoped lang="scss">
.app__container {
  min-height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
