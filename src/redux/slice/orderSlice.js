import { fetchOrderByUser, placeOrder } from "./orderAPI";
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
export const fetchOrderByUserAsync = createAsyncThunk(
  "order/fetchOrderByUser",
  async (id) => {
    const responce = await fetchOrderByUser(id);
    console.log(responce.data, " && ", id);
    return responce.data;
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      });
  },
});
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectUserOrders = (state) => state.order.order;

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
