import Header from '@/components/layout/header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/footer';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.LinkContainer}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
