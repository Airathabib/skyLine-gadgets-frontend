import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { useAppSelector } from '@/hooks/reduxHooks';
import Admin from './index';

const AdminPage = () => {
  const { isAuth, role } = useAppSelector(state => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || role !== 'admin') {
      message.error('Доступ запрещён');
      navigate('/');
    }
  }, [isAuth, role, navigate]);

  if (!isAuth || role !== 'admin') {
    return <Spin tip="Проверка доступа..." fullscreen />;
  }
  return <Admin />;
};

export default AdminPage;
