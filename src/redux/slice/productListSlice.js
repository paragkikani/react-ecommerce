import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllFilterProducts } from "./ProductAPI";

const initialState = {
  products: [],
  status: "",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const responce = await fetchAllProducts();
    return responce.data;
  }
);

export const fetchAllFilterProductsAsync = createAsyncThunk(
  "products/fetchAllFilterProducts",
  async (filter) => {
    const responce = await fetchAllFilterProducts(filter);
    return responce.data;
  }
);

export const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, actions) => {
        state.status = "idle";
        state.products = actions.payload;
      })
      .addCase(fetchAllFilterProductsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllFilterProductsAsync.fulfilled, (state, actions) => {
        state.status = "idle";
        state.products = actions.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;

export const { increment } = productListSlice.actions;
export default productListSlice.reducer;
