import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  username: string | null;
  rehydrated: boolean;
  setAuth: (token: string, refreshToken: string, username: string) => void;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      username: null,
      rehydrated: false,

      setAuth: (token, refreshToken, username) =>
        set({ token, refreshToken, username }),

      clearAuth: () =>
        set({ token: null, refreshToken: null, username: null }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        username: state.username,
      }),

      onRehydrateStorage: () => {
        return () => {
          setTimeout(() => {
            useAuth.setState({ rehydrated: true });
          }, 0);
        };
      },
    }
  )
);
