import { baseApi } from "../../api/baseApi";

export type TPosts = {
  userId: string;
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  images: string[];
  isDeleted: boolean;
  voteCount: number; // Track the net vote count
  userVote: number;  // +1 for upvote, -1 for downvote, 0 for no vote
};

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all posts
    getAllPosts: builder.query({
      query: () => ({
        url: `/posts`,
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),

    // Add a new post
    addPost: builder.mutation<void, Partial<TPosts>>({
      query: (newPost) => ({
        url: "/posts/create-posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    // Edit an existing post
    editPost: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/posts/${postId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),

    // Delete a post
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),

    // Vote on a post (upvote or downvote)
    votePost: builder.mutation({
      query: ({ postId,userId,  voteType }) => ({
        url: `/posts/${postId}/vote`,
        method: 'POST',
        body: { userId, voteType , },
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useVotePostMutation, // Export votePost mutation
} = postsApi;

