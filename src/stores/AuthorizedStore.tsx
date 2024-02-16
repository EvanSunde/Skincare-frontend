import { create } from 'zustand';

interface StoreState {
    isAuthorized: boolean;
    setIsAuthorized: (value: boolean) => void;
}

export const useAuthorizedStore = create<StoreState>((set) => ({
    isAuthorized: false,
    setIsAuthorized: (value) => set({ isAuthorized: value }),
}))