import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import ProductsManagement from './components/ProductsManagement';
import BrandsManagement from './components/BrandsManagement';
import UsersManagement from './components/UsersManagement';
import styles from './index.module.scss';
const { Title } = Typography;

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'brands' | 'users'>('products');

  // Общий refetch для синхронизации табов
  const handleRefetch = () => {
    // В будущем можно добавить общее обновление, если нужно
  };

  return (
    <div className={styles.Admin}>
      <Title className={styles.AdminTitle} level={2}>
        Админка
      </Title>

      <div className={styles.AdminWrapper}>
        <Button
          type={activeTab === 'products' ? 'primary' : 'default'}
          onClick={() => setActiveTab('products')}
          style={{ marginRight: 8 }}
        >
          Товары
        </Button>
        <Button
          type={activeTab === 'brands' ? 'primary' : 'default'}
          onClick={() => setActiveTab('brands')}
          style={{ marginRight: 8 }}
        >
          Бренды
        </Button>
        <Button
          type={activeTab === 'users' ? 'primary' : 'default'}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </Button>
      </div>

      {activeTab === 'products' && <ProductsManagement onRefetch={handleRefetch} />}
      {activeTab === 'brands' && <BrandsManagement onRefetch={handleRefetch} />}
      {activeTab === 'users' && <UsersManagement onRefetch={handleRefetch} />}
    </div>
  );
};

export default Admin;
