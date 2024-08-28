import { useLogoutStore } from "@/stores/LogoutStore";
import { MdNavigateNext } from "react-icons/md";
import { SlLock, SlLogout } from "react-icons/sl";
import { LiaEditSolid } from "react-icons/lia";

interface SettingsSidebarProps {
    activeSettingButton: string;
    setActiveSettingButton: React.Dispatch<React.SetStateAction<string>>;
    windowWidth: number;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeSettingButton, setActiveSettingButton, windowWidth }) => {
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen)

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    }

    return (
        <div className={`bg-white ${windowWidth > 1024 || activeSettingButton === "" ? "block" : "hidden"} ${activeSettingButton === 'Edit' ? "block" : ""} ${windowWidth > 1024 ? "" : "flex w-[92%] sm:w-[85%] h-full pb-20 items-center flex-col overflow-auto"} w-[95%] sm:w-[90%] md:w-[85%] lg:w-[30%] px-2 2xl:w-[25%] h-[90%] 2xl:h-[86%] border rounded-[10px] flex flex-col items-center shadow-xl`}>
            <p className="flex w-full text-lg font-medium mt-3 sm:mt-7 pl-6">Settings</p>
            <ul className='w-full mt-2'>
                <li className={`font-medium h-14 sm:h-14 flex items-center rounded-xl cursor-pointer text-gray-700 hover:bg-[#eeecff] ${activeSettingButton === "Edit" ? "bg-[#eeecff]" : ""} ${windowWidth > 1024 && activeSettingButton === "" ? "bg-[#eeecff]" : ""}`}
                    onClick={() => setActiveSettingButton("Edit")}>
                    <p className='flex items-center ml-2'>
                        <span className='ml-2 sm:ml-4 text-3xl sm:text-3xl mr-2 text-gray-600' onClick={() => setActiveSettingButton("Edit")}><LiaEditSolid /></span>Edit Profile
                    </p>
                </li>
                <li className={` ${activeSettingButton === "change-password" ? "bg-[#eeecff]" : ""} font-medium hover:bg-[#eeecff] text-gray-700 rounded-xl mt-1 h-14 sm:h-14 flex items-center cursor-pointer`} onClick={() => setActiveSettingButton("change-password")}>
                    <p className='flex items-center ml-2'>
                        <span className='text-2xl sm:text-2xl ml-2 sm:ml-4 mr-2 text-gray-600'><SlLock /></span>Change Password
                    </p>
                </li>
                <li className={`font-medium hover:bg-[#eeecff] text-gray-700 rounded-xl mt-1 h-14 sm:h-14 flex items-center cursor-pointer`} onClick={handleLogout}>
                    <p className='flex items-center ml-2 '>
                        <span className='text-2xl sm:text-2xl ml-2 sm:ml-4 mr-2'><SlLogout /></span>Log Out
                    </p>
                </li>
            </ul>
        </div>
    )
};

export default SettingsSidebar;
