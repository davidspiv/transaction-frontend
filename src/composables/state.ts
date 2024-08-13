import { ref, computed, watch } from 'vue';
import type { Receipt, Transaction } from '@/models/types';

type GlobalState = {
  receipts: Receipt[];
  transactions: Transaction[];
};

const timeRange = ref<string>('day');
const accType = ref<string>('all');
const isActive = ref(true);

const buildUrl = (time: string, accType: string, limit?: number) => {
  let address = 'http://localhost:5000/api/transactions/?';

  if (time) {
    address += `_time=${time}`;
  }

  if (accType) {
    address += `_acc=${accType}`;
  }

  if ((limit || 0) > 0) {
    address += `_limit=${limit}`;
  }

  return address;
};

const apiUrlComputed = computed(() => buildUrl(timeRange.value, accType.value));

const globalState = ref<GlobalState>({
  receipts: [],
  transactions: [],
});

const getJournal = () => {
  return {
    receipts: globalState.value.receipts,
    total: computed(() =>
      globalState.value.receipts.reduce(
        (sum, item: Receipt) => sum + (item.amount || 0) / -100,
        0,
      ),
    ),
    // fetchReceipts,
  };
};

const getLedger = () => {
  return {
    transactions: globalState.value.transactions,
    apiUrl: apiUrlComputed.value,
    timeRange,
    accType,
    resetFilterHandler,
    total: computed(() =>
      globalState.value.transactions.reduce(
        (sum, item: Transaction) => sum + (item.amount || 0) / -100,
        0,
      ),
    ),
  };
};

const resetFilterHandler = () => {
  if (timeRange.value && accType.value) {
    fetchTransactions(apiUrlComputed.value);
  } else {
    console.log('Error with dropdown values');
  }
};

const fetchTransactions = async (source?: string) => {
  try {
    const apiUrl =
      source || 'http://localhost:5000/api/transactions/?_time=week_acc=all';
    const res = await fetch(apiUrl);
    const data = await res.json();

    globalState.value.transactions.length = 0;
    globalState.value.transactions.push(
      ...((data.transactions as Transaction[]) || []),
    );
  } catch (error) {
    console.log('Error fetching data', error);
  }
};

watch(apiUrlComputed, resetFilterHandler);

export { getJournal, getLedger, isActive };
