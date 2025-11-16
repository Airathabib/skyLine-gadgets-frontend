import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchCart } from '@/features/cart/cartSlice';
import { CartItem as Cart } from '@/shared/types/interface';

const useCartList = (): {
  error: string | null;
  loading: boolean;
  cart: Cart[];
} => {
  const dispatch = useAppDispatch();
  const { error, loading, cart } = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return { error, loading, cart };
};

export default useCartList;
