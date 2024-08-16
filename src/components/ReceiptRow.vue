<script setup lang="ts">
import { formatDate, formatAmount } from '@/composables/utils';
import type { Receipt } from '../models/types';

const props = defineProps<{
  data: Receipt;
}>();

const { date, memo, amount } = props.data;
</script>

<template>
  <tr>
    <td id="receipt-date">
      {{ formatDate(date) }}
    </td>
    <td id="receipt-memo">{{ memo }}</td>
    <td id="receipt-amount">{{ formatAmount(amount) }}</td>
  </tr>
</template>

<style scoped>
td:nth-child(2) {
  text-align: left;
}
</style>
