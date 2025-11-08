import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';

export const productsApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<any[], string>({
      query: params => `products/?${params}`,
    }),
    toggleLike: builder.mutation<any, { id: string; like: boolean }>({
      query: ({ id, like }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: { like },
      }),
    }),
    createProduct: builder.mutation<any, any>({
      query: product => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: id => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useToggleLikeMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;
