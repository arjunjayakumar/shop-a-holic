import { commonSlice } from "../common/utils/slice";
import { productSlice } from "../pages/slice";

export const reducers = {
  common: commonSlice.reducer,
  product: productSlice.reducer,
};
