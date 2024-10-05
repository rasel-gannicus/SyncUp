import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // --- getting user from db
    getUser: builder.query({
      query: (uid) => `/users?uid=${uid}`, // Directly construct the URL with query parameter
        providesTags: ["user"],
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

export const {useAddUserToDbMutation, useGetUserQuery} = userApi;
