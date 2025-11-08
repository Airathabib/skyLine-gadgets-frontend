import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';
import { Product } from '@/shared/types/interface';

export const productCardApi = createApi({
  reducerPath: 'productCardApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['ProductCard'],
  endpoints: builder => ({
    getProductCard: builder.query<Product, string>({
      query: id => `products/${id}`,
      providesTags: [{ type: 'ProductCard', id: 'Card' }],
    }),
  }),
});

export const { useGetProductCardQuery } = productCardApi;
