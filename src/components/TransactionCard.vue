<script setup lang="ts">
import { formatAmount, formatDate } from '@/composables/utils';
import type { LineItem } from '../models/types';

const props = defineProps<{
  data: LineItem;
}>();

const { id, date, amount } = props.data;
const checkboxId = `${id}-checkbox`;
</script>

<template>
  <td id="trans-date">{{ formatDate(date) }}</td>

  <td id="trans-omit">
    <input type="checkbox" :id="checkboxId" />
  </td>
  <td id="trans-amount">{{ formatAmount(amount) }}</td>
  <td id="trans-acc">account</td>
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
