<script setup lang="ts">
import { formatDate } from '@/composables/utils';
import type { Receipt } from '@/models/types';

defineProps<{
  selectedReceipt: Receipt;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Particulars</th>
        <th scope="col">Debit</th>
        <th scope="col">Credit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ formatDate(selectedReceipt.date) }}</td>
        <td>{{ selectedReceipt.memo }}</td>
        <td>{{ selectedReceipt.amount }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
