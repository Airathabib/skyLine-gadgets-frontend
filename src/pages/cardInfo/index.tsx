import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useGetProductCardQuery } from '@/store/productCardApi';
import useProductCardActions from '@/hooks/useProductCardActions';
import StarRating from '@/components/ui/starRating';
import QuantityControllers from '@/components/ui/quantityControllers';
import Comments from '@/features/comments';
import Icon from '@/components/ui/icon/Icon';
import styles from './index.module.scss';

const CardInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) return <div>Товар не найден</div>;

  const { data: product, error, isLoading } = useGetProductCardQuery(id);

  const {
    isAuth,
    isLiked,
    isInCart,
    cart_quantity,
    ratingData,
    handleLikeToggle,
    handleQuantityPlus,
    handleQuantityMinus,
    handleDeleteFromCart,
    handleRate,
  } = useProductCardActions(id!, product?.quantity || 0);

  const returnToCard = () => navigate(-1);

  if (isLoading) return <Spin tip="Загрузка..." fullscreen />;
  if (error) return <div className={styles.error}>Ошибка загрузки товара</div>;
  if (!product) return <div className={styles.error}>Товар не найден</div>;

  return (
    <div className={styles.CardInfo}>
      <header className={styles.CardInfoHeader}>
        <button className={styles.CardInfoBack} onClick={returnToCard}>
          <Icon name="arrowBack" size={24} />
          <span>Назад </span>
        </button>
        <h1 className={styles.CardInfoTitle}>Информация о товаре</h1>
      </header>

      <div className={styles.CardInfoWrapper}>
        <h3 className={styles.CardInfoTitle}>{product.title}</h3>
        <p className={styles.CardInfoDescription}>{product.description}</p>
        <div className={styles.CardInfoBlock}>
          <img className={styles.CardInfoImage} src={product.photo} alt="photo" />
          <div className={styles.CardInfoText}>
            <p className={styles.CardInfoAccum}>Аккумулятор: {product.accum}мА·ч</p>
            <p className={styles.CardInfoMemory}>Обьем памяти: {product.memory}ГБ</p>
            <div className={styles.CardInfoRating}>
              Рейтинг:{' '}
              <StarRating
                productId={product.id}
                average={ratingData?.average || 0}
                userRating={ratingData?.userRating}
                onRate={handleRate}
              />
            </div>
            <p
              className={
                product.quantity === 0 ? styles.CardInfoQuantityError : styles.CardInfoQuantity
              }
            >
              {product.quantity === 0 ? 'Нет в наличии' : `В наличии: ${product.quantity}`}
            </p>
            <p className={styles.CardInfoPrice}>Цена: {product.price}₽</p>
          </div>
        </div>

        <div className={styles.CardInfoBtnWrapper}>
          {/* Кнопка "В избранное" */}
          {isAuth ? (
            <button
              className={isLiked ? styles.CardInfoBtnEditActive : styles.CardInfoBtnEdit}
              onClick={handleLikeToggle}
              role="button"
              tabIndex={0}
            >
              <Icon name="cardHeart" size={24} />
              <span>{isLiked ? 'В избранном' : 'Добавить в избранное'}</span>
            </button>
          ) : (
            <button
              className={styles.CardInfoBtnEdit}
              disabled
              title="Войдите для добавления товара в избранное"
            >
              <Icon name="cardHeart" size={24} />
              <span>Войдите, чтобы добавить</span>
            </button>
          )}

          {/* Кнопка "В корзину" */}
          {isInCart ? (
            <QuantityControllers
              quantity={cart_quantity}
              stockQuantity={product.quantity}
              onIncrease={handleQuantityPlus}
              onDecrease={handleQuantityMinus}
              onDelete={handleDeleteFromCart}
            />
          ) : isAuth ? (
            <button
              className={styles.CardInfoAddToCart}
              disabled={product.quantity === 0}
              onClick={handleQuantityPlus}
              role="button"
              tabIndex={0}
            >
              <span>{product.quantity === 0 ? 'Нет в наличии' : 'Добавить в корзину'}</span>
              <Icon name="cardCart" size={24} />
            </button>
          ) : (
            <button
              className={styles.CardInfoAddToCart}
              disabled
              title="Войдите для добавления товара в корзину"
            >
              <span>Войдите, чтобы добавить</span>
              <Icon name="cardCart" size={24} />
            </button>
          )}
        </div>
      </div>
      <Comments productId={id} />
    </div>
  );
};

export default CardInfo;
