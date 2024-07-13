<script setup lang="ts">
import Transaction from '../models/Transaction'

const props = defineProps<{
  data: Transaction
}>()

const { memo, amount } = props.data
</script>

<template>
  <tr>
    <td>{{ memo }}</td>
    <td><input type="checkbox" /></td>
    <td>affectedAccounts</td>
    <td>{{ amount }}</td>
  </tr>
</template>

<style scoped>
td {
  padding: 2rem;
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
