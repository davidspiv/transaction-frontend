import { ref } from 'vue';

const receiptViewState = ref({
  filters: {
    status: 'unprocessed',
    source: 'all',
    time: 'week',
  },
});

const journalViewState = ref({
  filters: {
    status: 'unprocessed',
    source: 'all',
    time: 'week',
  },
});

const ledgerViewState = ref({
  filters: {
    status: 'unprocessed',
    source: 'all',
    time: 'week',
  },
});

export { receiptViewState, journalViewState, ledgerViewState };
