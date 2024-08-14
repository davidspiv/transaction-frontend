<script setup lang="ts">
import ReceiptCard from '@/components/ReceiptCard.vue';
import { getJournal } from '@/composables/state';
import type { Receipt } from '@/models/types';

const journal = getJournal();

const { receipts, total } = journal;

const importCsv = async (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  let csvData: string;
  const reader = new FileReader();

  if (inputEl.files) {
    reader.readAsText(inputEl.files[0]);
    reader.onload = () => {
      csvData = reader.result as string;
      parseCsv();
    };

    const parseCsv = async () => {
      if (csvData) {
        buildReceiptObj(csvData);
      } else {
        console.log('Error with getData()');
      }

      return;

      function buildReceiptObj(data: string) {
        const csvValues = splitCsv(data.replace(/[\n]/g, ','));
        const totalCol = 7;

        let lastDate: string | null = null;
        let dateOffset = 0;

        for (let i = 1; i < Math.floor(csvValues.length / totalCol); i++) {
          const date = new Date(csvValues[i * totalCol]).toISOString();

          if (lastDate === date) {
            dateOffset++;
          } else {
            dateOffset = 0;
            lastDate = date;
          }

          const amount = Math.round(
            Number.parseInt(
              (Number.parseFloat(csvValues[i * totalCol + 5]) * 100).toFixed(2),
            ),
          );

          const memo = csvValues[i * totalCol + 1];
          const srcId = 1;
          const id = `${date}${dateOffset}${memo}${srcId}`;
          const isDebit = 1;

          const receiptObj: Receipt = {
            date,
            dateOffset,
            amount,
            memo,
            srcId,
            id,
            isDebit,
          };

          receipts.push(receiptObj);
        }
        inputEl.value = ''; //reset html file input element
      }

      function splitCsv(str: string) {
        const obj: { soFar: string[]; isConcatting: boolean } = {
          soFar: [],
          isConcatting: false,
        };
        return str.split(',').reduce((accum, curr) => {
          if (accum.isConcatting) {
            accum.soFar[accum.soFar.length - 1] += `,${curr}`;
          } else {
            accum.soFar.push(curr);
          }
          if (curr.split('"').length % 2 === 0) {
            accum.isConcatting = !accum.isConcatting;
          }
          return accum;
        }, obj).soFar;
      }
    };
  } else {
    throw new Error('no files selected');
  }
};
</script>

<template>
  <h2>Journal</h2>
  <table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Particulars</th>
        <th scope="col">Debit</th>
        <th scope="col">Credit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1/1/2024</td>
        <td>Rent A/C</td>
        <td>5,000</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Rent A/C</td>
        <td></td>
        <td>5,000</td>
      </tr>
    </tbody>
  </table>
  <div v-if="receipts.length">
    <span>Total: {{ total }}</span>
    <table>
      <thead>
        <tr>
          <th scope="col">Memo</th>
          <th scope="col">include</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="receipt in receipts" :key="receipt.id">
          <ReceiptCard :data="receipt" />
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <input
      @change="importCsv"
      type="file"
      id="input-csv"
      name="input-csv"
      accept="csv"
    />
    <table>
      <thead>
        <tr>
          <th scope="col">Memo</th>
          <th scope="col">include</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="3" id="nothing">Add journal receipts to get started</td>
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
