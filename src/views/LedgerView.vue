<script setup lang="ts">
import Transaction from '../models/Transaction'
import TransactionCard from '@/components/TransactionCard.vue'
import Url from '@/models/Url'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const transactions: Ref<[] | Transaction[]> = ref([])
const apiObj: Url = new Url('day', 'all')

const handler = () => {
  const timePicker = document.getElementById(
    'time-range'
  ) as HTMLSelectElement
  const accPicker = document.getElementById(
    'acc-range'
  ) as HTMLSelectElement

  apiObj.time = timePicker.value
  apiObj.acc = accPicker.value

  fetchTransactions(apiObj.build())
}

const fetchTransactions = async (source: string) => {
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

onMounted(async () => {
  fetchTransactions(apiObj.build())
})
</script>

<template>
  <h2>Journal</h2>
  <ul class="center-menu">
    <li>
      <label for="time-range">Time Range</label>
      <select @change="handler" name="time-range" id="time-range">
        <option disabled value="">Please select one</option>
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="year-to-date">Year To Date</option>
        <option value="all">All</option>
      </select>
    </li>
    <li>
      <label for="acc-range">Primary Account</label>
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

  <div v-if="transactions.length">
    <table>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Memo</th>
        <th scope="col">include</th>
        <th scope="col">Amount</th>
        <th scope="col">affectedAccounts</th>
      </tr>
      <tbody
        v-for="transaction in transactions"
        :key="transaction.id"
      >
        <TransactionCard :data="transaction" />
      </tbody>
    </table>
    <div class="center-menu">
      <button>100 more</button><button>500 more</button>
    </div>
  </div>
  <div v-else>
    <table>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Memo</th>
        <th scope="col">include</th>
        <th scope="col">Amount</th>
        <th scope="col">affectedAccounts</th>
      </tr>
      <tbody>
        <tr>
          <td colspan="5" id="nothing">
            No transactions met above criteria
          </td>
        </tr>
      </tbody>
    </table>
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

#nothing {
  text-align: center;
}
</style>
