import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { updateCartQuantity, deleteCart } from '@/features/cart/cartSlice';
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/store/favoritesApi';
import { useGetRatingQuery, useSetRatingMutation } from '@/store/ratingsApi';

const useProductCardActions = (productId: string, stockQuantity: number) => {
  const isAuth = useAppSelector(state => state.users.isAuth);
  const dispatch = useAppDispatch();

  const { data: favorites = [] } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const isLiked = favorites.some((item: any) => item.id === productId);

  const handleLikeToggle = () => {
    if (!isAuth) {
      message.warning('Пожалуйста, войдите, чтобы добавлять в избранное');
      return;
    }
    if (isLiked) {
      removeFavorite({ productId });
    } else {
      addFavorite({ productId });
    }
  };

  const cart = useAppSelector(state => state.cart.cart);
  const cartItem = cart.find(item => item.id === productId);
  const isInCart = !!cartItem;
  const cart_quantity = cartItem?.cart_quantity || 0;

  const handleAddToCart = () => {
    if (!isAuth) {
      message.warning('Пожалуйста, войдите в аккаунт, чтобы добавлять товары в корзину');
      return;
    }
    if (isInCart) {
      message.warning('Товар уже в корзине');
      return;
    }
    if (stockQuantity <= 0) {
      message.error('Товар закончился');
      return;
    }
    dispatch(updateCartQuantity({ productId, delta: 1 }))
      .unwrap()
      .catch(error => {
        let errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('Недостаточно товара')) {
          message.warning('Нельзя добавить больше, чем доступно на складе');
        } else if (errorMessage.includes('Товар закончился')) {
          message.error('Товар закончился');
        } else {
          message.error('Не удалось добавить в корзину');
        }
      });
  };

  const handleQuantityPlus = () => {
    dispatch(updateCartQuantity({ productId, delta: 1 }))
      .unwrap()
      .catch(error => {
        let errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('Недостаточно товара')) {
          message.warning('Нельзя добавить больше, чем доступно на складе');
        } else {
          message.error('Не удалось обновить корзину');
        }
      });
  };

  const handleQuantityMinus = () => {
    dispatch(updateCartQuantity({ productId, delta: -1 }));
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteCart(productId));
  };

  const { data: ratingData } = useGetRatingQuery(productId);
  const [setRating] = useSetRatingMutation();

  const handleRate = (rating: number) => {
    if (!isAuth) {
      message.warning('Пожалуйста, войдите, чтобы оценить товар');
      return;
    }
    setRating({ productId, rating });
  };

  return {
    isAuth,
    isLiked,
    isInCart,
    cart_quantity,
    ratingData,
    handleLikeToggle,
    handleAddToCart,
    handleQuantityPlus,
    handleQuantityMinus,
    handleDeleteFromCart,
    handleRate,
  };
};

export default useProductCardActions;
