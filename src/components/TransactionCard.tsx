import type Transaction from "../classes/Transaction";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { memo, date, amount } = transaction;
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="grid grid-cols-4 items-center gap-6 p-4">
        <h3 className="text-xl font-bold col-span-2">{memo}</h3>
        <p className="text-indigo-500 text-right">{date}</p>
        <p className="text-right">{amount}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
