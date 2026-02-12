<template>
  <header class="header">
    <button class="menu-btn" @click="$emit('toggle')">☰</button>
    <span><b>Billiard Manager</b></span>
    <button class="logout-btn" @click="logout">
      🚪 Đăng xuất
    </button>
  </header>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function logout() {
    localStorage.removeItem('token')
    router.push('/login')
  }
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #020617;
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 18px;
}

.menu-btn {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  margin-right: 16px;
}


.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.logout-btn:hover {
  background: #dc2626;
}

@media (min-width: 768px) {
  .menu-btn {
    display: none;
  }
}
</style>
