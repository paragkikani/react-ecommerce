import { placeOrder } from "./orderAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  status: "idle",
  currentOrder: null,
};

export const placeOrderAsync = createAsyncThunk(
  "order/placeOrder",
  async (order) => {
    const responce = await placeOrder(order);
    return responce.data;
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
