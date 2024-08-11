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
        <td v-if="!index">
          {{ formatDate(transaction.date) }}
        </td>
        <td v-else>
          {{ '' }}
        </td>

        <td>{{ transaction.accId }}</td>

        <td v-if="transaction.isDebit">{{ transaction.amount / -100 }}</td>
        <td v-else>{{ '' }}</td>
        <td v-if="transaction.isDebit">{{ '' }}</td>
        <td v-else>{{ transaction.amount / -100 }}</td>
      </tr>
    </tbody>
  </table>
</template>
