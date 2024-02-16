import { create } from 'zustand';

interface StoreState {
    name: string;
    email: string,
    setName: (itemName: string) => void;
    setEmail: (itemName: string) => void;
}

export const useDoctorStore = create<StoreState>((set) => ({
    name: "",
    email: "",
    setName: (itemName) => set({ name: itemName }),
    setEmail: (itemName) => set({ email: itemName }),
}));