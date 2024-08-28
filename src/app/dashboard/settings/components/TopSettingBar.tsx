import { useLogoutStore } from "@/stores/LogoutStore";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const TopSettingBar = () => {
    const userInfo = useUserStore((state) => state.userInfo);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen)

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full h-16 sm:min-h-20 lg:mt-4 xl:mt-0 2xl:min-h-24 flex items-center justify-between'>
            <div className='lg:ml-16 xl:ml-0'>
                <p className='text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-semibold'>Account Settings</p>
                <p className='text-sm sm:text-base text-gray-700'>Welcome to Nephara Skincare!</p>
            </div>
            <div className="items-center hidden sm:flex justify-center ml-[10%] relative cursor-pointer" onClick={handleDropdownToggle} >
                <Image src={userInfo[0]?.photo ? userInfo[0].photo : ''} alt='Profile' width={100} height={100} className='w-14 h-14 border rounded-full object-cover' placeholder="blur" blurDataURL=" data:image/jpeg;base64,/9j//gAQTGF2YzYwLjMxLjEwMgD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xABqAAEBAQEAAAAAAAAAAAAAAAAGBAMHAQEBAQAAAAAAAAAAAAAAAAAAAQIQAAEDAwIGAwEAAAAAAAAAAAIDBAEABRIhEUExFAdREyIyBqERAAMBAAIDAQAAAAAAAAAAAAABEQISITGBQQP/wAARCAAJABQDARIAAhIAAxIA/9oADAMBAAIRAxEAPwDg7SLfOfVm4DlgSAgfnfISkf4VYRzmgAFnbhv20Wv5j+oVUNl0xYA9VcMm8q5DkUq26FVfYmnlKKZYpmX2KNIknwrX5ZzraWtLKvbdk9GS5aVqvRCq7jbRur8bYoqbCHTiGRraKk2hQvSSkbR8pT2mdI14VJV1x5a4tvNcvmfCAH//2Q==" />
                {/* <p className='ml-3 font-semibold lg:text-lg'>Welcome {userInfo[0] && userInfo[0]?.name && userInfo[0].name.split(' ')[0] || ""}</p> */}
                <p className='ml-3 font-semibold lg:text-lg'>Welcome {userInfo.length > 0 && userInfo[0]?.name ? userInfo[0]?.name.split(' ')[0] : ""}</p>
                <i className='text-2xl ml-3 cursor-pointer'><IoMdArrowDropdown /></i>
                {isDropdownOpen && (
                    <div className="absolute right-0 top-[80%] mt-2 bg-white border border-gray-200 shadow-xl z-40 p-1 rounded-[8px]" ref={dropdownRef}>
                        <ul>
                            <li className="px-6 py-2 font-semibold rounded-[8px] hover:bg-[#743bfb] hover:text-white cursor-pointer" >{userInfo[0].name || ""}</li>
                            <li className="px-6 py-2 font-semibold rounded-[8px] hover:bg-[#743bfb] hover:text-white cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
};

export default TopSettingBar;