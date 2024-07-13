<script setup lang="ts">
import Transaction from '../models/Transaction'
import TransactionCard from '@/components/TransactionCard.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const transactions: Ref<[] | Transaction[]> = ref([])
fetchTransactions()

async function fetchTransactions() {
  const formattedData: Transaction[] = []
  try {
    const apiUrl = 'http://localhost:5000/api/transactions/?_limit=40'
    const res = await fetch(apiUrl)
    const data = await res.json()
    for (const trans of data.transactions) {
      formattedData.push(
        new Transaction(
          trans.id,
          trans.date,
          trans.dateOffset,
          trans.amount,
          trans.memo,
          trans.userId,
          trans.accCode
        )
      )
    }
  } catch (error) {
    console.log('Error fetching data', error)
  }
  transactions.value = formattedData
}
</script>

<template>
  <h2>Journal</h2>
  <select name="time-range" id="time-range">
    <option value="all">All</option>
    <option value="week">Week</option>
    <option value="month">Month</option>
    <option value="year-to-date">Year To Date</option>
    <option value="year">Year</option>
  </select>
  <ul>
    <li v-for="transaction in transactions" :key="transaction.id">
      <TransactionCard :data="transaction" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
}
</style>
