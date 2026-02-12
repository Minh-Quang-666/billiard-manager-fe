<template>
  <div class="dashboard">
    <div class="table-grid">
      <TableCard
        v-for="table in tables"
        :key="table.table_id"
        :table="table"
        @click="openDetail(table)"
      />
    </div>

    <TableDetailModal
      v-if="showModal"
      :table="selectedTable"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TableCard from '@/components/billiard/TableCard.vue'
import TableDetailModal from '@/components/billiard/TableDetailModal.vue'
import { getActiveTables } from '@/services/table.service'
import { handleApiError } from '@/utils/errorHandler'

const tables = ref([])
const selectedTable = ref(null)
const showModal = ref(false)

onMounted(async () => {
  try {
    tables.value = await getActiveTables()
  } catch (e) {
    console.error('API ERROR', e)
    alert(handleApiError(e))
  }
})

function openDetail(table) {
  selectedTable.value = table
  showModal.value = true
}
</script>

<style scoped>
.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>
