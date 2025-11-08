import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spin } from 'antd';
import Logo from '@/assets/logo/logo.png';
import { CardContext } from '@/context/Context';
import useCartList from '@/hooks/useCartList';
import useFavoritesList from '@/hooks/useFavoriteList';
import useProductList from '@/hooks/useProductList';
import { CardContextType } from '@/shared/types/interface';
import { useAppSelector } from '@/hooks/reduxHooks';
import ModalWindow from '@/components/ui/modal';
import Icon from '@/components/ui/icon/Icon';
import styles from './index.module.scss';

const HeaderComponent: React.FC = () => {
  const { cart } = useCartList();
  const { favorites } = useFavoritesList();
  const { isAuth, role } = useAppSelector(state => state.users);
  const { isLoading, error } = useProductList();

  const { handleOpenNav, searchParams, setOpenModal } = useContext(CardContext) as CardContextType;

  const fiilters =
    searchParams.get('category') || searchParams.get('price_gte') || searchParams.get('price_lte');

  return (
    <Spin spinning={isLoading} size="large">
      <div className={styles.HeaderContainer}>
        {error && <div className={styles.Error}>{error}</div>}
        <div className={styles.LogoContainer}>
          <img className={`${styles.Logo} ${styles.OrderLogo}`} src={Logo} alt="logo" />
          <div className={`${styles.BtnWrapper} ${styles.OrderBurger}`}>
            {fiilters && <div className={styles.FilterMarker} />}
            <button className={styles.HeaderBtn} onClick={handleOpenNav}>
              {' '}
              <Icon name="burger" color="transparent" size={36} />{' '}
            </button>
          </div>
          <h1 className={`${styles.MainTitle} ${styles.OrderTitle}`}> SkyLine Gadgets</h1>
          <div className={`${styles.MainIcons} ${styles.OrderIcons}`}>
            <div className={styles.FavoriteProducts}>
              {favorites.length > 0 && (
                <span className={styles.FavoriteProductsMarker}>{favorites.length}</span>
              )}
              <Icon name="heart" color="transparent" size={32} />
            </div>

            <div className={styles.MainCart}>
              <Icon name="cart" color="transparent" size={32} />{' '}
              {cart.length > 0 && <span className={styles.MainCartCount}> {cart.length}</span>}
            </div>
            <div className={styles.LoginEnter}>
              <Button className={styles.LoginEnterBtn} onClick={() => setOpenModal(true)}>
                <Icon name="user" color="transparent" size={32} />
              </Button>
            </div>
            {isAuth && role === 'admin' && (
              <Button type="primary">
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
                  Админка
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <ModalWindow />
    </Spin>
  );
};

export default HeaderComponent;
