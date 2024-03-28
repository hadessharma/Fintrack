import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logOut: (state, action) => {
      state.loggedInUser = {};
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
