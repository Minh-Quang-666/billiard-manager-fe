<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2>{{ table.table_name }}</h2>

      <p v-if="table.is_active">👤 {{ table.player_name }}</p>

      <p v-if="table.is_active">
        ⏱ Thời gian chơi:
        <strong>{{ formattedTime }}</strong>
      </p>

      <!-- ✅ THÊM: thời gian bắt đầu + giá -->
      <div class="info-box" v-if="table.is_active">
        <p>🕒 Bắt đầu: {{ formatDateTime(table.start_time) }}</p>
        <p>💰 Giá bàn: {{ table.price_per_hour.toLocaleString() }}đ / giờ</p>
      </div>

      <hr />

      <!-- 🍔 ĐỒ ĂN -->
      <h3>🍔 Đồ ăn</h3>
      <p v-if="!table.foods.length">Không có</p>
      <ul>
        <li v-for="f in table.foods" :key="f.id">
          {{ f.name }} x {{ f.quantity }} –
          {{ (f.price * f.quantity).toLocaleString() }}đ
        </li>
      </ul>

      <!-- 🎱 GẬY -->
      <h3>🎱 Gậy</h3>
      <p v-if="!table.cues.length">Không có</p>
      <ul>
        <li v-for="c in table.cues" :key="c.id">
          {{ c.name }} –
          {{ c.price.toLocaleString() }}đ / h
        </li>
      </ul>

      <hr />

      <!-- 💵 TỔNG TIỀN (FREEZE) -->
      <h2>
        💵 Tổng tiền:
        {{ totalMoney.toLocaleString() }}đ
      </h2>

      <button class="action-btn">
        {{ table.is_active ? "Tính tiền" : "Bắt đầu" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  table: Object,
  freezeTime: Date, // 🔥 thời điểm freeze
});

/* ===== TIME ===== */
const playSeconds = computed(() => {
  if (!props.table.start_time) return 0;
  return Math.floor(
    (props.freezeTime - new Date(props.table.start_time)) / 1000
  );
});

const formattedTime = computed(() => {
  const s = playSeconds.value;
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
});

function formatDateTime(time) {
  const d = new Date(time)

  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}

/* ===== MONEY ===== */
const tableMoney = computed(() =>
  (playSeconds.value / 3600) * props.table.price_per_hour
);

const foodMoney = computed(() =>
  props.table.foods.reduce(
    (sum, f) => sum + f.price * f.quantity,
    0
  )
);

const cueMoney = computed(() =>
  props.table.cues.reduce((sum, c) => {
    const hours =
      (props.freezeTime - new Date(c.rent_start_time)) / 3600000;
    return sum + hours * c.price;
  }, 0)
);

const totalMoney = computed(() =>
  Math.floor(tableMoney.value + foodMoney.value + cueMoney.value)
);
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal {
  background: white;
  color: #0f172a;
  padding: 20px;
  width: 90%;
  max-width: 420px;
  border-radius: 16px;
}

.info-box {
  background: #f1f5f9;
  padding: 10px 12px;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 14px;
}

.action-btn {
  margin-top: 16px;
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
}
</style>
