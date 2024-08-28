import Link from "next/link";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { useLoadingStore } from "@/stores/LoadingStore";

interface SidebarForSmallDevicesProps {
    activeSidebarItem: string;
}

const SidebarForSmallDevices:  React.FC<SidebarForSmallDevicesProps> = ({
    activeSidebarItem,
})  => {
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)

    return (
        <div className='absolute bottom-4 sm:bottom-2 w-[95%] shadow-lg h-16 sm:h-20 bg-white border rounded-xl flex item-center justify-center z-50'>
            <Link href={"/dashboard/profile"} className={`w-[33%] h-full flex flex-col items-center justify-center hover:text-[#ba58ff] cursor-pointer   ${activeSidebarItem === "Dashboard" ? "text-[#ba58ff]" : ""}`}
                onClick={() => {
                    if (activeSidebarItem !== "Dashboard") {
                        setIsLoading(true)
                    }
                }}>
                <span className='text-[1.65rem] sm:text-3xl'><MdOutlineDashboardCustomize /></span>
                <p className='text-[11px] font-medium sm:text-sm '>Profile</p>
            </Link>
            <Link href={"/dashboard/appointments"} className={`w-[33%] h-full flex flex-col items-center justify-center hover:text-[#ba58ff] cursor-pointer   ${activeSidebarItem === "Appointments" ? "text-[#ba58ff]" : ""}`}
                onClick={() => {
                    if (activeSidebarItem !== "Appointments") {
                        setIsLoading(true)
                    }
                }}>
                <span className='text-[1.65rem] sm:text-3xl'><LuCalendarDays /></span>
                <p className='text-[11px] font-medium sm:text-sm '>Appointments</p>
            </Link>
            <Link href={"/dashboard/settings"} className={`w-[33%] h-full flex flex-col items-center justify-center hover:text-[#ba58ff] cursor-pointer   ${activeSidebarItem === "Settings" ? "text-[#ba58ff]" : ""}`}
                onClick={() => {
                    if (activeSidebarItem !== "Settings") {
                        setIsLoading(true)
                    }
                }}>
                <span className='text-[1.65rem] sm:text-3xl'><IoSettingsOutline /></span>
                <p className='text-[11px] font-medium sm:text-sm '>Settings</p>
            </Link>
        </div>
    )
};

export default SidebarForSmallDevices;