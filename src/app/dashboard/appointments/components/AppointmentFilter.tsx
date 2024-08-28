'use client'
import { useDashboardStore } from "@/stores/DashboardStore";

const AppointmentFilter = () => {
    const selectedAppointmentFilter = useDashboardStore((state) => state.selectedAppointmentFilter);
    const setSelectedAppointmentFilter = useDashboardStore((state) => state.setSelectedAppointmentFilter);
    const appointmentSelected = useDashboardStore((state) => state.appointmentSelected);

    const handleFilterClick = (filter: string) => {
        setSelectedAppointmentFilter(filter);
    };

    return (
        <ul className={`lg:flex items-center text-sm sm:text-base justify-center lg:justify-start gap-x-8 lg:gap-x-16 mt-1 sm:mt-4  ${appointmentSelected ? "hidden" : "flex"}`}>
            {/* filters */}
            {["Upcoming", "Past", "All",].map((filter) => (
                <li
                    key={filter}
                    className={`cursor-pointer font-medium ${selectedAppointmentFilter === filter ? "text-[#743bfb]  underline decoration-[3px] underline-offset-[6px] " : ""}`}
                    onClick={() => handleFilterClick(filter)}
                >
                    {filter}
                </li>
            ))}
        </ul>
    )
}

export default AppointmentFilter;