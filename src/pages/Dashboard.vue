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
      :freezeTime="freezeTime"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TableCard from "@/components/billiard/TableCard.vue";
import TableDetailModal from "@/components/billiard/TableDetailModal.vue";
import { getActiveTables } from "@/services/table.service";

const tables = ref([]);
const selectedTable = ref(null);
const showModal = ref(false);
const freezeTime = ref(null);

onMounted(async () => {
  tables.value = await getActiveTables();
});

function openDetail(table) {
  selectedTable.value = table;
  freezeTime.value = new Date(); // 🔥 freeze tại thời điểm click
  showModal.value = true;
}
</script>

<style scoped>
.dashboard {
  padding: 12px;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>
