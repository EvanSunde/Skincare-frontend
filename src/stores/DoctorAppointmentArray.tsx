import { Appointment } from '@/app/dashboard/appointments/components/AppointmentDescription';
import { create } from 'zustand';

interface StoreState {
    DoctorArrayStore: Appointment[];
    setDoctorArrayStore: (appointments: Appointment[]) => void;
}

export const useDoctorArrayStore = create<StoreState>((set) => ({
    DoctorArrayStore: [],
    setDoctorArrayStore: (appointments) => set({ DoctorArrayStore: appointments })
}));
