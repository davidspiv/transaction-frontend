import { ref, computed, watch } from 'vue';
import type { Receipt, LineItem } from '@/models/types';

const timeRange = ref<string>('day');
const accType = ref<string>('all');
const isHidden = ref(true);

const getEntryTray = () => {};

const buildUrl = (time: string, accType: string, limit?: number) => {
  let address = 'http://localhost:5000/api/lineItems/?';

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

const globalState = ref({
  receipts: [],
  lineItems: [],
});

const getJournal = () => {
  return {
    receipts: globalState.value.receipts,
    total: computed(() =>
      globalState.value.receipts.reduce(
        (sum: number, item: Receipt) => sum + (item.amount || 0) / -100,
        0,
      ),
    ),
    // fetchReceipts,
  };
};

const getLedger = () => {
  return {
    transactions: globalState.value.lineItems,
    apiUrl: apiUrlComputed.value,
    timeRange,
    accType,
    resetFilterHandler,
    total: computed(() =>
      globalState.value.lineItems.reduce(
        (sum, item: LineItem) => sum + (item.amount || 0) / -100,
        0,
      ),
    ),
  };
};

const resetFilterHandler = () => {
  if (timeRange.value && accType.value) {
    fetchLineItems(apiUrlComputed.value);
  } else {
    console.log('Error with dropdown values');
  }
};

const fetchLineItems = async (source?: string) => {
  try {
    const apiUrl =
      source || 'http://localhost:5000/api/lineItems/?_time=week_acc=all';
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    globalState.value.lineItems.length = 0;
    // globalState.value.lineItems.push(...((data.lineItems as LineItem[]) || []));
  } catch (error) {
    console.log('Error fetching data', error);
  }
};

watch(apiUrlComputed, resetFilterHandler);

export { getJournal, getLedger, isHidden, getEntryTray };
