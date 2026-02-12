<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="close-btn" @click="$emit('close')">
        ✕
      </button>
      <h2>{{ table.table_name }}</h2>

      <!-- ========== CHƯA ACTIVE ========== -->
      <template v-if="!table.is_active">
        <div class="info-box">
          💰 Giá giờ chơi:
          <strong>{{ table.price_per_hour.toLocaleString() }}đ / h</strong>
        </div>

        <input
          v-model="playerName"
          class="input"
          placeholder="Nhập tên người chơi"
        />

        <button class="action-btn" @click="startTable">
          ▶️ Bắt đầu
        </button>
      </template>

      <!-- ========== ACTIVE ========== -->
      <template v-else>
        <p class="player">👤 {{ table.player_name }}</p>

        <div class="info-box">
          🕒 Bắt đầu:
          <strong>{{ formattedStartTime }}</strong>
        </div>

        <p class="time">
          ⏱ {{ formattedDuration }}
        </p>

        <div class="info-box">
          💰 Tiền bàn:
          <strong>{{ tableMoney.toLocaleString() }}đ</strong>
        </div>

        <!-- ========= FOODS ========= -->
        <h3>🍔 Đồ ăn</h3>

        <div
          v-for="f in table.foods"
          :key="f.id"
          class="item-row"
        >
          <span>{{ f.name }}</span>
          <span class="price">{{ f.price.toLocaleString() }}đ</span>

          <div class="qty">
            <button @click="changeFood(f, f.quantity - 1)">−</button>
            <span>{{ f.quantity }}</span>
            <button @click="changeFood(f, f.quantity + 1)">+</button>
          </div>
        </div>

        <div class="add-row">
          <select v-model="newFood">
            <option disabled value="">+ Thêm đồ ăn</option>
            <option v-for="f in foods" :key="f.id" :value="f.id">
              {{ f.name }}
            </option>
          </select>
          <button @click="addFood">Thêm</button>
        </div>

        <!-- ========= CUES ========= -->
        <h3>🎱 Gậy</h3>

        <div
          v-for="c in table.cues"
          :key="c.id"
          class="item-row"
        >
          <span>{{ c.name }}</span>
          <span class="price">{{ c.price.toLocaleString() }}đ</span>

          <div class="qty">
            <button @click="changeCue(c, c.quantity - 1)">−</button>
            <span>{{ c.quantity }}</span>
            <button @click="changeCue(c, c.quantity + 1)">+</button>
          </div>
        </div>

        <div class="add-row">
          <select v-model="newCue">
            <option disabled value="">+ Thêm gậy</option>
            <option v-for="c in cues" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
          <button @click="addCue">Thêm</button>
        </div>

        <hr />

        <h2 class="total">
          Tổng tiền 💵: {{ totalMoney.toLocaleString() }}đ
        </h2>

        <button class="action-btn danger" @click="checkout">
          💳 Tính tiền
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  checkoutTable,
  startTableApi,
  getFoods,
  getCues,
  updateFood,
  updateCue
} from '@/services/table.service'

const props = defineProps({ table: Object })

const playerName = ref('')
const freezeTime = ref(new Date())

const foods = ref([])
const cues = ref([])
const newFood = ref('')
const newCue = ref('')

onMounted(async () => {
  foods.value = await getFoods()
  cues.value = await getCues()
})

/* ===== UPDATE FOOD / CUE (KHÔNG RELOAD) ===== */
async function changeFood(f, qty) {
  await updateFood(props.table.table_id, f.id, qty)
  if (qty <= 0) {
    props.table.foods = props.table.foods.filter(x => x.id !== f.id)
  } else {
    f.quantity = qty
  }
}

async function addFood() {
  const foodId = newFood.value
  if (!foodId) return

  const existed = props.table.foods.find(f => f.id === foodId)

  if (existed) {
    const newQty = existed.quantity + 1
    await updateFood(props.table.table_id, foodId, newQty)
    existed.quantity = newQty
  } else {
    await updateFood(props.table.table_id, foodId, 1)
    const f = foods.value.find(x => x.id === foodId)
    props.table.foods.push({ ...f, quantity: 1 })
  }

  newFood.value = ''
}


async function changeCue(c, qty) {
  await updateCue(props.table.table_id, c.id, qty)
  if (qty <= 0) {
    props.table.cues = props.table.cues.filter(x => x.id !== c.id)
  } else {
    c.quantity = qty
  }
}

async function addCue() {
  const cueId = newCue.value
  if (!cueId) return

  const existed = props.table.cues.find(c => c.id === cueId)

  if (existed) {
    const newQty = existed.quantity + 1
    await updateCue(props.table.table_id, cueId, newQty)
    existed.quantity = newQty
  } else {
    await updateCue(props.table.table_id, cueId, 1)
    const c = cues.value.find(x => x.id === cueId)
    props.table.cues.push({ ...c, quantity: 1 })
  }

  newCue.value = ''
}


/* ===== TIME & MONEY ===== */
function pad(n) {
  return String(n).padStart(2, '0')
}

const formattedStartTime = computed(() => {
  const d = new Date(props.table.start_time)
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}
          ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})

const durationSeconds = computed(() =>
  Math.floor((freezeTime.value - new Date(props.table.start_time)) / 1000)
)

const formattedDuration = computed(() => {
  const s = durationSeconds.value
  return `${pad(s/3600|0)}:${pad((s%3600)/60|0)}:${pad(s%60)}`
})

const tableMoney = computed(() =>
  Math.floor(
    (durationSeconds.value / 3600) * props.table.price_per_hour
  )
)

const totalMoney = computed(() => {
  const tablePrice = Number(props.table.price_per_hour) || 0

  const foodMoney = props.table.foods.reduce(
    (s, f) => s + Number(f.price) * Number(f.quantity || 0),
    0
  )

  const cueMoney = props.table.cues.reduce(
    (s, c) => s + Number(c.price) * Number(c.quantity || 0),
    0
  )

  return Math.floor(
    (durationSeconds.value / 3600) * tablePrice +
    foodMoney +
    cueMoney
  )
})

/* ===== ACTION ===== */
async function startTable() {
  await startTableApi(props.table.table_id, { player_name: playerName.value })
  location.reload()
}

async function checkout() {
  const d = freezeTime.value
  const endTime =
    `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}
     ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

  const res = await checkoutTable(props.table.table_id, endTime)
  alert(`✅ Tính tiền thành công!\nTổng tiền: ${res.total_amount.toLocaleString()}đ`)
  location.reload()
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.modal {
  background: white;
  width: 92%;
  max-width: 420px;
  border-radius: 16px;
  padding: 20px;
  color: #111827;
}

.info-box {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.player {
  font-weight: 600;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  padding: 8px 10px;
  border-radius: 10px;
  margin-bottom: 6px;
}

.price {
  color: #64748b;
}

.qty {
  display: flex;
  gap: 6px;
  align-items: center;
}

.qty button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.add-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.add-row select,
.input {
  width: 100%;            /* ✅ QUAN TRỌNG */
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
  font-size: 15px;
  box-sizing: border-box; /* ✅ tránh bị lệch */
}

.add-row button {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
}

.action-btn {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #2563eb;
  color: white;
  font-size: 16px;
}

.action-btn.danger {
  background: #dc2626;
}

.total {
  text-align: right;
  margin-top: 8px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;

  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: #dc2626; /* đỏ */
  color: white;
  font-size: 20px;
  font-weight: bold;

  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #b91c1c;
}
</style>
