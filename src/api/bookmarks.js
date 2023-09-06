import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from '../helpers/baseQuery';
import {stringify} from "qs";

const CACHE_TAG = 'bookmarks';
export const bookmarksApi = createApi({
    reducerPath: CACHE_TAG,
    baseQuery,
    endpoints: (builder) => ({
        getBookmarks: builder.query({
            query: (page = 1) => ({url: `api/bookmarks?page=${page}`}),
            providesTags: (result, error, data) => [`${CACHE_TAG}-${data}`, CACHE_TAG]
        }),
        getBookmark: builder.query({
            query: (id) => ({url: `api/bookmarks/${id}`}),
            providesTags: (result, error, data) => [{type: CACHE_TAG, id: data}, CACHE_TAG]
        }),
        createBookmark: builder.mutation({
            query: (values) => ({
                url: 'api/bookmarks',
                method: 'POST',
                body: values
            }),
            invalidatesTags: [CACHE_TAG]
        }),
        updateBookmark: builder.mutation({
            query: (bookmark) => ({
                url: `api/bookmarks/${bookmark.id}`,
                method: "PUT",
                body: bookmark
            }),
            invalidatesTags: [CACHE_TAG]
        }),
        updateBookmarkOrders: builder.mutation({
            query: (rowOrders) => ({
                url: `api/bookmarks/orders`,
                method: "PUT",
                body: rowOrders
            }),
            invalidatesTags: [CACHE_TAG]
        }),
        deleteBookmarks: builder.mutation({
            query: ({ids}) => ({
                url: `api/bookmarks/batch`,
                method: "DELETE",
                params: stringify({ids})
            }),
            invalidatesTags: [CACHE_TAG]
        }),
        deleteBookmark: builder.mutation({
            query: (bookmark) => ({
                url: `api/bookmarks/${bookmark.id}`,
                method: "DELETE"
            }),
            invalidatesTags: [CACHE_TAG]
        })
    })
});

export const {
    useGetBookmarksQuery,
    useGetBookmarkQuery,
    useCreateBookmarkMutation,
    useUpdateBookmarkMutation,
    useUpdateBookmarkOrdersMutation,
    useDeleteBookmarksMutation,
    useDeleteBookmarkMutation,
} = bookmarksApi;
