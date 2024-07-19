<script setup lang="ts">
import Entry from '@/models/Entry'
import EntryCard from '@/components/EntryCard.vue'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

const entries: Ref<[] | Entry[]> = ref([])

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

          const transObj = new Entry(
            date,
            dateOffset,
            amount,
            memo,
            srcId
          )

          formattedData.push(transObj)
        }
        entries.value = formattedData
        inputEl.value = '' //reset html file input element
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

const entriesTotal = computed(
  () =>
    entries.value.reduce((sum, item) => sum + item.amount, 0) / 1000
)
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
  <span>Total: {{ entriesTotal }}</span>
  <div v-if="entries.length">
    <table>
      <tr>
        <th scope="col">Memo</th>
        <th scope="col">include</th>
        <th scope="col">Amount</th>
      </tr>
      <tbody v-for="entry in entries" :key="entry.id">
        <EntryCard :data="entry" />
      </tbody>
    </table>
  </div>
  <div v-else>
    <table>
      <tr>
        <th scope="col">Memo</th>
        <th scope="col">include</th>
        <th scope="col">Amount</th>
      </tr>
      <tbody>
        <tr>
          <td colspan="3" id="nothing">
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

tr th:nth-child(2) {
  width: 10%;
}

#nothing {
  text-align: center;
}
</style>
