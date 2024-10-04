import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const {useAddUserToDbMutation} = userApi;
