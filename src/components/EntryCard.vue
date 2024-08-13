<script setup lang="ts">
import { isHidden } from '@/composables/state';
import { formatDate } from '@/composables/utils';
import { computed } from 'vue';
import type { Receipt, Entry } from '@/models/types';

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

const hideTray = () => {
  isHidden.value = false;
};
</script>

<template>
  <section :class="{ 'hidden-tray': isHidden }">
    <span class="flex-container">
      <h3>Create an Entry</h3>
      <span class="control-container">
        <label for="time-range">Type: </label>
        <select name="time-range" id="time-range">
          <option disabled value="">Please select one</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="year-to-date">Year To Date</option>
          <option value="all">All</option>
        </select>
      </span>
      <span class="control-container">
        <button @click="resetHandler">Reset</button>
        <button @click="hideTray">Hide</button>
      </span>
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
          <td v-if="!index" :rowspan="entry.transactions.length" id="cell-date">
            {{ formatDate(transaction.date) }}
          </td>

          <td class="cell-particular">
            <select
              v-model="transaction.accId"
              :id="transaction.id.concat('-select-el')"
            >
              <option value="1100">Cash</option>
              <option value="5101">Expenses</option>
              <option value="3">Month</option>
              <option value="4">Year</option>
              <option value="5">Year To Date</option>
              <option value="6">All</option>
            </select>
          </td>

          <template v-if="transaction.isDebit">
            <td>
              <input
                type="text"
                :id="transaction.id.concat('-input-debit-el')"
                v-model="transaction.amount"
              />
            </td>
            <td>
              <input
                type="text"
                :id="transaction.id.concat('-input-credit-el')"
              />
            </td>
          </template>

          <template v-else>
            <td>
              <input
                type="text"
                :id="transaction.id.concat('-input-debit-el')"
              />
            </td>
            <td>
              <input
                type="text"
                :id="transaction.id.concat('-input-credit-el')"
                v-model="transaction.amount"
              />
            </td>
          </template>
        </tr>
        <tr>
          <td colspan="4" id="cell-add-row">
            <button>Add line item</button>
          </td>
        </tr>
      </tbody>
    </table>
    <span class="flex-container reverse">
      <button @click="submitHandler">Submit</button>
      <span v-if="props.selectedReceipt">
        <input type="checkbox" checked="true" id="check-identical-submit" />
        <label for="check-identical-submit"
          >Apply to all unprocessed receipts with identical memo:
          {{ truncate(50, props.selectedReceipt?.memo) }}
        </label>
      </span>
    </span>
  </section>
</template>

<style scoped>
section {
  position: fixed;
  left: 1rem;
  right: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #202538;
  border-top: 1px solid #6b89d6;
  border-right: 1px solid #6b89d6;
  border-left: 1px solid #6b89d6;
  transition-property: bottom;
  transition-duration: 100ms;
}

.hidden-tray {
  bottom: -40vh;
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
  gap: 1rem;
  align-items: center;
}

.reverse {
  flex-direction: row-reverse;
}

th:nth-child(1),
th:nth-child(3),
th:nth-child(4) {
  width: 12%;
}

.cell-particular {
  text-align: left;
}

input[type='text'] {
  width: 5rem;
}

#check-identical-submit {
  margin-right: 0.5rem;
}

#cell-date {
  align-content: baseline;
}

#cell-add-row {
  padding: 1rem;
}
</style>
