<script setup lang="ts">
import Transaction from '../models/Transaction'

const props = defineProps<{
  data: Transaction
}>()

const { date, memo, amount } = props.data
</script>

<template>
  <tr>
    <td id="trans-date">{{ date }}</td>
    <td id="trans-memo">{{ memo }}</td>
    <td id="trans-omit"><input type="checkbox" /></td>
    <td id="trans-ac">
      <ul>
        <li><span class="acc-code">10000</span> savings</li>
        <li><span class="acc-code">50000</span> expense</li> 
      </ul>
    </td>
    <td id="trans-amount">{{ amount }}</td>
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
