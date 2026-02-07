<template>
  <aside :class="['sidebar', { open }]">
    <h2>🎱 Bi-a</h2>

    <router-link to="/" @click="emit('navigate')">Dashboard</router-link>
    <router-link to="/tables" @click="emit('navigate')">Quản lý bàn</router-link>
    <router-link to="/foods" @click="emit('navigate')">Đồ ăn</router-link>
    <router-link to="/revenue" @click="emit('navigate')">Doanh thu</router-link>
  </aside>
</template>

<script setup>
const emit = defineEmits(['navigate'])
defineProps({
  open: Boolean
})
</script>

<style scoped>
.menu-item {
  font-size: 18px;
  font-weight: 600;
}

.sidebar {
  width: 220px;
  background: #020617;
  padding: 20px;
  transform: translateX(-100%);
  transition: 0.3s;
  position: fixed;
  height: 100vh;
  z-index: 1000;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar a {
  display: block;
  margin: 12px 0;
  color: #cbd5f5;
  text-decoration: none;
}

@media (min-width: 768px) {
  .sidebar {
    position: relative;
    transform: translateX(0);
  }
}
</style>
