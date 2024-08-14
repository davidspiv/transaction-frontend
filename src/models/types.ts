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

interface EntryTrayState {
  isModified: boolean;
  isHidden: boolean;
  selected: Receipt | null;
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
  isDebit: boolean;
  accId?: string;
}

interface ApiUrl {
  time: string;
  acc: string;
  limit?: number;
}

export type { Receipt, Entry, LineItem, ApiUrl, EntryTrayState };
