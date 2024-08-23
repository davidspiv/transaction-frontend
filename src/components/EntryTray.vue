<script setup lang="ts">
import { formatDate, truncate } from '@/composables/utils';
import { entryTrayState } from '@/composables/state';
import { computed } from 'vue';
import type { Entry_Input } from '@/models/types';

const entry = computed<Entry_Input>(() => {
  const selectedReference = entryTrayState.value.selected;

  let date, amount, description, refId;

  if (selectedReference) {
    date = selectedReference.date;
    amount = selectedReference.amount / 100;
    description = selectedReference.memo;
    refId = selectedReference.id;
  } else {
    date = new Date().toISOString();
    amount = 0;
    description = '';
    refId = null;
  }

  return {
    date,
    lineItems: [
      {
        amount: amount * -1,
        accCode: 5001,
      },
      {
        amount: amount,
        accCode: 1001,
      },
    ],
    type: 'transfer',
    description,
    refId,
  };
});

const postEntry = async () => {
  const request = new Request('http://localhost:5000/api/journal/', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ entries: [entry.value] }),
  });

  try {
    const response = await fetch(request);
    console.log(await response.json());
  } catch (error) {
    console.log('Error fetching data', error);
  }
};

const submitHandler = async () => {
  await postEntry();
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
          :key="lineItem.accCode"
        >
          <td v-if="!index" :rowspan="entry.lineItems.length" id="cell-date">
            {{ formatDate(entry.date) }}
          </td>

          <td class="cell-particular">
            <select v-model="lineItem.accCode">
              <option disabled value="">Select one</option>
              <option value="1001">Cash</option>
              <option value="5001">Expenses</option>
            </select>
          </td>

          <template v-if="lineItem.amount < 0">
            <td>
              <input type="text" v-model="lineItem.amount" />
            </td>
            <td>
              <button>switch</button>
            </td>
          </template>

          <template v-else>
            <td>
              <button>switch</button>
            </td>
            <td>
              <input type="text" v-model="lineItem.amount" />
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
  background-color: var(--c-base-accent);
  border-top: 1px solid var(--c-border);
  border-right: 1px solid var(--c-border);
  border-left: 1px solid var(--c-border);
  opacity: 100;
  transition-property: bottom, opacity;
  transition-duration: 100ms;
}

.hidden-tray {
  bottom: -40vh;
  opacity: 0;
}

button {
  background-color: var(--c-button-background);
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
