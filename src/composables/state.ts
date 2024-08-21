import { ref } from 'vue';
import type { EntryTrayState } from '@/models/types';

const entryTrayState = ref<EntryTrayState>({
  isModified: false,
  isHidden: true,
  selected: null,
});

const referenceViewState = ref({
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

export { referenceViewState, journalViewState, ledgerViewState, entryTrayState };
