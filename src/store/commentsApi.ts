import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '@/shared/API/api';
import { Comments, CreateCommentData } from '@/shared/types/interface';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
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
  tagTypes: ['Comment'],
  endpoints: builder => ({
    getComments: builder.query<Comments[], string>({
      query: id => `comments?productId=${id}`,
      providesTags: [{ type: 'Comment', id: 'COMMENT' }],
    }),

    addComments: builder.mutation<Comments, CreateCommentData>({
      query: comment => ({
        url: 'comments',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: [{ type: 'Comment', id: 'COMMENT' }],
    }),
    updateComment: builder.mutation<Comment, { id: number; userComment: string }>({
      query: ({ id, userComment }) => ({
        url: `comments/${id}`,
        method: 'PATCH',
        body: { userComment },
      }),
      invalidatesTags: [{ type: 'Comment', id: 'COMMENT' }],
    }),

    deleteComment: builder.mutation<void, number>({
      query: id => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Comment', id: 'COMMENT' }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentsMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
