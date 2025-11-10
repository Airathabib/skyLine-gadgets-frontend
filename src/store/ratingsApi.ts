import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';

export const ratingsApi = createApi({
  reducerPath: 'ratingsApi',
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
  tagTypes: ['Rating'],
  endpoints: builder => ({
    getRating: builder.query({
      query: productId => `ratings/${productId}`,
      providesTags: productId => [{ type: 'Rating', id: productId }],
    }),
    setRating: builder.mutation({
      query: ({ productId, rating }) => ({
        url: 'ratings',
        method: 'POST',
        body: { productId, rating },
      }),
      invalidatesTags: ({ productId }) => [{ type: 'Rating', id: productId }],
    }),
  }),
});

export const { useGetRatingQuery, useSetRatingMutation } = ratingsApi;
