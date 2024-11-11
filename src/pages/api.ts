import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../utils/http";
import { API_URL } from "../app/urls";

const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await http.get(API_URL.PRODUCTS.FETCH_PRODUCTS);
  return response?.data;
});

export { getProducts };
