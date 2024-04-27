import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productListSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
