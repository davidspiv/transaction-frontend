<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { receiptViewState } from '@/composables/state';
import { receiptsState } from '@/pages/ReceiptsPage.vue';

import type { Receipt } from '@/models/types';

const apiUrlComputed = computed(() => {
  const { status, source, time } = receiptViewState.value.filters;
  return `http://localhost:5000/api/references/?_status=${status}_src=${source}_time=${time}`;
});

const fetchReceipts = async () => {
  let data;
  try {
    const apiUrl = apiUrlComputed.value;
    const res = await fetch(apiUrl);
    data = await res.json();
  } catch (error) {
    console.log('Error fetching data', error);
  }

  receiptsState.value.length = 0; //clear receipts
  receiptsState.value.push(...((data?.references as Receipt[]) || []));
};

const resetFilterHandler = () => {
  receiptViewState.value.filters.status = 'unprocessed';
  receiptViewState.value.filters.source = 'all';
  receiptViewState.value.filters.time = 'week';
};

const resetViewHandler = () => {
  checkedBoxesState.value = ['date', 'memo', 'amount'];
};

watch(apiUrlComputed, fetchReceipts);

onMounted(() => {
  if (!receiptsState.value.length) {
    fetchReceipts();
  }
});
</script>

<script lang="ts">
export const checkedBoxesState = ref(['date', 'memo', 'amount']);
</script>

<template>
  <section id="control-panel" class="fixed-wrapper">
    <div id="control-panel-outline" class="flex-column">
      <span class="control-panel-row">
        <label for="select-status"
          >Status
          <select
            id="select-status"
            name="select-status"
            v-model="receiptViewState.filters.status"
          >
            <option value="unprocessed">Unprocessed</option>
            <option value="all">All</option>
            <option value="processed">Processed</option>
          </select></label
        >

        <label for="select-source"
          >Source
          <select
            id="select-source"
            name="select-source"
            v-model="receiptViewState.filters.source"
          >
            <option value="all">All</option>
          </select></label
        >

        <label for="select-time"
          >Time Range
          <select
            id="select-time"
            name="select-time"
            v-model="receiptViewState.filters.time"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="year-to-date">Year To Date</option>
            <option value="all">All</option>
          </select></label
        >

        <button @click="resetFilterHandler">Reset Filter</button>
      </span>

      <span class="control-panel-row">
        <label for="is-date-checkbox">
          <input
            id="is-date-checkbox"
            name="is-date-checkbox"
            type="checkbox"
            value="date"
            v-model="checkedBoxesState"
          />Date</label
        >

        <label for="is-memo-checkbox">
          <input
            id="is-memo-checkbox"
            name="is-memo-checkbox"
            type="checkbox"
            value="memo"
            v-model="checkedBoxesState"
          />Memo</label
        >

        <label for="is-source-checkbox">
          <input
            id="is-source-checkbox"
            name="is-source-checkbox"
            type="checkbox"
            value="source"
            v-model="checkedBoxesState"
          />Source</label
        >

        <label for="is-amount-checkbox">
          <input
            id="is-amount-checkbox"
            name="is-amount-checkbox"
            type="checkbox"
            value="amount"
            v-model="checkedBoxesState"
          />Amount</label
        >

        <button @click="resetViewHandler">Reset View</button>
      </span>
    </div>
    <table id="table-head">
      <thead>
        <tr>
          <th
            id="date-col-header"
            scope="col"
            v-if="checkedBoxesState.indexOf('date') > -1"
          >
            Date
          </th>
          <th
            id="memo-col-header"
            scope="col"
            v-if="checkedBoxesState.indexOf('memo') > -1"
          >
            Memo
          </th>
          <th
            id="amount-col-header"
            scope="col"
            v-if="checkedBoxesState.indexOf('amount') > -1"
          >
            Amount
          </th>
        </tr>
      </thead>
    </table>
  </section>
</template>

<style scoped>
button {
  background-color: var(--c-button-background);
}
select {
  display: block;
}

.fixed-wrapper {
  position: fixed;
  left: 1rem;
  right: 1rem;
  max-width: calc(1280px - 2rem);
  padding: 1rem;
  margin: 0 auto;
}

.control-panel-row {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

#table-head {
  margin-top: 1rem;
}

#date-col-header,
#amount-col-header {
  width: 12%;
}

#control-panel {
  top: 4rem;
  background-color: var(--c-base);
  padding-bottom: 0;
}

#control-panel-outline {
  border-radius: 1rem;
  background-color: var(--c-base-accent);
}
</style>
