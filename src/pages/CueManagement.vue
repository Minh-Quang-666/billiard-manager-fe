<template>
  <div class="page">
    <h2>🎱 Quản lý gậy</h2>

    <button class="btn-add" @click="openAdd">
      ➕ Thêm gậy
    </button>

    <div v-for="c in cues" :key="c.id" class="card">
      <div class="info">
        <strong>{{ c.name }}</strong>
        <p>ID: {{ c.id }}</p>
        <p>💰 {{ c.price.toLocaleString() }}đ</p>
      </div>

      <div class="actions">
        <button class="edit" @click="openEdit(c)">Sửa</button>
        <button class="delete" @click="remove(c.id)">Xóa</button>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="overlay" @click.self="close">
      <div class="modal">
        <h3>{{ isEdit ? '✏️ Sửa gậy' : '➕ Thêm gậy' }}</h3>

        <input
          v-if="!isEdit"
          v-model="form.id"
          placeholder="Cue ID"
        />

        <input v-model="form.name" placeholder="Tên gậy" />

        <input
          type="number"
          v-model.number="form.price"
          placeholder="Giá"
        />

        <div class="modal-actions">
          <button class="save" @click="save">Lưu</button>
          <button class="cancel" @click="close">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getCues,
  addCue,
  updateCue,
  deleteCue
} from '@/services/cueManage.service'

const cues = ref([])
const showModal = ref(false)
const isEdit = ref(false)

const form = ref({
  id: '',
  name: '',
  price: 0
})

onMounted(load)

async function load() {
  cues.value = await getCues()
}

function openAdd() {
  isEdit.value = false
  form.value = { id:'', name:'', price:0 }
  showModal.value = true
}

function openEdit(c) {
  isEdit.value = true
  form.value = { ...c }
  showModal.value = true
}

async function save() {
  if (!form.value.name || form.value.price <= 0) {
    alert('Tên & giá phải hợp lệ')
    return
  }

  if (isEdit.value) {
    await updateCue(form.value.id, form.value)
  } else {
    await addCue(form.value)
  }

  close()
  load()
}

async function remove(id) {
  if (confirm('Xóa gậy này?')) {
    await deleteCue(id)
    load()
  }
}

function close() {
  showModal.value = false
}
</script>

<style scoped>
/* 👇 GIỮ Y HỆT FOOD MANAGE */
.page {
  padding: 16px;
  min-height: 100vh;
  background: transparent; /* quan trọng */
  color: #e5e7eb;
}

.btn-add {
  width: 100%;
  background: #22c55e;
  color: white;
  padding: 14px;
  border-radius: 16px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.card {
  background: #f8fafc;
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0f172a;
}

/* ===== MODAL ===== */
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
  width: 92%;
  max-width: 420px;
  padding: 20px;
  border-radius: 20px;
  color: #0f172a;
}

.modal h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a; /* FIX TITLE */
}

.actions {
  display: flex;
  gap: 8px;
}

.edit {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
}

.delete {
  background: #facc15;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
}

.modal input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #cbd5f5;
  margin-bottom: 12px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
}

.save {
  background: #22c55e;
  color: white;
}

.cancel {
  background: #e5e7eb;
}

.info strong {
  font-size: 16px;
  color: #0f172a;
}

.info p {
  color: #475569;
  font-size: 14px;
}

</style>
