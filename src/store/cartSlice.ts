import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartCount: number;
}

const initialState: CartState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
    incrementCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount += action.payload;
    },
    decrementCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount -= action.payload;
    },
  },
});

export const { setCartCount, incrementCartCount, decrementCartCount } = cartSlice.actions;
export default cartSlice.reducer;
