import { Appointment } from '@/app/dashboard/appointments/components/AppointmentDescription';
import { create } from 'zustand';

interface StoreState {
  activeSidebarItem: string;
  appointmentSelected: boolean;
  selectedAppointmentFilter: string,
  selectedAppointmentId: string,
  appointmentArray: Appointment[];
  setAppointmentArray: (appointments: Appointment[]) => void;
  setActiveSidebarItem: (itemName: string) => void;
  setSelectedAppointmentId: (itemName: string) => void;
  setSelectedAppointmentFilter: (itemName: string) => void;
  setAppointmentSelected: (value: boolean) => void;
};

export const useDashboardStore = create<StoreState>((set) => ({
  activeSidebarItem: "",
  appointmentSelected: false,
  selectedAppointmentId: "",
  appointmentArray: [],
  setAppointmentArray: (appointments) => set({ appointmentArray: appointments }),
  selectedAppointmentFilter: "All",
  setSelectedAppointmentId: (itemName) => set({ selectedAppointmentId: itemName }),
  setActiveSidebarItem: (itemName) => set({ activeSidebarItem: itemName }),
  setSelectedAppointmentFilter: (itemName) => set({ selectedAppointmentFilter: itemName }),
  setAppointmentSelected: (value) => set({ appointmentSelected: value }),
}));
