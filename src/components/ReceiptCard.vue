<script setup lang="ts">
import { formatAmount } from '@/composables/utils'
import type { Receipt } from '../models/types'

const props = defineProps<{
  data: Receipt
  index: number
}>()

const { date, memo, amount } = props.data
</script>

<template>
  <td id="receipt-date" :indexData="index">
    {{ new Date(date).toDateString() }}
  </td>
  <td id="receipt-memo">{{ memo }}</td>
  <td id="receipt-amount">{{ formatAmount(amount) }}</td>
</template>

<style scoped>
td {
  padding: 2rem 0.8rem;
  border-top: 1px solid rgb(160 160 160);
  border-bottom: 1px solid rgb(160 160 160);
}

input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  display: flex;
  align-content: center;
  justify-content: center;
  border: 1px solid rgb(160 160 160);
  border-radius: 0.2rem;
}

input[type='checkbox']::before {
  content: '';
  width: 1rem;
  height: 1rem;
  transform: scale(0);
  background-color: rgb(160 160 160);
}

input[type='checkbox']:checked::before {
  transform: scale(1);
}

input[type='checkbox']:hover {
  border: 1px solid white;
}
</style>
