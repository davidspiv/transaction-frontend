<script setup lang="ts">
import Transaction from '../models/Transaction'

const props = defineProps<{
  data: Transaction
}>()

const { id, date, memo, amount } = props.data
const checkboxId = `${id}checkbox`
</script>

<template>
  <tr>
    <td id="trans-date">{{ date }}</td>
    <td id="trans-memo">{{ memo }}</td>
    <td id="trans-omit">
      <input type="checkbox" :id="checkboxId" />
    </td>
    <td id="trans-amount">{{ amount }}</td>
    <td id="trans-ac">
      <ul>
        <li>savings</li>
        <li>expense</li>
      </ul>
    </td>
  </tr>
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
