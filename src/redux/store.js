import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productListSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});
