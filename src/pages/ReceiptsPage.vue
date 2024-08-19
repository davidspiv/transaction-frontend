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
  padding-top: 15.3rem;
}

button {
  background-color: #363c55;
}

.center {
  text-align: center;
}
</style>
