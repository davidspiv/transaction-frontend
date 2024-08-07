<script setup lang="ts">
import ReceiptCard from '@/components/ReceiptCard.vue'
import { getJournal } from '@/composables/state'
import { onMounted } from 'vue'

// const TransactionState = {
//   date: '1/1/2024',
//   accounts: [
//     { name: 'Rent', rel: 'Debit', amount: 5000 },
//     { name: 'Expenses', rel: 'Credit', amount: 5000 }
//   ]
// }

const journal = getJournal()

const { receipts, total, fetchReceipts } = journal

onMounted(() => {
  if (!receipts.length) {
    fetchReceipts()
  }
})
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
    <table>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Memo</th>
        <th scope="col">Amount</th>
      </tr>
      <tbody>
        <tr v-for="receipt in receipts" :key="receipt.id">
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
          <td colspan="5" id="nothing">
            No receipts met above criteria
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
