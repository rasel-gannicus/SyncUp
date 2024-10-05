import { apiSlice } from "../../api/apiSlice";

export const noteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- adding new user to db after registration or login with firebase
    addNote: builder.mutation({
      query: (data) => ({
        url: "/addNote",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddNoteMutation } = noteApi;
