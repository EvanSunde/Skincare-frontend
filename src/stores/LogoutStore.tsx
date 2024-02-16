import { create } from 'zustand';

interface StoreState {
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (value: boolean) => void;
}

export const useLogoutStore = create<StoreState>((set) => ({
  isLogoutModalOpen: false,
  setIsLogoutModalOpen: (value) => set({ isLogoutModalOpen: value }),
}))