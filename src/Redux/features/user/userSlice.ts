import { createSlice } from "@reduxjs/toolkit";


export interface UserState {
  user: any ;
  userLoading: boolean;
  error: string | null;
}


const initialState: UserState = {
  user: null,
  userLoading: false,
  error: null,
};


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


export default userSlice.reducer;


export const { addUserToRedux, addUserLoading } = userSlice.actions;
