<script setup lang="ts">
import Transaction from '../models/Transaction'

const props = defineProps<{
  data: Transaction
}>()

const { memo, amount } = props.data
</script>

<template>
  <ul>
    <li>{{ memo }}</li>
    <li>{{ amount }}</li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6;
}
</style>
