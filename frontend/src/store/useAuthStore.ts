import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  // roles: string[];
  role: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  authToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      authToken: null,

      login: (user, token) => set({ isAuth: true, user, authToken: token }),

      logout: () => set({ isAuth: false, user: null, authToken: null }),
    }),
    { name: "auth-storage" }
  )
);
