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
    <td>omitTransaction</td>
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
</style>
