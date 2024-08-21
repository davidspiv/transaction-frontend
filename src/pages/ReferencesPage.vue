<script setup lang="ts">
import { ref } from 'vue';
import { entryTrayState } from '@/composables/state';
import GeneralControls from '@/components/GeneralControls.vue';
import ReferenceRow from '@/components/ReferenceRow.vue';
import { checkedBoxesState } from '@/components/GeneralControls.vue';

import type { Reference } from '@/models/types';
import type { Ref } from 'vue';

const clickHandler = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const indexData = target.getAttribute('index');

  if (indexData) {
    entryTrayState.value.selected = referencesState.value[Number(indexData)];
  }
};
</script>

<script lang="ts">
export const referencesState: Ref<Reference[]> = ref([]);
</script>

<template>
  <section id="body-panel" class="flex-column">
    <GeneralControls />
    <table>
      <thead>
        <tr>
          <th
            id="dateCol"
            scope="col"
            v-if="checkedBoxesState.indexOf('date') > -1"
          ></th>
          <th
            id="memoCol"
            scope="col"
            v-if="checkedBoxesState.indexOf('memo') > -1"
          ></th>
          <th
            id="amountCol"
            scope="col"
            v-if="checkedBoxesState.indexOf('amount') > -1"
          ></th>
        </tr>
      </thead>
      <tbody v-if="referencesState.length">
        <ReferenceRow
          v-for="(reference, index) in referencesState"
          @click="clickHandler($event)"
          :data="reference"
          :key="reference.id"
          :index="index"
        />
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="5" class="top-row">No unprocessed references</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
button {
  background-color: var(--c-base-accent);
}

table {
  border-top: 0;
}

th,
tr {
  border: 0;
}

.top-row {
  border-top: 0;
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
  padding-top: 14.2rem;
  background-color: var(--c-base);
  border-radius: 1rem;
}
</style>
