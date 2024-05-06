import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  removeFromCart,
  resetCart,
  updateCart,
} from "./carAPI";

const initialState = {
  cart: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const responce = await addToCart(item);
    return responce.data;
  },
);
export const getCartAsync = createAsyncThunk("cart/getCart", async (userId) => {
  const responce = await getCart(userId);
  return responce.data;
});

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    const responce = await removeFromCart(id);
    return responce.data;
  },
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async (id) => {
  const responce = await resetCart(id);
  return responce.data;
});

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (item) => {
    const responce = await updateCart(item);
    return responce.data;
  },
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart.push(action.payload);
      })
      .addCase(getCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cart.findIndex((x) => x.id === action.payload.id);
        state.cart.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = [];
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cart.findIndex((x) => x.id === action.payload.id);
        state.cart[index] = action.payload;
      });
  },
});

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
