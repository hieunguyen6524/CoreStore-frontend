import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

type UserStore = {
  user: User | null;
  token: string | null;
  isLogin: boolean;
  setUser: (user: User | null, token?: string | null) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogin: false,
      setUser: (user, token = null) =>
        set(() => ({ user, isLogin: !!user, token })),
    }),
    {
      name: "auth-store",
      partialize: ({ user, isLogin, token }) => ({ isLogin, token, user }),
    }
  )
);
