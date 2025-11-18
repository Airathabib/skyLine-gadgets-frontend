import React, { memo } from 'react';
import { Tooltip } from 'antd';
import useProductCardActions from '@/hooks/useProductCardActions';
import { ProductBase } from '@/shared/types/interface';
import StarRating from '@/components/ui/starRating';
import QuantityControllers from '@/components/ui/quantityControllers';
import Icon from '@/components/ui/icon/Icon';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

interface CardProps extends ProductBase {
  quantity?: number;
  stockQuantity?: number;
  cartQuantity?: number;
  isInCartPage?: boolean;
  isInCart?: boolean;
}

const Card: React.FC<CardProps> = memo(
  ({
    id,
    title,
    description,
    price,
    accum,
    memory,
    photo,
    brand,
    quantity,
    cartQuantity,
    stockQuantity,
    isInCartPage,
  }) => {
    const stockQty = stockQuantity ?? quantity ?? 0;
    const {
      isAuth,
      isLiked,
      isInCart: isInCartFromHook,
      cart_quantity: cartQtyFromHook,
      ratingData,
      handleLikeToggle,
      handleAddToCart,
      handleQuantityPlus,
      handleQuantityMinus,
      handleDeleteFromCart,
      handleRate,
    } = useProductCardActions(id, stockQty);

    const actualCartQuantity = isInCartPage ? cartQuantity ?? 0 : cartQtyFromHook;
    const isInCart = isInCartPage ? true : isInCartFromHook;
    const navigate = useNavigate();

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
          <StarRating
            productId={id}
            average={ratingData?.average || 0}
            userRating={ratingData?.userRating}
            onRate={handleRate}
          />
        </span>
        <div className={styles.CardQuantityWrapper}>
          <span className={stockQuantity === 0 ? styles.CardQuantityError : styles.CardQuantity}>
            {quantity === 0 ? 'Нет в наличии' : `В наличии: ${stockQuantity}`}{' '}
          </span>

          {isInCart && (
            <QuantityControllers
              quantity={actualCartQuantity}
              stockQuantity={stockQty}
              onIncrease={handleQuantityPlus}
              onDecrease={handleQuantityMinus}
              onDelete={handleDeleteFromCart}
            />
          )}
        </div>
        <img className={styles.CardImage} src={photo} alt="photo" />

        <div className={styles.CardButtonWrapper}>
          <Tooltip title={!isAuth ? 'Войдите для добавления товара в избранное' : ''}>
            <button
              className={
                isLiked ? `${styles.CardBtnEdit} ${styles.CardBtnEditActive}` : styles.CardBtnEdit
              }
              onClick={handleLikeToggle}
              aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
              type="button"
            >
              <Icon name="cardHeart" size={24} />
            </button>
          </Tooltip>

          <Tooltip title={!isAuth ? 'Войдите для добавления товара в корзину' : ''}>
            <button
              className={styles.CardBtnAddToCart}
              onClick={handleAddToCart}
              disabled={stockQty <= 0 || isInCart}
              type="button"
            >
              <span>
                {!isAuth
                  ? 'Войдите, чтобы добавить'
                  : quantity === 0
                  ? 'Нет в наличии'
                  : isInCart
                  ? 'В корзине'
                  : 'Добавить в корзину'}
              </span>
              <Icon name="cardCart" size={24} />
            </button>
          </Tooltip>
        </div>

        <button
          type="button"
          className={styles.CardBtnMore}
          onClick={() => navigate(`/card/${id}`)}
          aria-label={`Подробнее о товаре ${title}`}
        >
          Показать подробнее
        </button>
      </div>
    );
  }
);

export default Card;
