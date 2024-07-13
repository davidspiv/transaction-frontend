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
    <td>{{ amount }}</td>
  </tr>
</template>

<style scoped></style>
