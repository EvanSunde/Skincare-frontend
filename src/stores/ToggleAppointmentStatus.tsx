import { create } from 'zustand';

interface StoreState {
    isToggleModalOpen: boolean;
    setIsToggleModalOpen: (value: boolean) => void;
}

// -----For modal for doctor to toggle its completion status---------
export const useToggleModalStore = create<StoreState>((set) => ({
    isToggleModalOpen: false,
    setIsToggleModalOpen: (value) => set({ isToggleModalOpen: value }),
}))