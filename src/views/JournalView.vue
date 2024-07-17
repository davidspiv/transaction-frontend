<script setup lang="ts">
import Transaction from '../models/Transaction'
import TransactionCard from '@/components/TransactionCard.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const sourceUrl: Ref<string> = ref(
  'http://localhost:5000/api/transactions/?_time=all_acc=all_limit=10'
)
const transactions: Ref<[] | Transaction[]> = ref([])
fetchTransactions(sourceUrl.value)

const handler = () => {
  let apiUrl: string = 'http://localhost:5000/api/transactions/?'
  const timePicker = document.getElementById(
    'time-range'
  ) as HTMLSelectElement
  const accPicker = document.getElementById(
    'acc-range'
  ) as HTMLSelectElement

  switch (timePicker.value) {
    case 'year':
      apiUrl += '_time=year'
      break
    case 'year-to-date':
      apiUrl += '_time=year-to-date'
      break
    case 'month':
      apiUrl += '_time=month'
      break
    case 'week':
      apiUrl += '_time=week'
      break
    case 'day':
      apiUrl += '_time=day'
      break
    default:
      apiUrl += '_time=all'
  }

  switch (accPicker.value) {
    case 'assets':
      apiUrl += '_acc=assets'
      break
    case 'expenses':
      apiUrl += '_acc=expenses'
      break
    case 'income':
      apiUrl += '_acc=income'
      break
    case 'liabilities':
      apiUrl += '_acc=liabilities'
      break
    case 'equity':
      apiUrl += '_acc=equity'
      break
    default:
      apiUrl += '_acc=all'
  }

  // if (accPicker.limit === 'limit') {
  //   apiUrl += `_limit=${accPicker.limit}`
  // }

  fetchTransactions(apiUrl)
}

async function fetchTransactions(source: string) {
  const formattedData: Transaction[] = []
  try {
    const apiUrl = source
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
      <select @change="handler" name="time-range" id="time-range">
        <option disabled value="">Please select one</option>
        <option value="all">All</option>
        <option value="year">Year</option>
        <option value="year-to-date">Year To Date</option>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
    </li>
    <li>
      <label for="account">Primary Account</label>
      <select @change="handler" name="acc-range" id="acc-range">
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
