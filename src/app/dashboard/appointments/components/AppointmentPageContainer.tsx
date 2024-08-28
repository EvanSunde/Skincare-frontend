"use client"
import React, { useEffect } from 'react'
import { useDashboardStore } from '@/stores/DashboardStore';
import AppointmentFilter from './AppointmentFilter';
import AppointmentLists from './AppointmentLists';
import AppointmentDescription, { Appointment } from './AppointmentDescription';
import AppointmentPageTopDiv from './AppointmentPageTopDiv';

interface AppointmentInfoProps {
    appointmentData: Appointment | undefined;
}

const AppointmentPageContainer: React.FC<AppointmentInfoProps> = ({ appointmentData }) => {
    const appointmentSelected = useDashboardStore((state) => state.appointmentSelected);
    const setAppointmentSelected = useDashboardStore((state) => state.setAppointmentSelected);

    useEffect(() => {
        if (appointmentData) {
            setAppointmentSelected(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full h-full flex flex-col'>
            <AppointmentPageTopDiv />
            <div className='overflow-auto md:px-8 lg:px-8 lg:py-2 xl:px-8 xl:py-2 2xl:px-16 2xl:py-4 '>
                <p className={`mt-6 text-3xl md:text-4xl font-semibold text-[#743bfb]  tracking-wide lg:flex items-center justify-center lg:justify-start ${appointmentSelected ? "hidden" : "flex"}`}>Appointments</p>
                <AppointmentFilter />
                <div className='w-full h-auto lg:mt-6 flex items-center justify-center lg:items-start lg:justify-start gap-x-6'>
                    <AppointmentLists />
                    <AppointmentDescription appointmentData={appointmentData} />
                </div>
            </div>
        </div>
    );
};

export default AppointmentPageContainer;

