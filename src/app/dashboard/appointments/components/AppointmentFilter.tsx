'use client'
import { useDashboardStore } from "../../../../stores/DashboardStore";
import Link from 'next/link';

const AppointmentFilter = () => {
    const selectedAppointmentFilter = useDashboardStore((state) => state.selectedAppointmentFilter);
    const setSelectedAppointmentFilter = useDashboardStore((state) => state.setSelectedAppointmentFilter);
    const appointmentSelected = useDashboardStore((state) => state.appointmentSelected);

    const handleFilterClick = (filter: string) => {
        setSelectedAppointmentFilter(filter);
    };

    return (
        <ul className={`lg:flex items-center justify-center lg:justify-start gap-x-8 lg:gap-x-16 mt-4 text-base ${appointmentSelected ? "hidden" : "flex"}`}>
            {/* filters */}
            {["Upcoming", "Past", "All",].map((filter) => (
                <li
                    key={filter}
                    className={`cursor-pointer font-medium ${selectedAppointmentFilter === filter ? "text-[#743bfb] underline decoration-[3px] underline-offset-[6px] " : ""}`}
                    onClick={() => handleFilterClick(filter)}
                >
                    {filter}
                </li>
            ))}
        </ul>
    )
}

export default AppointmentFilter;