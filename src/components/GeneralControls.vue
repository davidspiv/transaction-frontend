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

watch(apiUrlComputed, fetchReceipts);

onMounted(() => {
  if (!receiptsState.value.length) {
    fetchReceipts();
  }
});

const resetViewHandler = () => {
  console.log('reset view');
};
</script>

<script lang="ts">
export const checkedBoxesState = ref(['date', 'memo', 'amount']);
</script>

<template>
  <section id="control-panel" class="fixed-wrapper">
    <div id="control-panel-outline">
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
        <button @click="resetViewHandler">Reset Filter</button>
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
  </section>
</template>

<style scoped>
button {
  background-color: #363c55;
}

select {
  display: block;
}

.fixed-wrapper {
  position: fixed;
  left: 1rem;
  right: 1rem;
  max-width: calc(1280px - 2rem);
  margin: 0 auto;
  padding: 1rem;
}

.control-panel-row {
  display: flex;
  gap: 3rem;
  align-items: center;
}

#control-panel {
  top: 4rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  gap: 1rem;
  background-color: #1c1f2b;
}

#control-panel-outline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #202538;
  margin-bottom: 1rem;
}
</style>
