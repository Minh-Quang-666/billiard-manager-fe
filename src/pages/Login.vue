<template>
  <div class="login">
    <h2>🎱 Billiard Manager</h2>

    <input v-model="username" placeholder="Username" />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />

    <button @click="login">Đăng nhập</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginApi, setToken } from '@/services/auth.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

async function login() {
  try {
    const res = await loginApi(username.value, password.value)
    setToken(res.access_token)
    router.push('/')
  } catch {
    alert('Sai tài khoản hoặc mật khẩu')
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  background: linear-gradient(180deg,#020617,#020617);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
}

h2 {
  color: white;
  text-align: center;
  margin-bottom: 24px;
}

input {
  padding: 14px;
  border-radius: 14px;
  border: none;
  margin-bottom: 12px;
  font-size: 16px;
}

button {
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #22c55e;
  color: white;
  font-size: 16px;
  font-weight: 600;
}
</style>
