<template>
  <div class="layout">
    <!-- 👇 thêm @navigate -->
    <Sidebar
      :open="open"
      @navigate="open = false"
    />

    <div class="main">
      <Header @toggle="open = !open" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'

const open = ref(false)
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1;
  background: #0f172a;
  color: white;
}
</style>
