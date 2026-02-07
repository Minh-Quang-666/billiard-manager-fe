<template>
  <header class="header">
    <button class="menu-btn" @click="$emit('toggle')">☰</button>
    <span>Billiard Manager</span>
  </header>
</template>

<style scoped>
.header {
  height: 56px;
  background: #020617;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 20px;
  font-weight: 700;
}

.menu-btn {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  margin-right: 16px;
}

@media (min-width: 768px) {
  .menu-btn {
    display: none;
  }
}
</style>
