<script setup lang="ts">
import JournalEntry from '@/models/JournalEntry'
import TransactionCard from '@/components/TransactionCard.vue'
import {
  savedEntries,
  toGlobalState,
  toLocalState
} from '@/composables/state'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

const entries: Ref<[] | JournalEntry[]> = ref([])

const importCsv = async (event: Event) => {
  const formattedData: JournalEntry[] = []
  let csvData: string
  let reader = new FileReader()
  reader.readAsText(event.target.files[0])
  reader.onload = function () {
    csvData = reader.result as string
    console.log(csvData)
  }

  const parseCsv = async () => {
    if (csvData) {
      buildTransObj(csvData)
    } else {
      console.log('Error with getData()')
    }

    return entries

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

        const transObj = new JournalEntry(
          date,
          dateOffset,
          amount,
          memo,
          srcId
        )

        formattedData.push(transObj)
      }
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
}
</script>

<template>
  <h2>Journal</h2>
  <input
    @change="importCsv"
    type="file"
    id="input-csv"
    name="input-csv"
    accept="csv"
  />

  <div v-if="entries.length">
    <table>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Memo</th>
        <th scope="col">include</th>
        <th scope="col">Amount</th>
        <th scope="col">affectedAccounts</th>
      </tr>
      <tbody v-for="entry in entries" :key="entry.id">
        <TransactionCard :data="entry" />
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
  max-width: 80%;
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
