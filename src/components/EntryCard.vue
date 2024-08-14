<script setup lang="ts">
import { getEntryTrayState } from '@/composables/globalState';
import { formatDate } from '@/composables/utils';
import type { Receipt } from '@/models/types';

const entryTrayState = getEntryTrayState();

const props = defineProps<{
  selectedReceipt: Receipt | null;
}>();

const truncate = (desiredLength: number, input?: string) => {
  if (!input) return '';
  return input.length < desiredLength
    ? `"${input}"`
    : `"${input.slice(0, desiredLength)}...`;
};

const submitHandler = () => {
  console.log(entryTrayState.entry.value);
};

const resetHandler = () => {
  console.log('reset');
};

const hideTray = () => {
  entryTrayState.tray.isHidden.value = true;
};
</script>

<template>
  <section :class="{ 'hidden-tray': entryTrayState.tray.isHidden.value }">
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
        const
          v-for="(lineItem, index) in entryTrayState.entry.value.lineItems"
          :key="lineItem.id"
        >
          <td
            v-if="!index"
            :rowspan="entryTrayState.entry.value.lineItems.length"
            id="cell-date"
          >
            {{ formatDate(lineItem.date) }}
          </td>

          <td class="cell-particular">
            <select
              v-model="lineItem.accId"
              :id="lineItem.id.concat('-select-el')"
            >
              <option value="1100">Cash</option>
              <option value="5101">Expenses</option>
              <option value="3">Month</option>
              <option value="4">Year</option>
              <option value="5">Year To Date</option>
              <option value="6">All</option>
            </select>
          </td>

          <template v-if="Number(lineItem) < 0">
            <td>
              <input
                type="text"
                :id="lineItem.id.concat('-input-debit-el')"
                v-model="lineItem.amount"
              />
            </td>
            <td>
              <input type="text" :id="lineItem.id.concat('-input-credit-el')" />
            </td>
          </template>

          <template v-else>
            <td>
              <input type="text" :id="lineItem.id.concat('-input-debit-el')" />
            </td>
            <td>
              <input
                type="text"
                :id="lineItem.id.concat('-input-credit-el')"
                v-model="lineItem.amount"
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
