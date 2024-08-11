<script setup lang="ts">
import ReceiptCard from '@/components/ReceiptCard.vue';
import EntryCard from '@/components/EntryCard.vue';
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { Receipt } from '@/models/types';

const receipts: Ref<Receipt[]> = ref([]);

const selectedReceipt: Ref<Receipt | null> = ref(null);

const total = computed(() =>
  receipts.value.reduce(
    (sum: number, item: Receipt) => sum + (item.amount || 0) / -100,
    0,
  ),
);

const fetchReceipts = async (source?: string) => {
  try {
    const apiUrl =
      source || 'http://localhost:5000/api/receipts/?_time=week_acc=all';
    const res = await fetch(apiUrl);
    const data = await res.json();

    receipts.value.length = 0;
    receipts.value.push(...((data.receipts as Receipt[]) || []));
    selectedReceipt.value = receipts.value[0];
  } catch (error) {
    console.log('Error fetching data', error);
  }
};

const clickHandler = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const indexData = target.getAttribute('index');

  if (indexData) {
    selectedReceipt.value = receipts.value[Number(indexData)];
  }
};

onMounted(() => {
  if (!receipts.value.length) {
    fetchReceipts();
  }
});
</script>

<template>
  <h2>Journal</h2>
  <span>Total: {{ total }}</span>

  <EntryCard :selectedReceipt="selectedReceipt"></EntryCard>

  <table>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Memo</th>
      <th scope="col">Amount</th>
    </tr>
    <tbody v-if="receipts.length">
      <tr
        @click="clickHandler($event)"
        v-for="(receipt, index) in receipts"
        :key="receipt.id"
        :index="index"
      >
        <ReceiptCard :data="receipt" />
      </tr>
    </tbody>

    <tbody v-else>
      <tr>
        <td colspan="5" id="nothing">No receipts imported</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
  margin: 0 auto;
  border-spacing: 2rem;
  border: 2px solid rgb(140 140 140);
}

th {
  text-align: left;
  border-top: 1px solid rgb(160 160 160);
  border-bottom: 1px solid rgb(160 160 160);
}

tr th:nth-child(3) {
  width: 10%;
}

.center-menu {
  display: flex;
  justify-content: space-between;
  gap: 3.5rem;
  max-width: 20rem;
  margin: 0 auto;
  padding: 2rem 0;
}

.center-menu li {
  display: flex;
  flex-direction: column;
}

ul {
  padding: 0;
}

#nothing {
  text-align: center;
}
</style>
