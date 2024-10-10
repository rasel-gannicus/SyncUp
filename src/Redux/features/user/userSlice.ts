import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState: any = {
  user: null,
  userLoading: false,
  error: null,
};

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToRedux(state, action) {
      state.user = action.payload; // Store the single user
    },
    addUserLoading(state, action) {
      state.status = action.payload;
    },
  },
});

// Export the reducer
export default userSlice.reducer;

// Export the actions
export const { addUserToRedux, addUserLoading } = userSlice.actions;
