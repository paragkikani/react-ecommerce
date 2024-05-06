import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, updateUser } from "./authAPI";

const initialState = {
  loginUser: null,
  status: "idle",
  loginError: null,
};

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (user) => {
    const responce = await createUser(user);
    return responce.data;
  },
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (update) => {
    const responce = await updateUser(update);
    return responce.data;
  },
);

export const checkUserAsync = createAsyncThunk(
  "users/checkUser",
  async (user) => {
    const responce = await checkUser(user);
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
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loginUser = action.payload[0];
      })
      .addCase(checkUserAsync.rejected, (state, error) => {
        state.status = "idle";
        state.loginError = error.error.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //console.log("state: ", state.loginUser, "update: ", action.payload);
        state.loginUser = action.payload;
      });
  },
});

export const selectUser = (state) => state.auth.loginUser;
export const selectError = (state) => state.auth.loginError;

export default authSlice.reducer;
