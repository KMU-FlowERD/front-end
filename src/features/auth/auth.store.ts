import { create } from 'zustand';

interface AuthStore {
  accessToken?: string;
  isLogin: () => boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLogin: () => !!get().accessToken,
  login: (accessToken) => set({ accessToken }),
  logout: () => set({ accessToken: '' }),
}));
