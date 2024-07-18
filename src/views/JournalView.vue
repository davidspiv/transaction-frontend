<script setup lang="ts">
import JournalEntry from '@/models/JournalEntry'
import TransactionCard from '@/components/TransactionCard.vue'
import { savedEntries } from '@/composables/state'
import { ref } from 'vue'
import type { Ref } from 'vue'

const entries: Ref<[] | JournalEntry[]> = ref([])

const importCsv = async (event: Event) => {
  const formattedData: JournalEntry[] = []
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

          const transObj = new JournalEntry(
            date,
            dateOffset,
            amount,
            memo,
            srcId
          )

          formattedData.push(transObj)
        }
        entries.value = formattedData
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
</template>

<style scoped></style>
