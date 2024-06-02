import HomeCards from '../components/HomeCards';
import Ledger from '../components/Ledger.tsx';
import ViewAllTransactionsButton from '../components/ViewAllTransactionsButton.tsx';

const HomePage = () => {
	return (
		<>
			<HomeCards />
			<Ledger isHome={true} />
			<ViewAllTransactionsButton />
		</>
	);
};

export default HomePage;
