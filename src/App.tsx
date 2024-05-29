import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import LedgerPage from './pages/LedgerPage.tsx';
import UploadPage from './pages/UploadPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<MainLayout />}>
			<Route index element={<HomePage />} />
			<Route path='/ledger' element={<LedgerPage />} />
			<Route path='/upload' element={<UploadPage />} />
			//Catch all
			<Route path='*' element={<NotFoundPage />} />
		</Route>,
	),
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
