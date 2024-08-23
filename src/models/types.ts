export interface Reference {
  id: string | null;
  date: string;
  dateOffset: number;
  memo: string;
  amount: number;
  srcId: string | null;
  fitid?: string;
}

export interface Entry {
  id: string;
  date: string;
  lineItems: LineItem[];
  type: string; //Opening, Transfer, Closing, Adjusting, Compound
  description: string;
  userId: string;
}

export interface LineItem {
  id: string;
  amount: number;
  isDebit: boolean;
  accCode?: number;
}

export interface ApiUrl {
  time: string;
  acc: string;
  limit?: number;
}

export interface EntryTrayState {
  isModified: boolean;
  isHidden: boolean;
  selected: Reference | null;
}
