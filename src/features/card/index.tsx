import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';
import useProductCardActions from '@/hooks/useProductCardActions';
import { Product } from '@/shared/types/interface';
import StarRating from '@/components/ui/starRating';
import QuantityControllers from '@/components/ui/quantityControllers';
import Icon from '@/components/ui/icon/Icon';
import styles from './index.module.scss';

interface CardProps extends Product {
  id: string;
  isInCart?: boolean;
  cartQuantity: number;
  isInCartPage?: boolean;
  stockQuantity: number;
}

const Card: React.FC<CardProps> = memo(
  ({ id, title, description, price, accum, memory, photo, stockQuantity, brand }) => {
    const {
      isAuth,
      isLiked,
      isInCart,
      cartQuantity,
      ratingData,
      handleLikeToggle,
      handleAddToCart,
      handleQuantityPlus,
      handleQuantityMinus,
      handleDeleteFromCart,
      handleRate,
    } = useProductCardActions(id, stockQuantity);

    return (
      <div className={stockQuantity === 0 ? styles.CardError : styles.Card}>
        <h4 className={styles.CardTitle}>{title}</h4>
        <h3 className={styles.CardBrand}>Бренд: {brand}</h3>
        <p className={styles.CardDescr}> {description}</p>
        <p className={styles.CardDescr}>
          Цена: <span className={styles.CardPrice}>{price}₽</span>
        </p>
        <span className={styles.CardDate}>Аккумулятор: {accum}мА·ч</span>
        <span className={styles.CardTime}> Обьем памяти: {memory}ГБ</span>
        <span className={styles.CardRating}>
          {' '}
          Рейтинг:{' '}
          {
            <StarRating
              productId={id}
              average={ratingData?.average || 0}
              userRating={ratingData?.userRating}
              onRate={handleRate}
            />
          }
        </span>
        <div className={styles.CardQuantityWrapper}>
          <span className={stockQuantity === 0 ? styles.CardQuantityError : styles.CardQuantity}>
            {stockQuantity === 0 ? 'Нет в наличии' : `В наличии: ${stockQuantity}`}{' '}
          </span>

          {isInCart && (
            <QuantityControllers
              quantity={cartQuantity}
              stockQuantity={stockQuantity}
              onIncrease={handleQuantityPlus}
              onDecrease={handleQuantityMinus}
              onDelete={handleDeleteFromCart}
            />
          )}
        </div>
        <img className={styles.CardImage} src={photo} alt="photo" />

        <div className={styles.CardButtonWrapper}>
          <Tooltip title={!isAuth ? 'Войдите для добавления товара в избранное' : ''}>
            <div style={{ display: 'inline-block' }}>
              <button
                className={
                  isLiked ? `${styles.CardBtnEdit} ${styles.CardBtnEditActive}` : styles.CardBtnEdit
                }
                onClick={handleLikeToggle}
                aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                <Icon name="cardHeart" size={24} />
              </button>
            </div>
          </Tooltip>

          <Tooltip title={!isAuth ? 'Войдите для добавления товара в корзину' : ''}>
            <div style={{ display: 'inline-block' }}>
              <button
                className={styles.CardBtnAddToCart}
                onClick={handleAddToCart}
                disabled={stockQuantity <= 0 || isInCart}
              >
                <span>
                  {!isAuth
                    ? 'Войдите, чтобы добавить'
                    : stockQuantity === 0
                    ? 'Нет в наличии'
                    : isInCart
                    ? 'В корзине'
                    : 'Добавить в корзину'}
                </span>
                <Icon name="cardCart" size={24} />{' '}
              </button>
            </div>
          </Tooltip>
        </div>

        <NavLink to={`/card/${id}`} className={styles.CardBtnMore}>
          Показать подробнее
        </NavLink>
      </div>
    );
  }
);

export default Card;
