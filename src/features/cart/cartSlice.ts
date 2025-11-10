import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { URL } from '@/shared/API/api';
import { Cart } from '@/shared/types/interface';

interface CartState {
  cart: Cart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  return {
    'Content-Type': 'application/json',
  };
};

export const fetchCart = createAsyncThunk<Cart[], void, { rejectValue: string }>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/cart`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Не удалось загрузить корзину');
      }

      return (await response.json()) as Cart[];
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка сети');
    }
  }
);

export const updateCartQuantity = createAsyncThunk<
  Cart[],
  { productId: string; delta: number },
  { rejectValue: string }
>('cart/updateQuantity', async ({ productId, delta }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, delta }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка обновления');
    }

    return (await response.json()) as Cart[];
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});

export const deleteCart = createAsyncThunk<void, string>(
  'cart/deleteCart',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Ошибка удаления');
      // После удаления — обновляем корзину
      dispatch(fetchCart());
    } catch (err) {
      return rejectWithValue('Не удалось удалить товар');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cart = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith('/rejected') && !action.type.includes('updateCartQuantity'),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
