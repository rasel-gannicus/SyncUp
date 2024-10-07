import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- getting user from db
    getUser: builder.query({
      query: (email) => {
        // Check if email is undefined, null, or an empty string
        if (!email || email.trim() === "") {
          // Return a dummy URL that won't be called
          return { url: "/dummy", skip: true };
        }
        // If email is valid, construct the URL with query parameter
        return { url: `/users?email=${encodeURIComponent(email)}` };
      },
      // providesTags & invalidatesTags are enough to handle caching
      providesTags: (result, error, email) =>
        result
          ? [{ type: "user", id: result.id }]
          : email && email.trim() !== ""
          ? ["user"]
          : [],
    }),

    // --- adding new user to db after registration or login with firebase
    addUserToDb: builder.mutation({
      query: (data) => ({
        url: "/addUserToDB",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddUserToDbMutation, useGetUserQuery } = userApi;
