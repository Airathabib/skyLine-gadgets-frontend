import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
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
  tagTypes: ['Brand'],
  endpoints: builder => ({
    getBrands: builder.query<string[], void>({
      query: () => 'brands',
      providesTags: ['Brand'],
    }),
    addBrand: builder.mutation<void, string>({
      query: name => ({
        url: 'brands',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Brand'],
    }),
    deleteBrand: builder.mutation<void, string>({
      query: name => ({
        url: `brands/${name}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brand'],
    }),
  }),
});

export const { useGetBrandsQuery, useAddBrandMutation, useDeleteBrandMutation } = brandsApi;
