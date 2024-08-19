<script setup lang="ts">
import { ref } from 'vue';
import { entryTrayState } from '@/composables/state';
import GeneralControls from '@/components/GeneralControls.vue';
import ReceiptRow from '@/components/ReceiptRow.vue';

import type { Receipt } from '@/models/types';
import type { Ref } from 'vue';

const clickHandler = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const indexData = target.getAttribute('index');

  if (indexData) {
    entryTrayState.value.selected = receiptsState.value[Number(indexData)];
  }
};
</script>

<script lang="ts">
export const receiptsState: Ref<Receipt[]> = ref([]);
</script>

<template>
  <GeneralControls />
  <section id="body-panel">
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Memo</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody v-if="receiptsState.length">
        <ReceiptRow
          v-for="(receipt, index) in receiptsState"
          @click="clickHandler($event)"
          :data="receipt"
          :key="receipt.id"
          :index="index"
        />
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="5">No unprocessed receipts</td>
        </tr>
      </tbody>
    </table>
    <span class="center">
      <button>Show All</button>
    </span>
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

#body-panel {
  padding-top: 13.4rem;
}

button {
  background-color: #363c55;
}

.center {
  text-align: center;
}

th:nth-child(3),
th:nth-child(1) {
  width: 12%;
}
</style>
