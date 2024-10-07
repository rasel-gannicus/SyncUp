import { createSlice } from '@reduxjs/toolkit';
import { userApi } from "./userApi";

// Define the initial state
const initialState : any = {
  users: [],
  status: 'idle',
  error: null,
};

// Define the slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getUser query
      .addMatcher(userApi.endpoints.getUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        state.users = [payload]; // assuming getUser returns a single user
        state.status = 'succeeded';
      })
      .addMatcher(userApi.endpoints.getUser.matchRejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      // Handle addUserToDb mutation
      .addMatcher(userApi.endpoints.addUserToDb.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(userApi.endpoints.addUserToDb.matchFulfilled, (state, { payload }) => {
        state.users.push(payload);
        state.status = 'succeeded';
      })
      .addMatcher(userApi.endpoints.addUserToDb.matchRejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

// Export the reducer
export default userSlice.reducer;

// No need to export actions as we're not defining any in this slice

// Export selectors
export const selectAllUsers = (state : any) => state.users.users;
export const selectUserStatus = (state : any) => state.users.status;
export const selectUserError = (state : any) => state.users.error;

// No need to export the hooks, as they should be imported from userApi.ts