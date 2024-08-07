type Receipt = {
	srcId: number;
	amount: number;
	date: string;
	dateOffset: number;
	id: string;
	isDebit: number;
	memo: string;
	fitid?: string | null;
};

type Transaction = {
	accId: number;
	amount: number;
	date: string;
	dateOffset: number;
	fitid: number | null;
	id: string;
	isDebit: number;
	memo: string;
};

type ApiUrl = {
	time: string;
	acc: string;
	limit?: number;
};

export type { Transaction, Receipt, ApiUrl };
