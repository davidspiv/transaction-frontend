<script setup lang="ts">
import ReceiptCard from '@/components/ReceiptCard.vue';
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { Receipt } from '@/models/types';
import { formatAmount } from '@/composables/utils';

const receipts: Ref<Receipt[]> = ref([]);

const selectedReceipt: Ref<Receipt | null> = ref(null);

const total = computed(() => {
  const amountData = receipts.value.reduce(
    (sum: number, item: Receipt) => sum + (item.amount || 0),
    0,
  );
  return formatAmount(amountData);
});

const fetchReceipts = async (source?: string) => {
  try {
    const apiUrl =
      source || 'http://localhost:5000/api/receipts/?_time=month_acc=all';
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

const newHandler = () => {
  console.log('new');
};

const sizeHandler = () => {
  console.log('size');
};

onMounted(() => {
  if (!receipts.value.length) {
    fetchReceipts();
  }
});
</script>

<template>
  <section>
    <span class="flex-container reverse">
      <span class="control-container">
        <button @click="newHandler">Add receipts</button>
        <button @click="sizeHandler">Minimize</button>
      </span>
    </span>
    <span>{{ receipts.length }} receipts totaling {{ total }}</span>
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
          <td colspan="5">No unprocessed receipts</td>
        </tr>
      </tbody>
    </table>
    <span class="center">
      <button>Show All</button>
    </span>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #1c1f2b;
  border-radius: 1rem;
}

button {
  background-color: #363c55;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-container {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.center {
  text-align: center;
}

.reverse {
  flex-direction: row-reverse;
}

th:nth-child(3),
th:nth-child(1) {
  width: 12%;
}
</style>
