import { Outlet } from 'react-router-dom';

import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import useScrollToTop from '../hooks/useScrollToTop';

const MainLayout = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

