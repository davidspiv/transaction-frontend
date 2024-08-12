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
  transactions: Transaction[];
  rcptId?: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  isDebit: number;
  accId: number;
}

interface ApiUrl {
  time: string;
  acc: string;
  limit?: number;
}

export type { Receipt, Entry, Transaction, ApiUrl };
