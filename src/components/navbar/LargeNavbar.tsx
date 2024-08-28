'use client'
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { useLoadingStore } from '@/stores/LoadingStore';
import { useLogoutStore } from '@/stores/LogoutStore';
import { useUserStore } from '@/stores/userStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import Profile from '@/assets/beautiful-nurse.png';

const LargeNavbar = ({ activeItem }: { activeItem: string }) => {
    const userInfo = useUserStore((state) => state.userInfo);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen)
    const dropdownRef = useRef(null);
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const router = useRouter();
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);


    const menuItems = [
        { name: 'Home', route: "/" },
        { name: 'Blogs', route: "/blogs" },
        // { name: 'FAQs', route: "#faq" },
        { name: 'Dashboard', route: "/dashboard/profile" },
    ];

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };



    const handleMenuItemClick = (item: any) => {
        if (item.name === 'FAQs') {
            router.push('/');
        } else {
            setIsLoading(true);
            router.push(item.route || '/');
        }
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
        <>
            <ul className="hidden lg:flex items-center justify-center gap-x-10 lg:ml-[13%] xl:ml-[27%] 2xl:ml-[37%]">
                {menuItems.map((item, index) => (
                    <li key={index} className={`xl:text-base cursor-pointer ${item.name === activeItem ? "underline underline-offset-8 text-black" : "text-gray-500"} hover:underline hover:underline-offset-8 font-medium tracking-tight hover:text-black `}
                        onClick={() => {
                            handleMenuItemClick(item)
                        }}>
                        <Link href={item.route || "/"} scroll={false}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Login/Signup Buttons */}
            {!isAuthorized && (
                <div className="hidden lg:flex items-center justify-center ml-[10%]">
                    <Link href={"/auth"}>
                        <button className="border-none text-lg font-semibold hover:underline hover:underline-offset-6 hover:shadow-md">Log in</button>
                    </Link>
                    <Link href={"/auth"}>
                        <button className="bg-[#19191b] lg:py-2 xl:py-3 lg:px-6 xl:px-8 font-medium text-lg text-white rounded-[7px] ml-6 hover:shadow-md">Sign up</button>
                    </Link>
                </div>
            )}

            {/* -------------Profile Image---------- */}
            {isAuthorized && (
                <div className="hidden lg:flex items-center justify-center ml-[10%] text-gray-700 relative cursor-pointer" onClick={handleDropdownToggle}>
                    <div className="flex items-center">
                        <Image src={Profile} alt='Profile' width={300} height={300} className='w-14 h-14 border border-gray-600 rounded-full object-cover' />
                        <p className='ml-3 font-semibold'>Welcome {userInfo[0]?.name && userInfo[0].name.split(' ')[0]}</p>
                    </div>
                    <i className='text-xl ml-2 cursor-pointer'><IoMdArrowDropdown /></i>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-[80%] mt-2 bg-white border border-gray-200 shadow-xl z-40 p-1 rounded-[8px]" ref={dropdownRef}>
                            <ul>
                                <Link href={'/dashboard/profile'}>
                                    <li className="px-6 py-2 font-semibold rounded-[8px] hover:bg-[#743bfb] hover:text-white cursor-pointer" >View Profile</li>
                                </Link>
                                <li className="px-6 py-2 font-semibold rounded-[8px] hover:bg-[#743bfb] hover:text-white cursor-pointer" onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default LargeNavbar;
