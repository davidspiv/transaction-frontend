<script setup lang="ts">
import BalanceSheet from '../components/BalanceSheet.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const reportData: Ref<[] | string[]> = ref([])
fetchReportData()

async function fetchReportData() {
  try {
    const apiUrl = 'http://localhost:5000/api/forms'
    const res = await fetch(apiUrl)
    const data = await res.json()
    reportData.value = data
  } catch (error) {
    console.log('Error fetching data', error)
  }
}
</script>

<template>
  <BalanceSheet />
</template>

<style scoped></style>
