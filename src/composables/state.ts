import { ref } from 'vue';

const entryTrayState = ref({
  isModified: false,
  isHidden: true,
  selected: null,
});

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

export { receiptViewState, journalViewState, ledgerViewState, entryTrayState };
