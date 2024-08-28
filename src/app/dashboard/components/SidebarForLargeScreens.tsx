'use client'
import Image from "next/image";
import { SlLogout } from "react-icons/sl";
import SidebarImage from '@/assets/SidebarImage-.png';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import Logo from '@/assets/logo-sidebar.png';
import Link from "next/link";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface SidebarForLargeScreensProps {
    isSidebarOpen: boolean;
    windowWidth: number;
    sidebarRef: React.RefObject<HTMLDivElement>;
    activeSidebarItem: string;
    setIsLogoutModalOpen: (value: boolean) => void;
    handleSidebarItemClick: (item: string) => void;
    setIsSidebarOpen: (value: boolean) => void;
}

const SidebarForLargeScreens: React.FC<SidebarForLargeScreensProps> = ({
    isSidebarOpen,
    windowWidth,
    sidebarRef,
    activeSidebarItem,
    setIsLogoutModalOpen,
    handleSidebarItemClick,
    setIsSidebarOpen
}) => {
    const router = useRouter();
    return (
        <>
            {isSidebarOpen || windowWidth > 1281 ? (
                <div ref={sidebarRef} className='h-full w-72 lg:fixed xl:static min-w-72 xl:w-80 xl:min-w-80 top-0 left-0 z-50 bg-white border-r-2'>
                    <div className='w-full h-full flex flex-col relative'>
                        <div className='w-full flex justify-center items-center mt-6'>
                            <Image src={Logo} width={150} height={150} alt='Nephara' className='w-24  h-auto cursor-pointer' onClick={() => router.push("/")} />
                        </div>
                        <ul className='w-full flex items-center justify-center flex-col mt-2 transition-all duration-500 ease-in-out'>
                            {[{ itemName: "Dashboard", link: "/dashboard/profile" }, { itemName: "Appointments", link: "/dashboard/appointments" }, { itemName: "Settings", link: "/dashboard/settings" }].map((item, index) => (
                                <li key={index}
                                    className={`w-[90%] cursor-pointer text-lg font-semibold py-4 px-2 flex items-center mb-2 rounded-[10px] 
                          ${activeSidebarItem === item.itemName ? "bg-[#7650e0] text-white" : "text-gray-600 hover:bg-[#7650e0] hover:text-white transition-colors duration-300 ease-in-out"}`}
                                    onClick={() => handleSidebarItemClick(item.itemName)}
                                >
                                    <span className='mr-4 ml-2 text-3xl'>
                                        {item.itemName === "Dashboard" && <MdOutlineDashboardCustomize />}
                                        {item.itemName === "Appointments" && <LuCalendarDays />}
                                        {item.itemName === "Settings" && <IoSettingsOutline />}
                                    </span>
                                    {item.itemName}
                                </li>
                            ))}
                        </ul>
                        <div className='relative flex w-full justify-center items-center flex-col mt-6'>
                            <Image src={SidebarImage} width={200} height={200} alt='Sidebar Image' className='z-20' />
                            <div className='bg-[#f4f0fd] w-[85%] xl:w-[75%] h-48 mt-[-18px] z-10 rounded-[8px] flex flex-col items-center justify-center'>
                                <p className='font-medium text-2xl'>Book Appointment</p>
                                <p className='w-[95%] flex flex-wrap items-center justify-center text-center text-gray-600 mt-2'>
                                    Start your skincare with a quick appointment.
                                </p>
                                <Link href={'/appointment'}>
                                    <button className="bg-[#8f67e2] hover:bg-[#9c75e9] py-2 px-7 font-semibold text-white rounded-[8px] mt-5 transition-colors duration-300 ease-in-out transform hover:scale-105">
                                        Book now
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className='bottom-0 absolute flex items-center justify-center w-full' onClick={() => setIsLogoutModalOpen(true)}>
                            <p
                                className={`w-[90%] cursor-pointer text-lg font-semibold py-4 px-2 flex items-center mb-2 rounded-[10px] text-gray-600 hover:bg-[#7650e0] hover:text-white transition-colors duration-300 ease-in-out`}
                            >
                                <span className='mr-4 ml-2 text-2xl'><SlLogout /></span>
                                Logout
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className={`absolute top-8 left-8 text-3xl cursor-pointer z-50 ${activeSidebarItem && activeSidebarItem === "Appointments" ? "text-white" : "text-[#743bfb]"}`} onClick={() => setIsSidebarOpen(true)}><HiMiniBars3BottomLeft /> </p>
            )}
        </>
    )
};

export default SidebarForLargeScreens;