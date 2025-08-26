import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

interface UserState {
  user: User | null;
  isLogin: boolean;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLogin = !!action.payload;
    },
    updateUser: (state, action: PayloadAction<User | null>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
