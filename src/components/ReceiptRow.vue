<script setup lang="ts">
import { formatDate, formatAmount } from '@/composables/utils';
import { checkedBoxesState } from './GeneralControls.vue';

import type { Receipt } from '../models/types';

const props = defineProps<{
  data: Receipt;
  index: number;
}>();

const { date, memo, amount } = props.data;
</script>

<template>
  <tr v-bind:class="{ 'top-row': Number(props.index) === 0 }">
    <td id="dateCell" v-if="checkedBoxesState.indexOf('date') > -1">
      {{ formatDate(date) }}
    </td>
    <td id="memoCell" v-if="checkedBoxesState.indexOf('memo') > -1">
      {{ memo }}
    </td>
    <td id="amountCell" v-if="checkedBoxesState.indexOf('amount') > -1">
      {{ formatAmount(amount) }}
    </td>
  </tr>
</template>

<style scoped>
.top-row td {
  border-top: 0;
}

#memoCell {
  text-align: left;
}

#dateCell,
#amountCell {
  width: 12%;
}
</style>
