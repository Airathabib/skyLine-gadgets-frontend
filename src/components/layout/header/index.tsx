import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { debounce } from 'lodash';
import { Drawer, Flex, Input, Form, Select, Button } from 'antd';
import { CardContext } from '@/context/Context';
import InputSearch from '@/components/ui/inputSearch';
import HeaderComponent from './HeaderComponent';
import { CardContextType } from '@/shared/types/interface';
import { useGetBrandsQuery } from '@/store/brandsAPI';

import styles from './index.module.scss';

const Header: React.FC = () => {
  const { data, error, isLoading } = useGetBrandsQuery();
  const [form] = Form.useForm();
  const {
    handleChangeFilters,
    openNav,
    category,
    resetCategory,
    handleCloseNav,
    validateNumberInput,
    searchParams,
  } = useContext(CardContext) as CardContextType;

  const setActiveClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? styles.FavoriteLinkActive : styles.FavoriteLink;

  const initialValues = {
    brand: searchParams.get('brand') || undefined,
    price_gte: searchParams.get('price_gte') || '',
    price_lte: searchParams.get('price_lte') || '',
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [searchParams, form]);

  const resetFilters = () => {
    resetCategory();
    form.setFieldsValue({ brand: undefined });
    form.resetFields();
  };

  const debouncedHandlerPrice = debounce(
    (key: string, value: string | null) => handleChangeFilters(key, value),
    100
  ) as (key: string, value: string | null) => void;

  const options = data?.map(brand => ({ label: brand, value: brand })) || [];

  const hasFilters =
    searchParams.get('category') ||
    searchParams.get('brand') ||
    searchParams.get('price_gte') ||
    searchParams.get('price_lte') ||
    searchParams.get('q');

  return (
    <header className={styles.Header}>
      <HeaderComponent />

      <div className={styles.HeaderContainer}>
        <Drawer placement="left" open={openNav} onClose={handleCloseNav}>
          <Form form={form} layout="vertical" initialValues={initialValues}>
            <ul className={styles.HeaderNavbar}>
              <li
                onClick={() => handleChangeFilters('category', 'phone')}
                className={category === 'phone' ? styles.active : ''}
              >
                Смартфоны
              </li>
              <li
                onClick={() => handleChangeFilters('category', 'smartwatch')}
                className={category === 'smartwatch' ? styles.active : ''}
              >
                Смартчасы
              </li>
              <li
                onClick={() => handleChangeFilters('category', 'airpod')}
                className={category === 'airpod' ? styles.active : ''}
              >
                Наушники
              </li>
            </ul>

            <div className={styles.HeaderWrapper}>
              <div className={styles.HeaderFilter}>
                <h3 className={styles.HeaderFilterTitle}>Бренд</h3>
                <Form.Item name="brand" layout="vertical">
                  {error && <div className={styles.error}>Ошибка загрузки брендов</div>}
                  <Select
                    onSelect={value => handleChangeFilters('brand', value)}
                    loading={isLoading}
                    placeholder="Выберите бренд"
                    options={options}
                  ></Select>
                </Form.Item>
              </div>

              <div className={styles.HeaderFilter}>
                <h3 className={styles.HeaderFilterTitle}>Цена</h3>
                <Flex>
                  <div className={styles.HeaderFilterPrice}>
                    <Form.Item name="price_gte">
                      <Input
                        type="text"
                        allowClear
                        onChange={e => debouncedHandlerPrice('price_gte', e.target.value)}
                        onKeyDown={validateNumberInput}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="price_lte">
                      <Input
                        type="text"
                        allowClear
                        onChange={e => debouncedHandlerPrice('price_lte', e.target.value)}
                        onKeyDown={validateNumberInput}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </div>
            </div>
          </Form>

          {hasFilters && (
            <div className={styles.resetBtnWrapper}>
              <Button type="default" block onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          )}
        </Drawer>

        <div className={styles.HeaderLinks}>
          <NavLink className={setActiveClass} onClick={resetCategory} to="/">
            {' '}
            Главная
          </NavLink>
          <NavLink className={setActiveClass} onClick={resetCategory} to="/favorites">
            {' '}
            Избранное
          </NavLink>
          <NavLink className={setActiveClass} onClick={resetCategory} to="/cart">
            {' '}
            Корзина
          </NavLink>
        </div>

        <div className={styles.HeaderSearch}>
          <InputSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
