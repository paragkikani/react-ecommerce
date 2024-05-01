import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authAPI";

const initialState = {
  loginUser: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (user) => {
    const responce = await createUser(user);
    return responce.data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loginUser = action.payload;
        state.status = "idle";
      });
  },
});

export const selectUser = (state) => state.auth.loginUser;

export default authSlice.reducer;
