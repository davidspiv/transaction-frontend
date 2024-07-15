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
  <ul id="dropdown-filters">
    <li>
      <label for="time-range">Time Range</label>
      <select name="time-range" id="time-range">
        <option value="all">All</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year-to-date">Year To Date</option>
        <option value="year">Year</option>
      </select>
    </li>
    <li>
      <label for="account">Primary Account</label>
      <select name="account" id="account">
        <option value="assets">Assets</option>
        <option value="expenses">Expenses</option>
        <option value="income">Income</option>
        <option value="liabilities">Liabilities</option>
        <option value="equity">Equity</option>
      </select>
    </li>
  </ul>
  <table>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Memo</th>
      <th scope="col">include</th>
      <th scope="col">Amount</th>
      <th scope="col">affectedAccounts</th>
    </tr>
    <tbody v-for="transaction in transactions" :key="transaction.id">
      <TransactionCard :data="transaction" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
  margin: 0 auto;
  border-spacing: 2rem;
  border: 2px solid rgb(140 140 140);
}

th {
  text-align: left;
  border-top: 1px solid rgb(160 160 160);
  border-bottom: 1px solid rgb(160 160 160);
}

tr th:nth-child(3) {
  width: 10%;
}

#dropdown-filters {
  display: flex;
  justify-content: space-between;
  gap: 3.5rem;
  max-width: 20rem;
  margin: 0 auto;
  padding: 2rem 0;
}

#dropdown-filters li {
  display: flex;
  flex-direction: column;
}

ul {
  padding: 0;
}
</style>
