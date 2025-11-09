import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Favorites from '@/features/favorites';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { restoreAuth } from '@/features/loginForm/usersSlise';
import { store } from '@/store/index.js';
import { fetchCart } from '@/features/cart/cartSlice';
import CardList from '@/pages/cardList';
import Cart from '@/features/cart';
import AdminPage from '@/pages/admin/adminPage';
import CardInfo from '@/pages/cardInfo';
import NotFound from '@/pages/notFoundPage';

import styles from './App.module.scss';
import AppInfo from './pages/appInfo';

function App(): React.ReactElement {
  const dispatch = useAppDispatch();

  store.dispatch(restoreAuth());

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuth, role } = useAppSelector(state => state.users);
    if (!isAuth || role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div className={styles.MainContainer}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CardList />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />
          <Route path="card/:id" element={<CardInfo />} />
          <Route path="appinfo" element={<AppInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
