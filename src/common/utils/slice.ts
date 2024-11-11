import { createSlice } from "@reduxjs/toolkit";
import { SavedProduct } from "../../common/types";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
  },
  reducers: {
    setCartItems: (state, action) => {
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
      state.cartItems = action.payload;
    },
    removeCartItem: (state, action) => {
      const updatedCartItems = state.cartItems.filter(
        (item: SavedProduct) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      state.cartItems = updatedCartItems;
    },
    updateCartItemQuantity: (state, action) => {
      const updatedCartItems = state.cartItems.map((item: SavedProduct) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      state.cartItems = updatedCartItems;
    },
    addCartItem: (state, action) => {
      const existItem = state.cartItems.find(
        (item: SavedProduct) => item.id === action.payload.id
      );
      if (existItem) {
        // If the item already exists in the cart, update its quantity
        const updatedCartItems = state.cartItems.map((item: SavedProduct) =>
          item.id === existItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cartItems = updatedCartItems;
      } else {
        // If the item doesn't exist in the cart, add it
        state.cartItems = [...state.cartItems, action.payload];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCartItems: (state) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  removeCartItem,
  clearCartItems,
  updateCartItemQuantity,
} = commonSlice.actions;
