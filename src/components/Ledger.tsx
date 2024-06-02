import { useState, useEffect } from 'react';
import Transaction from './Transaction';
import Spinner from './Spinner';
import type DatabaseTransaction from '../classes/DatabaseTransaction';

const Ledger = ({ isHome = false }) => {
	const [transactions, setTransactions] = useState<DatabaseTransaction[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async () => {
			const apiUrl = isHome ? '/api/posts?_limit=6' : '/api/posts';
			try {
				const res = await fetch(apiUrl);
				const data = await res.json();
				setTransactions(data);
			} catch (error) {
				console.log('Error fetching data', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTransactions();
	}, [isHome]);

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
							<Transaction key={transaction.db_id} transaction={transaction} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};
export default Ledger;
