import { create } from 'zustand';

interface StoreState {
    tokenString: string;
    setTokenString: (itemName: string) => void;
}

export const useTokenStore = create<StoreState>((set) => ({
    tokenString: "",
    setTokenString: (value) => set({ tokenString: value }),
}))