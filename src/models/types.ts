import type { Ref } from 'vue';

interface Receipt {
  id: string;
  date: string;
  dateOffset: number;
  memo: string;
  amount: number;
  isDebit: number;
  srcId: number;
  fitid?: string;
}

interface Entry {
  id: string;
  lineItems: LineItem[];
  type: string; //Opening, Transfer, Closing, Adjusting, Compound
  description: string;
  referenceIds: string[]; //To reference receipt, entry, and line item Id's
}

interface LineItem {
  id: string;
  date: string;
  amount: number;
  accId: number;
}

interface ApiUrl {
  time: string;
  acc: string;
  limit?: number;
}

interface ReceiptViewState {
  filters: {
    status: string;
    source: string;
    time: string;
  };
  selected?: Receipt;
}

interface EntryTrayState {
  entry: Entry;
  tray: {
    isModified: Ref<boolean>;
    isHidden: Ref<boolean>;
  };
}

export type {
  Receipt,
  Entry,
  LineItem,
  ApiUrl,
  ReceiptViewState,
  EntryTrayState,
};
