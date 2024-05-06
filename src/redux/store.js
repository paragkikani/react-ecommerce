import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productListSlice";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
