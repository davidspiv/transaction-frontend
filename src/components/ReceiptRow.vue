<script setup lang="ts">
import { formatDate, formatAmount } from '@/composables/utils';
import { checkedBoxesState } from './GeneralControls.vue';

import type { Receipt } from '../models/types';

const props = defineProps<{
  data: Receipt;
}>();

const { date, memo, amount } = props.data;
</script>

<template>
  <tr>
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
#memoCell {
  text-align: left;
}
</style>
