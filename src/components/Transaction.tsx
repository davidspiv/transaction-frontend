import type DatabaseTransaction from '../classes/DatabaseTransaction';

const Transaction = ({ transaction }: { transaction: DatabaseTransaction }) => {
	const memo = transaction.memo;
	//format date
	const dateString = transaction.date_posted;
	const isoDate = `${dateString.slice(0, 4)}-${dateString.slice(
		4,
		6,
	)}-${dateString.slice(6, 8)}`;
	const date_posted = new Date(isoDate).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
	//format amount
	const USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	const amount = USDollar.format(transaction.amount);
	return (
		<div className='bg-white rounded-xl shadow-md relative'>
			<div className='grid grid-cols-4 items-center gap-6 p-4'>
				<h3 className='text-xl font-bold col-span-2'>{memo}</h3>
				<p className='text-indigo-500 text-right'>{date_posted}</p>
				<p className='text-center border-2 rounded-md border-green-500'>{amount}</p>
			</div>
		</div>
	);
};

export default Transaction;
