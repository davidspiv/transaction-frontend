<script setup lang="ts">
import Transaction from '../models/Transaction'
import TransactionCard from '@/components/TransactionCard.vue'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const transactions: Ref<[] | Transaction[]> = ref([])

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
    case 'asset':
      apiUrl += '_acc=asset'
      break
    case 'expense':
      apiUrl += '_acc=expense'
      break
    case 'revenue':
      apiUrl += '_acc=revenue'
      break
    case 'liability':
      apiUrl += '_acc=liability'
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

onMounted(async () => {
  handler()
})

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
  <ul class="center-menu">
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
        <option disabled value="">Please select one</option>
        <option value="all">All</option>
        <option value="asset">Assets</option>
        <option value="expense">Expenses</option>
        <option value="revenue">Revenue</option>
        <option value="liability">Liabilities</option>
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
  <div class="center-menu">
    <button>100 more</button><button>500 more</button>
  </div>
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

.center-menu {
  display: flex;
  justify-content: space-between;
  gap: 3.5rem;
  max-width: 20rem;
  margin: 0 auto;
  padding: 2rem 0;
}

.center-menu li {
  display: flex;
  flex-direction: column;
}

ul {
  padding: 0;
}
</style>
