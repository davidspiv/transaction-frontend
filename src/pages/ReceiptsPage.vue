<script setup lang="ts">
import { ref, watch } from 'vue';
import { entryTrayState } from '@/composables/state';
import GeneralControls from '@/components/GeneralControls.vue';
import ReceiptRow from '@/components/ReceiptRow.vue';
import { checkedBoxesState } from '@/components/GeneralControls.vue';

import type { Receipt } from '@/models/types';
import type { Ref } from 'vue';

const clickHandler = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const indexData = target.getAttribute('index');

  if (indexData) {
    entryTrayState.value.selected = receiptsState.value[Number(indexData)];
  }
};

const log = () => {
  console.log('checked Boxes:', checkedBoxesState.value);
};

watch(checkedBoxesState, log);
</script>

<script lang="ts">
export const receiptsState: Ref<Receipt[]> = ref([]);
</script>

<template>
  <section id="body-panel" class="flex-column">
    <GeneralControls />
    <table>
      <thead>
        <tr>
          <th
            id="dateCol"
            v-if="checkedBoxesState.indexOf('date') > -1"
            scope="col"
          ></th>
          <th
            id="memoCol"
            v-if="checkedBoxesState.indexOf('memo') > -1"
            scope="col"
          ></th>
          <th
            id="amountCol"
            v-if="checkedBoxesState.indexOf('amount') > -1"
            scope="col"
          ></th>
        </tr>
      </thead>
      <tbody v-if="receiptsState.length">
        <ReceiptRow
          v-for="receipt in receiptsState"
          @click="clickHandler($event)"
          :data="receipt"
          :key="receipt.id"
        />
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="5">No unprocessed receipts</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
button {
  background-color: var(--c-base-accent);
}

th,
tr {
  border: 0;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

#amountCol,
#dateCol {
  width: 12%;
}

#body-panel {
  padding-top: 13.5rem;
  background-color: var(--c-base);
  border-radius: 1rem;
}
</style>
