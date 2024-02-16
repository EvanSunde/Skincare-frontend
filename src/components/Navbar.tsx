'use client'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.png';
import { FaBars } from 'react-icons/fa6';
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { FaMicroblog, FaQuestion } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import Link from 'next/link';
import { useLoadingStore } from '@/stores/LoadingStore';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import Profile from '@/assets/beautiful-nurse.png';
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdArrowDropdown } from 'react-icons/io';
import { useUserStore } from '@/stores/userStore';
import LogoutModal from '@/components/LogoutModal';
import { useLogoutStore } from '@/stores/LogoutStore';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [activeItem, setActiveItem] = useState("Home");
    const [sidebarActiveItem, setSidebarActiveItem] = useState("Home");
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const userInfo = useUserStore((state) => state.userInfo);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen)
    const router = useRouter();
    const pathname = usePathname();

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };


    const menuItems = [
        { name: 'Home', route: "/" },
        { name: 'Blogs', route: "/blogs" },
        { name: 'FAQs', routes: "faq" },
        { name: 'Dashboard', route: "/dashboard/profile" },
    ];


    const MenuItemsMobileSidebar = [
        { icon: <IoHomeOutline />, name: 'Home', route: "/" },
        { icon: <FaMicroblog />, name: 'Blogs', route: "/blogs" },
        { icon: <FaQuestion />, name: 'FAQs', routes: "faq" },
        { icon: <MdOutlineDashboardCustomize />, name: 'Dashboard', route: "/dashboard/profile" },
        { icon: <IoSettingsOutline />, name: 'Settings', route: "/dashboard/settings" },
    ];

    useEffect(() => {
        if (pathname === "/blogs") {
            setActiveItem("Blogs")
            setSidebarActiveItem("Blogs")
        }
        else if (pathname === "/faqs") {
            setActiveItem("FAQs")
            setSidebarActiveItem("FAQs")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !(sidebarRef.current as any).contains(event.target)) {
                // Click outside the sidebar, close it
                setShowSidebar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarRef]);

    return (
        <nav className="w-full flex justify-center items-center border-b-2 ">
            <LogoutModal />
            <div className='h-20 w-[95%] lg:w-[63rem] xl:w-[79rem] 2xl:w-[117rem] flex items-center justify-between lg:justify-start'>
                <Image src={Logo} width={200} height={100} alt="Nephara" className='pl-12' />

                {/* Large Screen Menu */}
                {windowWidth >= 1024 && (
                    <ul className="hidden lg:flex items-center justify-center gap-x-10 lg:ml-[13%] xl:ml-[27%] 2xl:ml-[37%]">
                        {menuItems.map((item, index) => (
                            <Link href={item.route || "/"} key={index} onClick={() => setIsLoading(true)}>
                                <li className={`xl:text-base cursor-pointer ${item.name === activeItem ? "underline underline-offset-8 text-black" : "text-gray-500"} hover:underline hover:underline-offset-8 font-medium tracking-tight hover:text-black `}
                                    onClick={() => setActiveItem(item.name)}>
                                    {item.name}
                                </li>
                            </Link>

                        ))}
                    </ul>
                )}

                {/* Login/Signup Buttons */}
                {windowWidth >= 1024 && !isAuthorized && (
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
                {windowWidth >= 1024 && isAuthorized && (
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

                {/* Mobile Menu Button */}
                {windowWidth < 1024 && (
                    <button className="lg:hidden p-3 mr-6" aria-label="Open Menu" onClick={() => setShowSidebar(!showSidebar)}>
                        <FaBars className="text-2xl" />
                    </button>
                )}
                {windowWidth < 1024 && showSidebar && (
                    <div ref={sidebarRef} className='bg-white border-2 w-[350px] h-full right-0 top-0 fixed z-50'>
                        <button className="lg:hidden p-3 absolute right-12 top-4" aria-label="Open Menu" onClick={() => setShowSidebar(!showSidebar)}>
                            <FaBars className="text-2xl" />
                        </button>
                        <Image src={Logo} width={200} height={100} className='mt-[5%]' alt='Dermatologist' />
                        {/* <p className='ml-6 text-sm mt-2'>You are not signed in yet.</p> */}
                        <ul className='w-full flex flex-col p-2 mt-6 gap-y-1'>
                            {MenuItemsMobileSidebar.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => setSidebarActiveItem(item.name)}
                                    className={`flex w-full rounded-[7px] h-14 text-lg font-medium hover:bg-[#a376ff] hover:text-white items-center cursor-pointer ${sidebarActiveItem === item.name ? "bg-[#a376ff] text-white" : ""}`}
                                >
                                    <i className='ml-6 mr-3 text-2xl'>{item.icon}</i>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                        {/* ---------login CTA------------- */}
                        {!isAuthorized &&
                            <div className='flex items-center justify-center w-full flex-col mt-[15%]'>
                                <p className="text-sm font-medium text-black  mb-2 ">Get Started Today:</p>
                                <Link href={"/auth"}>
                                    <button className="bg-[#a376ff] py-3 px-10 font-medium text-lg text-white rounded-[7px]">Register/ Login</button>
                                </Link>
                            </div>
                        }

                    </div>
                )}
            </div>

        </nav>)
}

export default Navbar;