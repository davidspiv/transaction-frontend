<script setup lang="ts">
import TransactionCard from '@/components/TransactionCard.vue';
import { getLedger } from '@/composables/state';
import { onMounted } from 'vue';

const ledger = getLedger();

const { transactions, total, timeRange, accType, resetFilterHandler } = ledger;

onMounted(() => {
  if (!transactions.length) {
    resetFilterHandler();
  }
});

// const total = computed(() => {
//   const amountData = receipts.value.reduce(
//     (sum: number, item: Receipt) => sum + (item.amount || 0),
//     0,
//   );
//   return formatAmount(amountData);
// });
</script>

<template>
  <span>Total: {{ total }}</span>
  <ul class="center-menu">
    <li>
      <label for="time-range">Time Range</label>
      <select v-model="timeRange" name="time-range" id="time-range">
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
      <select v-model="accType" name="acc-range" id="acc-range">
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
        <th scope="col">Account</th>
      </tr>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <TransactionCard :data="transaction" />
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
          <td colspan="5" id="nothing">No transactions met above criteria</td>
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
