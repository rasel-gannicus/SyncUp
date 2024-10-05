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
      invalidatesTags: ["user"],
    }),

    // --- delete a note or making isDelete property true
    deleteNote: builder.mutation({
      query: (data) => ({
        url: "/deleteNote",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useAddNoteMutation, useDeleteNoteMutation } = noteApi;
