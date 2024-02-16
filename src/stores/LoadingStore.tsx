import { create } from 'zustand';

interface StoreState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useLoadingStore = create<StoreState>((set) => ({
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
}))