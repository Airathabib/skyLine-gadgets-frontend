// shared/store/commentsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';
import { Comment, CreateCommentDto, UpdateCommentDto } from '@/shared/types/interface';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL, // = http://localhost:3001/api
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Comment'],
  endpoints: builder => ({
    // GET /api/comments?productId=123
    getComments: builder.query<Comment[], string>({
      query: productId => `comments?productId=${productId}`,
      providesTags: [{ type: 'Comment', id: 'LIST' }],
    }),

    // POST /api/comments
    addComments: builder.mutation<Comment, CreateCommentDto>({
      query: comment => ({
        url: 'comments',
        method: 'POST',
        body: comment, // ← всё в camelCase
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),

    // PATCH /api/comments/123
    updateComment: builder.mutation<Comment, { id: number } & UpdateCommentDto>({
      query: ({ id, userComment }) => ({
        url: `comments/${id}`,
        method: 'PATCH',
        body: { userComment }, // ← camelCase!
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),

    // DELETE /api/comments/123
    deleteComment: builder.mutation<void, number>({
      query: id => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentsMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
