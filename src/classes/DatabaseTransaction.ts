export default class Transaction {
	db_id: number;
	trans_type: string;
	date_posted: string;
	amount: number;
	memo: string;
	fitid: string | null;
	constructor(
		dbId: number,
		transType: string,
		datePostedData: string,
		amountData: string,
		memoData: string,
		fitid: string | null = null,
	) {
		this.db_id = dbId;
		this.trans_type = transType;
		this.date_posted = this.formatDate(datePostedData);
		this.amount = this.formatAmount(amountData);
		this.memo = this.formatMemo(memoData);
		this.fitid = fitid;
	}

	formatDate(datePostedData: string) {
		return datePostedData;
	}
	formatAmount(amountData: string) {
		return Number.parseInt(amountData);
	}
	formatMemo(memoData: string) {
		return memoData.trim();
	}
}
