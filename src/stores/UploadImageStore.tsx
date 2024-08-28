import { create } from 'zustand';

interface StoreState {
    isUploadPhotoOpen: boolean;
    setIsUploadPhotoOpen: (value: boolean) => void;
}

export const useUploadImageStore = create<StoreState>((set) => ({
    isUploadPhotoOpen: false,
    setIsUploadPhotoOpen: (value) => set({ isUploadPhotoOpen: value }),
}))