import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchAllFilterProducts,
  fetchAllBrands,
  fetchCategory,
  fetchSelectedProducts,
  updateProduct,
} from "./ProductAPI";

const initialState = {
  products: [],
  brands: [],
  category: [],
  status: "",
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const responce = await fetchAllProducts();
    return responce.data;
  },
);
export const fetchSelectedProductsAsync = createAsyncThunk(
  "products/fetchSelectedProducts",
  async (id) => {
    const responce = await fetchSelectedProducts(id);
    return responce.data;
  },
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "products/fetchAllBrands",
  async () => {
    const responce = await fetchAllBrands();
    return responce.data;
  },
);
export const fetchCategoryAsync = createAsyncThunk(
  "products/fetchCategory",
  async () => {
    const responce = await fetchCategory();
    return responce.data;
  },
);

export const fetchAllFilterProductsAsync = createAsyncThunk(
  "products/fetchAllFilterProducts",
  async ({ filter, sort, page }) => {
    const responce = await fetchAllFilterProducts(filter, sort, page);
    return { product: responce.data.data, totalItems: responce.data.items };
  },
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async (update) => {
    const responce = await updateProduct(update);
    return responce.data;
  },
);

export const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.counter++;
    // },
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
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, actions) => {
        state.status = "idle";
        state.brands = actions.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, actions) => {
        state.status = "idle";
        state.category = actions.payload;
      })
      .addCase(fetchSelectedProductsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSelectedProductsAsync.fulfilled, (state, actions) => {
        state.status = "idle";
        state.selectedProduct = actions.payload;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProductAsync.fulfilled, (state, actions) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (x) => x.id === actions.payload.id,
        );
        console.log("action:", actions.payload);
        state.products.splice(index, 1, actions.payload);
        // state.products[index] = actions.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products.product;
export const totalItems = (state) => state.product.products.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
export const selectProduct = (state) => state.product.selectedProduct;

export const { increment } = productListSlice.actions;
export default productListSlice.reducer;
