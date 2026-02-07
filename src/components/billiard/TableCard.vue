<template>
  <div
    class="table-card"
    :class="table.is_active ? 'active' : 'inactive'"
    @click="$emit('click')"
  >
    <h3>{{ table.table_name }}</h3>

    <p v-if="table.is_active">
      👤 {{ table.player_name }}
    </p>

    <p>
      💰 Giá giờ chơi:
      <strong>{{ table.price_per_hour.toLocaleString() }}đ / h</strong>
    </p>

    <p v-if="table.is_active">
      ⏱ Bắt đầu: {{ formatTime(table.start_time) }}
    </p>

    <!-- ⏱ ĐẾM GIỜ REALTIME (CHỈ KHI ACTIVE) -->
    <p v-if="table.is_active">
      ⌛ Đã chơi: <strong>{{ formattedPlayTime }}</strong>
    </p>

    <button
      v-if="!table.is_active"
      class="btn start"
    >
      Bắt đầu
    </button>

    <button
      v-else
      class="btn pay"
    >
      Tính tiền
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  table: Object
})

const now = ref(Date.now())
let timer = null

onMounted(() => {
  if (props.table.is_active) {
    timer = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function formatTime(time) {
  if (!time) return '--:--'
  return new Date(time).toLocaleTimeString()
}

const playSeconds = computed(() => {
  if (!props.table.start_time) return 0
  return Math.floor(
    (now.value - new Date(props.table.start_time)) / 1000
  )
})

const formattedPlayTime = computed(() => {
  const s = playSeconds.value
  const h = String(Math.floor(s / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  return `${h}:${m}:${sec}`
})
</script>

<style scoped>
.table-card {
  border-radius: 16px;
  padding: 16px;
  color: #0f172a;
  cursor: pointer;
  position: relative;
  transition: 0.2s;
}

.table-card:hover {
  transform: scale(1.03);
}

.active {
  background: #22c55e;
  color: white;
}

.inactive {
  background: #fecaca;
}

.btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  color: white;
  cursor: pointer;
}

.btn.start,
.btn.pay {
  background: #2563eb;
}
</style>
