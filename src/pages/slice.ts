import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./api";
import { API_STATUS } from "../common/constants";

export const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET PRODUCTS
     */
    builder.addCase(getProducts.fulfilled, (state, action) => {
      (state.getProductsRes = action.payload),
        (state.getProductsLoading = false),
        (state.getProductsStatus = API_STATUS.SUCCESS);
    });
    builder.addCase(getProducts.pending, (state) => {
      (state.getProductsLoading = true),
        (state.getProductsStatus = API_STATUS.PENDING);
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      (state.getProductsRes = action.error.message),
        (state.getProductsLoading = false),
        (state.getProductsStatus = API_STATUS.FAILED);
    });
  },
});
