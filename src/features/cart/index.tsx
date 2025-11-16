import React, { useContext } from 'react';
import { Alert, Spin } from 'antd';
import useCartList from '@/hooks/useCartList';
import useFilteredList from '@/hooks/useFilteredList';
import { CardContext } from '@/context/Context';
import { useAppSelector } from '@/hooks/reduxHooks';
import { CardContextType } from '@/shared/types/interface';
import Sort from '@/components/ui/sort';
import LeftBtn from '@/components/ui/buttons/LeftBtn';
import Pagination from '@/components/ui/pagination';
import RightBtn from '@/components/ui/buttons/RightBtn';
import styles from './index.module.scss';
import Card from '../card';

const Cart: React.FC = () => {
  const { loading, cart } = useCartList();
  const context = useContext(CardContext) as CardContextType;
  const { data: sortedCart } = useFilteredList(cart);
  const { currentPage, cardsPerPage, paginate, firstCardIndex, lastCardIndex } = context;

  const productCount = cart.reduce((acc, product) => acc + product.cart_quantity, 0);
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.cart_quantity, 0);
  const { isAuth } = useAppSelector(state => state.users);

  // Pagination
  const currentCards = sortedCart.slice(firstCardIndex, lastCardIndex);
  const totalPages = Math.ceil(cart.length / cardsPerPage);

  if (loading) {
    return <Spin tip="Загрузка корзины..." fullscreen />;
  }

  if (!isAuth) {
    return (
      <div className={styles.Cart}>
        <h2 className={styles.CartTitle}>Корзина</h2>
        <Alert message="Войдите в аккаунт, чтобы видеть корзину" type="info" showIcon />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>В корзине нет товаров</h3>
      </div>
    );
  }

  return (
    <div className={styles.Cart}>
      <div className={styles.CartHeader}>
        <h2 className={styles.CartTitle}>Товаров в корзине: {productCount}</h2>
        <h2 className={styles.CartTitle}>На сумму: {totalPrice} ₽</h2>
      </div>
      <div className={styles.CartWrapper}>
        {sortedCart.length > 0 && <Sort />}
        {currentCards.map(item => (
          <Card
            key={item.id}
            {...item}
            quantity={item.stock_quantity}
            stockQuantity={item.stock_quantity}
            cartQuantity={item.cart_quantity}
            isInCart={true}
            isInCartPage={true}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.PaginationWrapper}>
          <button
            className={styles.PaginationBtn}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <LeftBtn />
          </button>

          <Pagination totalCards={cart.length} />

          <button
            className={styles.PaginationBtn}
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            <RightBtn />
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
