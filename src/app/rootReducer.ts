import { commonSlice } from "../pages/common/slice";
import { productSlice } from "../pages/slice";

export const reducers = {
  common: commonSlice.reducer,
  product: productSlice.reducer,
};
