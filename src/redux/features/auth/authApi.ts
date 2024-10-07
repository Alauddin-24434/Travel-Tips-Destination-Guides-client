import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    // Mutation to update user role
    updateUserRole: builder.mutation({
      query: ({ userId, newRole }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role: newRole }, // Send the new role in the body
      }),
      invalidatesTags: ["Auth"], // Invalidate 'Auth' data to trigger re-fetch
    }),
    updateUserThroughUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/throughUser/${userId}`,
        method: "PUT",
        body: data, // Send the new role in the body
      }),
      invalidatesTags: ["Auth"], // Invalidate 'Auth' data to trigger re-fetch
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserThroughUserMutation,
  useUpdateUserRoleMutation, // Export the new hook for updating user role
} = authApi;