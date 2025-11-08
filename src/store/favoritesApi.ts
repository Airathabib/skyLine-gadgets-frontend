import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
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
  tagTypes: ['Favorite'],
  endpoints: builder => ({
    // Получить избранное текущего пользователя
    getFavorites: builder.query<any[], void>({
      query: () => '/favorites',
      providesTags: ['Favorite'],
    }),

    // Добавить в избранное
    addFavorite: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        url: '/favorites',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Favorite'],
    }),

    // Удалить из избранного
    removeFavorite: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        url: `/favorites/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } =
  favoritesApi;
