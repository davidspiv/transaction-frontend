<script setup lang="ts">
import { formatDate, truncate } from '@/composables/utils';
import { entryTrayState } from '@/composables/state';
import { computed } from 'vue';
import type { Entry } from '@/models/types';

const entry = computed<Entry>(() => {
  if (entryTrayState.value?.selected) {
    return {
      id: 'entryId',
      lineItems: [
        {
          id: 'lineItemId1',
          date: entryTrayState.value?.selected.date,
          amount: entryTrayState.value?.selected.amount / -100,
          isDebit: true,
          accId: '5001',
        },
        {
          id: 'lineItemId2',
          date: entryTrayState.value?.selected.date,
          amount: entryTrayState.value?.selected.amount / -100,
          isDebit: false,
          accId: '1001',
        },
      ],
      type: 'transfer',
      description: entryTrayState.value?.selected.memo || '',
      referenceIds: ['rctId'],
    };
  }
  return {
    id: 'entryId',
    lineItems: [
      {
        id: 'lineItemId1',
        date: new Date().toDateString(),
        amount: 0,
        isDebit: true,
        accId: '',
      },
      {
        id: 'lineItemId2',
        date: new Date().toDateString(),
        amount: 0,
        isDebit: false,
        accId: '',
      },
    ],
    type: '',
    description: '',
    referenceIds: ['rctId'],
  };
});

const submitHandler = () => {
  console.log(entry.value);
  entryTrayState.value.selected = null;
};

const resetHandler = () => {
  entryTrayState.value.selected = null;
};

const hideTray = () => {
  entryTrayState.value.isHidden = true;
};
</script>

<template>
  <section :class="{ 'hidden-tray': entryTrayState.isHidden }">
    <span class="flex-container">
      <h3>Create an Entry</h3>
      <span class="control-container">
        <label for="select-type">Type: </label>
        <select v-model="entry.type" name="select-type" id="select-type">
          <option disabled value="">Select one</option>
          <option value="transfer">Transfer</option>
          <option value="opening">Opening</option>
          <option value="closing">Closing</option>
          <option value="adjusting">Adjusting</option>
          <option value="compound">Compound</option>
          <option value="reversing">Reversing</option>
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
          v-for="(lineItem, index) in entry.lineItems"
          :key="lineItem.id"
        >
          <td v-if="!index" :rowspan="entry.lineItems.length" id="cell-date">
            {{ formatDate(lineItem.date) }}
          </td>

          <td class="cell-particular">
            <select
              v-model="lineItem.accId"
              :id="lineItem.id.concat('-select-account')"
            >
              <option disabled value="">Select one</option>
              <option value="1001">Cash</option>
              <option value="5001">Expenses</option>
            </select>
          </td>

          <template v-if="lineItem.isDebit">
            <td>
              <input type="text" :id="lineItem.id" v-model="lineItem.amount" />
            </td>
            <td>
              <button :id="lineItem.id.concat('-button-switch')">switch</button>
            </td>
          </template>

          <template v-else>
            <td>
              <button :id="lineItem.id.concat('-button-switch')">switch</button>
            </td>
            <td>
              <input
                type="text"
                :id="lineItem.id.concat('-input-amount')"
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
      <span v-if="entryTrayState?.selected">
        <input type="checkbox" checked="true" id="check-identical-submit" />
        <label for="check-identical-submit"
          >Duplicate action for
          {{ truncate(30, entryTrayState?.selected.memo) }}
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
  max-width: calc(1280px - 2rem);
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
  opacity: 100;
  transition-property: bottom, opacity;
  transition-duration: 100ms;
}

.hidden-tray {
  bottom: -40vh;
  opacity: 0;
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
