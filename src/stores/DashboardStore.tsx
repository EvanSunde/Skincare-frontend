import { create } from 'zustand';

interface StoreState {
  activeSidebarItem: string;
  appointmentSelected: boolean;
  selectedAppointmentFilter: string,
  selectedAppointmentId: string,
  setActiveSidebarItem: (itemName: string) => void;
  setSelectedAppointmentId: (itemName: string) => void;
  setSelectedAppointmentFilter: (itemName: string) => void;
  setAppointmentSelected: (value: boolean) => void;
}

export const useDashboardStore = create<StoreState>((set) => ({
  activeSidebarItem: "",
  appointmentSelected: false,
  selectedAppointmentId: "",
  selectedAppointmentFilter: "Upcoming",
  setSelectedAppointmentId: (itemName) => set({ selectedAppointmentId: itemName }),
  setActiveSidebarItem: (itemName) => set({ activeSidebarItem: itemName }),
  setSelectedAppointmentFilter: (itemName) => set({ selectedAppointmentFilter: itemName }),
  setAppointmentSelected: (value) => set({ appointmentSelected: value }),
}));
