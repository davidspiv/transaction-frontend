<script setup lang="ts">
import ReceiptCard from '@/components/ReceiptCard.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { receiptViewState, selected } from '@/composables/state';
import type { Ref } from 'vue';
import type { Receipt } from '@/models/types';

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

          // receipts.push(receiptObj);
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

const receipts: Ref<Receipt[]> = ref([]);

const apiUrlComputed = computed(() => {
  const { status, source, time } = receiptViewState.value.filters;
  return `http://localhost:5000/api/receipts/?_status=${status}_src=${source}_time=${time}`;
});

const fetchReceipts = async () => {
  let data;
  try {
    const apiUrl = apiUrlComputed.value;
    const res = await fetch(apiUrl);
    data = await res.json();
  } catch (error) {
    console.log('Error fetching data', error);
  }
  receipts.value.length = 0; //clear receipts
  receipts.value.push(...((data?.receipts as Receipt[]) || []));
};

watch(apiUrlComputed, fetchReceipts);

onMounted(() => {
  if (!receipts.value.length) {
    fetchReceipts();
  }
});

const clickHandler = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const indexData = target.getAttribute('index');

  if (indexData) {
    selected.value = receipts.value[Number(indexData)];
  }
};

const newHandler = () => {
  console.log('new');
};

const resetViewHandler = () => {
  console.log('reset view');
};
</script>

<template>
  <section>
    <span class="flex-container">
      <h3>Receipts</h3>
      <button @click="newHandler">Import receipts</button>
    </span>
    <div class="flex-container">
      <span class="vertical">
        <label for="time-range">Status</label>
        <select
          v-model="receiptViewState.filters.status"
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
      </span>
      <span class="vertical">
        <label for="acc-range">Source</label>
        <select
          v-model="receiptViewState.filters.source"
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
      </span>
      <span class="vertical">
        <label for="time-range">Time Range</label>
        <select
          v-model="receiptViewState.filters.time"
          name="time-range"
          id="time-range"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="year-to-date">Year To Date</option>
          <option value="all">All</option>
        </select>
      </span>
      <button @click="resetViewHandler">Reset Filter</button>
    </div>
    <span class="flex-container">
      <span class="control-container">
        <span>Columns visible: </span>
        <span>
          <input type="checkbox" name="" id="is-date-checkbox" checked="true" />
          <label for="is-column-check">Date</label>
        </span>
        <span>
          <input type="checkbox" name="" id="is-memo-checkbox" checked="true" />
          <label for="is-column-check">Memo</label>
        </span>
        <span>
          <input type="checkbox" name="" id="is-source-checkbox" />
          <label for="is-column-check">Source</label>
        </span>
        <span>
          <input
            type="checkbox"
            name=""
            id="is-amount-checkbox"
            checked="true"
          />
          <label for="is-column-check">Amount</label>
        </span>

        <span> </span>
      </span>
      <button @click="resetViewHandler">Reset View</button>
    </span>
    <table>
      <thead>
        <tr>
          <th scope="col"><button>Date</button></th>
          <th scope="col"><button>Memo</button></th>
          <th scope="col"><button>Amount</button></th>
        </tr>
      </thead>
      <tbody v-if="receipts.length">
        <tr
          @click="clickHandler($event)"
          v-for="(receipt, index) in receipts"
          :key="receipt.id"
          :index="index"
        >
          <ReceiptCard :data="receipt" />
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="5">No unprocessed receipts</td>
        </tr>
      </tbody>
    </table>
    <span class="center">
      <button>Show All</button>
    </span>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #1c1f2b;
  border-radius: 1rem;
}

.vertical {
  display: flex;
  flex-direction: column;
}

button {
  background-color: #363c55;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.center {
  text-align: center;
}

th:nth-child(3),
th:nth-child(1) {
  width: 12%;
}
</style>
