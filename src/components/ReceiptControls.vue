<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { receiptViewState } from '@/composables/state';

import router from '@/router';

const resetViewHandler = () => {
  console.log('reset view');
};
</script>

<template>
  <section id="control-panel">
    <div id="control-panel-outline">
      <div class="flex-container">
        <span class="control-container">
          <span class="vertical">
            <label for="select-status">Status</label>
            <select
              v-model="receiptViewState.filters.status"
              name="select-status"
              id="select-status"
            >
              <option value="unprocessed">Unprocessed</option>
              <option value="all">All</option>
              <option value="processed">Processed</option>
            </select>
          </span>
          <span class="vertical">
            <label for="select-source">Source</label>
            <select
              v-model="receiptViewState.filters.source"
              name="select-source"
              id="select-source"
            >
              <option value="all">All</option>
            </select>
          </span>
          <span class="vertical">
            <label for="select-time">Time Range</label>
            <select
              v-model="receiptViewState.filters.time"
              name="select-time"
              id="select-time"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="year-to-date">Year To Date</option>
              <option value="all">All</option>
            </select>
          </span>
        </span>
        <button @click="resetViewHandler">Reset Filter</button>
      </div>

      <span class="flex-container">
        <span class="control-container">
          <span>
            <input
              type="checkbox"
              name=""
              id="is-date-checkbox"
              checked="true"
            />
            <label for="is-date-checkbox">Date</label>
          </span>
          <span>
            <input
              type="checkbox"
              name=""
              id="is-memo-checkbox"
              checked="true"
            />
            <label for="is-memo-checkbox">Memo</label>
          </span>
          <span>
            <input type="checkbox" name="" id="is-source-checkbox" />
            <label for="is-source-checkbox">Source</label>
          </span>
          <span>
            <input
              type="checkbox"
              name=""
              id="is-amount-checkbox"
              checked="true"
            />
            <label for="is-amount-checkbox">Amount</label>
          </span>
        </span>
        <button @click="resetViewHandler">Reset View</button>
      </span>
    </div>
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Memo</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
    </table>
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

#control-panel {
  /* position: fixed; */
  left: 1rem;
  right: 1rem;
  max-width: calc(1280px - 2rem);
  margin: 0 auto;
  top: 4rem;
  background-color: #1c1f2b;
  padding-bottom: 0;
  border-radius: 0;
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

#body-panel {
  padding-top: 13.4rem;
}

.vertical {
  display: flex;
  flex-direction: column;
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
  gap: 3rem;
  align-items: center;
}

.control-container select {
  width: 7rem;
}

.center {
  text-align: center;
}

th:nth-child(3),
th:nth-child(1) {
  width: 12%;
}

label {
  padding-left: 0.5rem;
}

.vertical label {
  padding: 0;
}
</style>
