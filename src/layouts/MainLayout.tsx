import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar.js';

const MainLayout = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default MainLayout;
