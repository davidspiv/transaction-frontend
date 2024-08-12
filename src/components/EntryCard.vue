<script setup lang="ts">
import { formatDate } from '@/composables/utils';
import type { Receipt, Entry } from '@/models/types';
import { computed } from 'vue';

const props = defineProps<{
  selectedReceipt: Receipt | null;
}>();

const entry = computed<Entry>(() => {
  const date = props.selectedReceipt
    ? props.selectedReceipt.date
    : new Date().toDateString();
  const amount = props.selectedReceipt ? props.selectedReceipt.amount : 0;
  const memo = props.selectedReceipt ? props.selectedReceipt.memo : '';

  return {
    id: 'entryId',
    transactions: [
      {
        id: 'transactionId1',
        date,
        amount,
        isDebit: 1,
        accId: 5101,
      },
      {
        id: 'transactionId2',
        date,
        amount,
        isDebit: 0,
        accId: 1100,
      },
    ],
    description: memo,
    rcptId: 'rctId',
  };
});

const submitHandler = () => {
  console.log(entry.value);
};

</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Particulars</th>
        <th scope="col">Debit</th>
        <th scope="col">Credit</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(transaction, index) in entry.transactions"
        :key="transaction.id"
      >
        <td v-if="!index" id="date-cell">
          {{ formatDate(transaction.date) }}
        </td>
        <td v-else>
          {{ '' }}
        </td>

        <td>
          <select v-model="transaction.accId">
            <option value="1100">Cash</option>
            <option value="5101">Expenses</option>
            <option value="3">Month</option>
            <option value="4">Year</option>
            <option value="5">Year To Date</option>
            <option value="6">All</option>
          </select>
        </td>

        <template v-if="transaction.isDebit">
          <td>{{ transaction.amount / -100 }}</td>
          <td>{{ '' }}</td>
        </template>

        <template v-else>
          <td>{{ '' }}</td>
          <td>{{ transaction.amount / -100 }}</td>
        </template>
      </tr>
    </tbody>
  </table>
  <button @click="submitHandler">Submit</button>
</template>

<style scoped>
th:nth-child(1),
th:nth-child(3),
th:nth-child(4) {
  width: 12%;
}

td:nth-child(2) {
  text-align: left;
}

td {
  border-bottom: 0;
  border-top: 0;
}

#date-cell {
  padding: 0rem 0.8rem;
}
</style>
