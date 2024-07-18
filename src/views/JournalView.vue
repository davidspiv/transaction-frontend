<script setup lang="ts">
import Entry from '@/models/Entry'
import EntryCard from '@/components/EntryCard.vue'
import ApiUrl from '@/models/ApiUrl'
import { toGlobalState, toLocalState } from '@/composables/state'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

const transactions: Ref<[] | Entry[]> = ref([])
const apiUrl: ApiUrl = new ApiUrl('day', 'all')
let timePicker: null | HTMLSelectElement
let accPicker: null | HTMLSelectElement

const resetFilterHandler = () => {
  if (timePicker && accPicker) {
    apiUrl.time = timePicker.value
    apiUrl.acc = accPicker.value
  } else {
    console.log('Error with dropdown values')
  }
}

onMounted(() => {
  timePicker = document.getElementById(
    'time-range'
  ) as HTMLSelectElement
  accPicker = document.getElementById(
    'acc-range'
  ) as HTMLSelectElement

  toLocalState(apiUrl, 'ledger')

  timePicker.value = apiUrl.time
  accPicker.value = apiUrl.acc
})

const importCsv = async (event: Event) => {
  const formattedData: Entry[] = []
  const inputEl = event.target as HTMLInputElement
  let csvData: string
  let reader = new FileReader()

  if (inputEl.files) {
    reader.readAsText(inputEl.files[0])
    reader.onload = function () {
      csvData = reader.result as string
      parseCsv()
    }

    const parseCsv = async () => {
      if (csvData) {
        buildTransObj(csvData)
      } else {
        console.log('Error with getData()')
      }

      return transactions

      function buildTransObj(data: string) {
        const csvValues = splitCsv(data.replace(/[\n]/g, ','))
        const totalCol = 7

        let lastDate: string | null = null
        let dateOffset = 0

        for (
          let i = 1;
          i < Math.floor(csvValues.length / totalCol);
          i++
        ) {
          const date = new Date(csvValues[i * totalCol]).toISOString()

          if (lastDate === date) {
            dateOffset++
          } else {
            dateOffset = 0
            lastDate = date
          }

          const amount = Math.round(
            Number.parseInt(
              (
                Number.parseFloat(csvValues[i * totalCol + 5]) * 100
              ).toFixed(2)
            )
          )

          const memo = csvValues[i * totalCol + 1]
          const srcId = 1

          const transObj = new Entry(
            date,
            dateOffset,
            amount,
            memo,
            srcId
          )

          formattedData.push(transObj)
        }
        transactions.value = formattedData
      }

      function splitCsv(str: string) {
        const obj: { soFar: string[]; isConcatting: boolean } = {
          soFar: [],
          isConcatting: false
        }
        return str.split(',').reduce((accum, curr) => {
          if (accum.isConcatting) {
            accum.soFar[accum.soFar.length - 1] += `,${curr}`
          } else {
            accum.soFar.push(curr)
          }
          if (curr.split('"').length % 2 === 0) {
            accum.isConcatting = !accum.isConcatting
          }
          return accum
        }, obj).soFar
      }
    }
  } else {
    throw new Error('no files selected')
  }
}

const transactionsTotal = computed(() =>
  transactions.value.reduce((sum, item) => sum + item.amount, 0)
)

onUnmounted(() => {
  toGlobalState(apiUrl, 'ledger')
})
</script>

<template>
  <h2>Total: {{ transactionsTotal }}</h2>
  <input
    @change="importCsv"
    type="file"
    id="input-csv"
    name="input-csv"
    accept="csv"
  />
  <ul class="center-menu">
    <li>
      <label for="time-range">Time Range</label>
      <select
        @change="resetFilterHandler"
        name="time-range"
        id="time-range"
      >
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
      <select
        @change="resetFilterHandler"
        name="acc-range"
        id="acc-range"
      >
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
        <EntryCard :data="transaction" />
      </tbody>
    </table>
    <!-- <div class="center-menu">
      <button>100 more</button><button>500 more</button>
    </div> -->
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
            Add journal entries to get started
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
