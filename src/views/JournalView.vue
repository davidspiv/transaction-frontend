<script setup lang="ts">
import ReceiptCard from '@/components/ReceiptCard.vue';
import { getJournal } from '@/composables/state';
import { onMounted, ref } from 'vue';

const entryState = ref({
  receiptIndex: 0,
  date: '1/1/2024',
  memo: '',
  total: '',
  accounts: [
    { name: 'Rent A/c', rel: 'Debit', amount: '$5,000.00' },
    { name: 'Expenses A/c', rel: 'Credit', amount: '$5,000.00' },
  ],
});

const clickHandler = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const receiptIndex = target.getAttribute('index');

  if (target && receiptIndex) {
    const dateCell = target.querySelector(
      '#receipt-date',
    ) as HTMLTableCellElement;

    const memoCell = target.querySelector(
      '#receipt-memo',
    ) as HTMLTableCellElement;

    const amountCell = target.querySelector(
      '#receipt-amount',
    ) as HTMLTableCellElement;

    entryState.value.date = dateCell.innerText;
    entryState.value.receiptIndex = Number.parseInt(receiptIndex);

    entryState.value.memo = memoCell.innerText;
    entryState.value.total = amountCell.innerText;

    entryState.value.accounts = [
      { name: 'Rent A/c', rel: 'Debit', amount: entryState.value.total },
      { name: 'Expenses A/c', rel: 'Credit', amount: entryState.value.total },
    ];
  }
};

const journal = getJournal();

const { receipts, total, fetchReceipts } = journal;

onMounted(() => {
  if (!receipts.length) {
    fetchReceipts();
  }
});
</script>

<template>
  <h2>Journal</h2>
  <span>Total: {{ total }}</span>
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
      <tr v-for="account in entryState.accounts" :key="account.name">
        <td>{{ entryState.date }}</td>
        <td>{{ account.name }}</td>
        <td>{{ account.amount }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <div v-if="receipts.length">
    <table>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Memo</th>
        <th scope="col">Amount</th>
      </tr>
      <tbody>
        <tr
          @click="clickHandler($event)"
          v-for="(receipt, index) in receipts"
          :key="receipt.id"
          :index="index"
        >
          <ReceiptCard :data="receipt" />
        </tr>
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
        <th scope="col">Account</th>
      </tr>
      <tbody>
        <tr>
          <td colspan="5" id="nothing">No receipts met above criteria</td>
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
