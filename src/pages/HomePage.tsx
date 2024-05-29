import HomeCards from '../components/HomeCards';
import Ledger from '../components/Ledger.tsx';
import ViewAllTransactionsButton from '../components/ViewAllTransactionsButton.tsx';
// import FileUploader from '../components/FileUploader.tsx';

const HomePage = () => {
	return (
		<>
			<HomeCards />
			{/* <FileUploader /> */}
			<Ledger isHome={true} />
			<ViewAllTransactionsButton />
		</>
	);
};

export default HomePage;
