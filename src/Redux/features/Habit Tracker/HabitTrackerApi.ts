import { apiSlice } from "../../api/apiSlice";

export const habitTrackerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Add a new habit
    addHabit: builder.mutation({
      query: (data) => ({
        url: "/addHabit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // --- Delete a habit
    deleteHabit: builder.mutation({
      query: ({ habitId, email }) => ({
        url: "/deleteHabit",
        method: "POST",
        body: { habitId, email },
      }),
      invalidatesTags: ["user"],
    }),

    // --- Toggle habit completion for a date
    toggleHabit: builder.mutation({
      query: ({ email, habitId, date, completed }) => ({
        url: "/toggleHabit",
        method: "POST",
        body: { email, habitId, date, completed },
      }),
      invalidatesTags: ["user"],
    }),

    // --- Fetch habits and history
    getHabits: builder.query({
      query: (email) => ({
        url: `/getHabits?email=${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useAddHabitMutation,
  useDeleteHabitMutation,
  useToggleHabitMutation,
  useGetHabitsQuery,
} = habitTrackerApi;
