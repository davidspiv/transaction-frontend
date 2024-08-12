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
  const amount = props.selectedReceipt
    ? props.selectedReceipt.amount / -100
    : 0;

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
    rcptId: 'rctId',
  };
});

const truncate = (desiredLength: number, input?: string) => {
  if (!input) return '';
  return input.length < desiredLength
    ? `"${input}"`
    : `"${input.slice(0, desiredLength)}...`;
};

const submitHandler = () => {
  console.log(entry.value);
};

const resetHandler = () => {
  console.log('reset');
};
</script>

<template>
  <span class="flex-container">
    <h3>Create an Entry</h3>
    <span>Type: Compound</span>
  </span>

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
        <td
          v-if="!index"
          id="cell-date"
          :rowspan="entry.transactions.length + 1"
        >
          {{ formatDate(transaction.date) }}
        </td>

        <td>
          <select v-model="transaction.accId" :id="transaction.id">
            <option value="1100">Cash</option>
            <option value="5101">Expenses</option>
            <option value="3">Month</option>
            <option value="4">Year</option>
            <option value="5">Year To Date</option>
            <option value="6">All</option>
          </select>
        </td>

        <template v-if="transaction.isDebit">
          <td><input type="text" v-model="transaction.amount" /></td>
          <td><input type="text" /></td>
        </template>

        <template v-else>
          <td><input type="text" /></td>
          <td><input type="text" v-model="transaction.amount" /></td>
        </template>
      </tr>
      <tr>
        <td colspan="3" id="cell-add-row">
          <span class="control-container">
            <button @click="resetHandler">Reset</button>
            <button>+</button>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <span class="flex-container">
    <span>
      <input type="checkbox" checked="true" id="identical-submit" />
      <label for="identical-submit"
        >Apply to all unprocessed Receipts with identical memo:
        {{ truncate(50, props.selectedReceipt?.memo) }}
      </label>
    </span>

    <button @click="submitHandler">Submit</button>
  </span>
</template>

<style scoped>
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

th:nth-child(1),
th:nth-child(3),
th:nth-child(4) {
  width: 12%;
}

td {
  text-align: left;
}

input[type='text'] {
  width: 5rem;
}

#cell-date {
  padding: 0rem 0.8rem;
  align-content: baseline;
}

#cell-add-row {
  padding: 1rem;
}
</style>
