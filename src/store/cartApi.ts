import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<any[], void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<void, { productId: string; quantity?: number }>(
      {
        query: (body) => ({ url: '/cart', method: 'POST', body }),
        invalidatesTags: ['Cart'],
      }
    ),
    removeFromCart: builder.mutation<void, string>({
      query: (productId) => ({ url: `/cart/${productId}`, method: 'DELETE' }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
