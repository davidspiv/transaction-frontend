import { ref, computed, watch } from "vue";
import type { Receipt, Transaction } from "@/models/types";

type GlobalState = {
	receipts: Receipt[];
	transactions: Transaction[];
};

const timeRange = ref<string>("day");
const accType = ref<string>("all");

const buildUrl = (time: string, accType: string, limit?: number) => {
	let address = "http://localhost:5000/api/receipts/?";

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

const globalState = ref<GlobalState>({
	receipts: [],
	transactions: [],
});

const getLedger = () => {
	return {
		transactions: globalState.value.transactions,
		apiUrl: apiUrlComputed.value,
		timeRange,
		accType,
		resetFilterHandler,
		total: computed(() =>
			globalState.value.transactions.reduce(
				(sum, item: Transaction) => sum + (item.amount || 0) / -100,
				0,
			),
		),
	};
};

const getJournal = () => {
	return {
		entries: globalState.value.receipts,
		total: computed(
			() =>
				globalState.value.receipts.reduce(
					(sum, item) => sum + item.amount,
					0,
				) / -100,
		),
	};
};

const resetFilterHandler = () => {
	if (timeRange.value && accType.value) {
		fetchTransactions(apiUrlComputed.value);
	} else {
		console.log("Error with dropdown values");
	}
};

const fetchTransactions = async (source: string) => {
	try {
		const apiUrl = source;
		const res = await fetch(apiUrl);
		const data = await res.json();

		globalState.value.transactions.length = 0;
		globalState.value.transactions.push(
			...((data.receipts as Transaction[]) || []),
		);
	} catch (error) {
		console.log("Error fetching data", error);
	}
};

watch(apiUrlComputed, resetFilterHandler);

export { getJournal, getLedger };
