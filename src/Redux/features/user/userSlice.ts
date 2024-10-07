import { createSlice } from '@reduxjs/toolkit';
import { userApi } from "./userApi";

// Define the initial state
const initialState : any = {
  user: null,
  status: 'idle',
  error: null,
};

// Define the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getUser query
      .addMatcher(userApi.endpoints.getUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        state.user = payload; // Store the single user
        state.status = 'succeeded';
      })
      .addMatcher(userApi.endpoints.getUser.matchRejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      
  },
});

// Export the reducer
export default userSlice.reducer;

// Export selectors
export const selectUser = (state : any) => state.user.user;
export const selectUserStatus = (state : any) => state.user.status;
export const selectUserError = (state : any) => state.user.error;