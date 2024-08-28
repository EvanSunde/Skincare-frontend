import { create } from 'zustand';

export interface UserInfo {
    email: string;
    name?: string;
    photo?: string;
    age?: number;
    city?: string;
    country?: string;
    gender?: string;
    phoneNumber?:string;
}

interface StoreState {
    userInfo: UserInfo[];
    setUserInfo: (item: UserInfo) => void;
}

export const useUserStore = create<StoreState>((set) => ({
    userInfo: [],
    setUserInfo: (item) => set((state) => ({ userInfo: [...state.userInfo, item] })),
}));
