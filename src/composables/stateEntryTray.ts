import { ref, computed } from 'vue';
import type { Receipt, Entry } from '@/models/types';

const selected = ref<Receipt | null>(null);

const entry = computed<Entry>(() => {
  if (selected.value) {
    return {
      id: 'entryId',
      lineItems: [
        {
          id: 'lineItemId1',
          date: selected.value.date,
          amount: selected.value.amount,
          isDebit: 1,
          accId: 5101,
        },
        {
          id: 'lineItemId2',
          date: selected.value.date,
          amount: selected.value.amount,
          isDebit: 0,
          accId: 1100,
        },
      ],
      type: 'Transfer',
      description: selected.value?.memo || '',
      referenceIds: ['rctId'],
    };
  }
  return {
    id: 'entryId',
    lineItems: [
      {
        id: 'lineItemId1',
        date: new Date().toDateString(),
        amount: 0,
        isDebit: 1,
        accId: 5101,
      },
      {
        id: 'lineItemId2',
        date: new Date().toDateString(),
        amount: 0,
        isDebit: 0,
        accId: 1100,
      },
    ],
    type: 'Transfer',
    description: '',
    referenceIds: ['rctId'],
  };
});

const tray = ref({ isModified: false, isHidden: true });

const entryTrayState = {
  entry,
  tray,
};

export { selected, entryTrayState };
