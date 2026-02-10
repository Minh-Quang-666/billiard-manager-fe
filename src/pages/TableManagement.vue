<template>
  <div class="page">
    <h2 class="title">🧱 Quản lý bàn</h2>

    <!-- ADD -->
    <button class="btn-add" @click="openAdd">
      ➕ Thêm bàn
    </button>

    <!-- LIST -->
    <div
      v-for="t in tables"
      :key="t.id"
      class="card"
    >
      <div class="info">
        <strong>{{ t.name }}</strong>
        <p>ID: {{ t.id }}</p>
        <p>💰 {{ t.price_per_hour.toLocaleString() }}đ / h</p>
      </div>

      <div class="actions">
        <button class="edit" @click="openEdit(t)">Sửa</button>
        <button class="delete" @click="remove(t.id)">Xóa</button>
      </div>
    </div>

    <!-- ===== MODAL ===== -->
    <div v-if="showModal" class="overlay" @click.self="close">
      <div class="modal">
        <h3>{{ isEdit ? '✏️ Sửa bàn' : '➕ Thêm bàn' }}</h3>

        <input
          v-if="!isEdit"
          v-model="form.id"
          placeholder="Table ID"
        />

        <input
          v-model="form.name"
          placeholder="Tên bàn"
        />

        <input
          v-model.number="form.price_per_hour"
          type="number"
          placeholder="Giá / giờ"
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
  getTables,
  addTable,
  updateTable,
  deleteTable
} from '@/services/tableManage.service'

const tables = ref([])
const showModal = ref(false)
const isEdit = ref(false)

const form = ref({
  id: '',
  name: '',
  price_per_hour: 0
})

onMounted(load)

async function load() {
  tables.value = await getTables()
}

function openAdd() {
  isEdit.value = false
  form.value = { id:'', name:'', price_per_hour:0 }
  showModal.value = true
}

function openEdit(t) {
  isEdit.value = true
  form.value = { ...t }
  showModal.value = true
}

async function save() {
  if (!form.value.name || form.value.price_per_hour <= 0) {
    alert('Tên không được để trống và giá > 0')
    return
  }

  if (isEdit.value) {
    await updateTable(form.value.id, form.value)
  } else {
    if (!form.value.id) {
      alert('Table ID không được trống')
      return
    }
    await addTable(form.value)
  }

  close()
  load()
}

async function remove(id) {
  if (!confirm('Xóa bàn này?')) return

  try {
    await deleteTable(id)
    load()
  } catch (e) {
    alert(
      e.response?.data?.detail ||
      '❌ Không thể xóa bàn'
    )
  }
}

function close() {
  showModal.value = false
}
</script>

<style scoped>
.page {
  padding: 16px;
  color: #0f172a;
}

.title {
  margin-bottom: 12px;
}

/* ADD BUTTON */
.btn-add {
  width: 100%;
  background: #22c55e;
  color: white;
  padding: 14px;
  border-radius: 14px;
  border: none;
  margin-bottom: 16px;
  font-size: 16px;
}

/* CARD */
.card {
  background: #f8fafc;
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* MODAL */
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
  width: 90%;
  max-width: 380px;
  padding: 20px;
  border-radius: 16px;
}

.modal input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.save {
  flex: 1;
  background: #22c55e;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
}

.cancel {
  flex: 1;
  background: #e5e7eb;
  border: none;
  padding: 10px;
  border-radius: 10px;
}
</style>
