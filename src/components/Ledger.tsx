import { useState, useEffect } from 'react';
import TransactionCard from './TransactionCard';
import Spinner from './Spinner';
import Transaction from '../classes/Transaction';

const Ledger = ({ isHome = false }) => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async () => {
			const apiUrl = isHome ? '/api/transactions?_limit=6' : '/api/transactions';
			try {
				const res = await fetch(apiUrl);
				const data = await res.json();
				const formattedData: Transaction[] = [];
				for (const trans of data.transactions) {
					formattedData.push(
						new Transaction(
							trans.id,
							trans.date,
							trans.dateOffset,
							trans.amount,
							trans.memo,
							trans.userId,
							trans.accCode,
						),
					);
				}

				setTransactions(formattedData);
			} catch (error) {
				console.log('Error fetching data', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTransactions();
	}, [isHome]);

	// useEffect(() => {
	// 	console.log(transactions.length);
	// }, [transactions]);

	return (
		<section className='bg-blue-50 px-4 py-10'>
			<div className='container-xl lg:container m-auto'>
				<h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
					{isHome ? 'Recent Transactions' : 'Browse Transactions'}
				</h2>

				{loading ? (
					<Spinner loading={loading} />
				) : (
					<div className='grid grid-cols-1 gap-6'>
						{transactions.map((transaction) => (
							<TransactionCard key={transaction.id} transaction={transaction} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};
export default Ledger;
