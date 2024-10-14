import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { IPost } from "@/types/post.type";


const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: ({ searchTerm = "", category = "" }) => {
        const params: Record<string, string> = {};

        if (searchTerm) {
          params.searchTerm = searchTerm;
        }

        if (category) {
          params.category = category;
        }

        const queryString =
          Object.keys(params).length > 0
            ? new URLSearchParams(params).toString()
            : "";

        return {
          url: queryString ? `/post/get-all?${queryString}` : "/post/get-all",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IPost[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["posts"],
    }),

    getCurrentUserPost: builder.query({
      query: () => {
        return {
          url: "/post/get-current-user-post",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IPost[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["posts"],
    }),
    getSinglePost: builder.query({
      query: (params) => {
        return {
          url: `/post/get-single/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IPost>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["posts"],
    }),
    handleVoting: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/voting/${payload?.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["posts"],
    }),
    addPost: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/create-post`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (payload) => {
        return {
          url: `/post/${payload.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useHandleVotingMutation,
  useAddPostMutation,
  useGetCurrentUserPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
