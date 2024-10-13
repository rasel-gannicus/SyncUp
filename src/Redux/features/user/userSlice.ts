import { createSlice } from "@reduxjs/toolkit";

/**
 * The initial state of the user reducer, with strongly typed properties.
 */
export interface UserState {
  user: any ;
  userLoading: boolean;
  error: string | null;
}

/**
 * The initial state of the user reducer.
 */
const initialState: UserState = {
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
      state.userLoading = action.payload;
    },
  },
});

// Export the reducer
export default userSlice.reducer;

// Export the actions
export const { addUserToRedux, addUserLoading } = userSlice.actions;
