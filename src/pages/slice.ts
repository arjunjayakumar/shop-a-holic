import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./api";
import { API_STATUS } from "../common/constants";
import { IProduct } from "../common/types";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [] as IProduct[],
    getProductsLoading: false,
    getProductsStatus: API_STATUS.IDLE,
    getProductsError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET PRODUCTS
     */
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productList = action.payload.products;
      state.getProductsLoading = false;
      state.getProductsStatus = API_STATUS.SUCCESS;
      state.getProductsError = "";
    });
    builder.addCase(getProducts.pending, (state) => {
      state.getProductsLoading = true;
      state.getProductsStatus = API_STATUS.PENDING;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.productList = [];
      state.getProductsError = action.error.message || "Something went wrong";
      state.getProductsLoading = false;
      state.getProductsStatus = API_STATUS.FAILED;
    });
  },
});
