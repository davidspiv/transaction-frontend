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
  <section>
    <h3>Create an Entry</h3>

    <EntryCard :selectedReceipt="selectedReceipt"></EntryCard>
  </section>
  <section>
    <h3>Select a receipt to process</h3>
    <span>Total: {{ total }}</span>
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Memo</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
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
          <td colspan="5">No receipts imported</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  margin-bottom: 2rem;
}

th:nth-child(3),
th:nth-child(1) {
  width: 12%;
}
</style>
