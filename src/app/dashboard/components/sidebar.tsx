"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import { usePathname, useRouter } from 'next/navigation';
import { useDashboardStore } from '../../../stores/DashboardStore';
import Link from 'next/link';
import { useLogoutStore } from '@/stores/LogoutStore';
import { useLoadingStore } from '@/stores/LoadingStore';
import SidebarForLargeScreens from './SidebarForLargeScreens';
import SidebarForSmallDevices from './SIdebarForSmallDevices';

const Sidebar = () => {
    const activeSidebarItem = useDashboardStore((state) => state.activeSidebarItem);
    const setActiveSidebarItem = useDashboardStore((state) => state.setActiveSidebarItem);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen)
    const router = useRouter();
    const pathname = usePathname();
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleSidebarItemClick = (itemName: string) => {
        setActiveSidebarItem(itemName);
        if (activeSidebarItem !== itemName) {
            setIsLoading(true)
            if (itemName === "Dashboard") {
                router.push("/dashboard/profile")
            }
            else if (itemName === "Appointments") {
                router.push("/dashboard/appointments")
            }
            else if (itemName === "Settings") {
                router.push("/dashboard/settings")
            }
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (pathname === "/dashboard/profile") {
            setActiveSidebarItem("Dashboard")
        }
        else if (pathname === "/dashboard/appointments") {
            setActiveSidebarItem("Appointments")
        }
        else if (pathname === "/dashboard/settings") {
            setActiveSidebarItem("Settings")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(isSidebarOpen)

        if (isSidebarOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        windowWidth > 1023 ? (
            <SidebarForLargeScreens handleSidebarItemClick={handleSidebarItemClick} isSidebarOpen={isSidebarOpen} windowWidth={windowWidth} sidebarRef={sidebarRef} activeSidebarItem={activeSidebarItem} setIsLogoutModalOpen={setIsLogoutModalOpen} setIsSidebarOpen={setIsSidebarOpen} />
        ) : (
            <SidebarForSmallDevices activeSidebarItem={activeSidebarItem}/>
        )
    );

};

export default Sidebar;

