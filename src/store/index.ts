import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import usersReducer from '@/features//loginForm/usersSlise';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import { brandsApi } from './brandsAPI';
import { commentsApi } from './commentsApi';
import { productCardApi } from './productCardApi';
import { productsApi } from './productApi';
import { usersApi } from './usersApi';
import { cartApi } from './cartApi';
import { favoritesApi } from './favoritesApi';
import { ratingsApi } from './ratingsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    users: usersReducer,
    favorites: favoritesReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [productCardApi.reducerPath]: productCardApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [ratingsApi.reducerPath]: ratingsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      brandsApi.middleware,
      commentsApi.middleware,
      productCardApi.middleware,
      productsApi.middleware,
      usersApi.middleware,
      cartApi.middleware,
      favoritesApi.middleware,
      ratingsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
