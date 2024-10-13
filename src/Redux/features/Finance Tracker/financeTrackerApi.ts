import { apiSlice } from "../../api/apiSlice"; // Assuming you have an API slice set up

export const financeTrackerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Add a new transaction
    addTransaction: builder.mutation({
      query: (data) => ({
        url: "/addTransaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"], // Assuming you have a 'transactions' cache tag
    }),

    // --- Edit a transaction
    editTransaction: builder.mutation({
      query: (data) => ({
        url: "/editTransaction",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // --- Delete a transaction
    deleteTransaction: builder.mutation({
      query: (data) => ({
        url: "/deleteTransaction",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
} = financeTrackerApi;