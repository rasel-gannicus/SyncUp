import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userApi } from "../features/user/userApi";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleWares) =>
    getDefaultMiddleWares().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
