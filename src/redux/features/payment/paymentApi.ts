import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (payload) => {
        return {
          url: `/payment/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["payment"],
    }),
    getAllPayment: builder.query({
      query: (args) => {
        return {
          url: `/payment/get-all`,
          method: "GET",
          body: args,
        };
      },
      providesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentMutation, useGetAllPaymentQuery } = paymentApi;
