import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { FaMicroblog } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useLoadingStore } from "@/stores/LoadingStore";
import { usePathname, useRouter } from "next/navigation";
import { FaBars } from 'react-icons/fa6';
import Image from "next/image";
import Logo from '@/assets/logo-sidebar.png';
import Link from "next/link";

interface MobileNavbarProps {
    activeItem: string;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    showSidebar: boolean;
    isAuthorized: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
    activeItem,
    setShowSidebar,
    showSidebar,
    isAuthorized,
}) => {
    const router = useRouter();
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    const sidebarRef = useRef(null);

    const MenuItemsMobileSidebar = [
        { icon: <IoHomeOutline />, name: 'Home', route: "/" },
        { icon: <FaMicroblog />, name: 'Blogs', route: "/blogs" },
        { icon: <MdOutlineDashboardCustomize />, name: 'Dashboard', route: "/dashboard/profile" },
        { icon: <IoSettingsOutline />, name: 'Settings', route: "/dashboard/settings" },
    ];

    const handleMobileMenuButtonClick = (item: any) => {
        if (item.name !== activeItem) {
            router.push(item.route);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !(sidebarRef.current as any).contains(event.target)) {
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
        <div ref={sidebarRef} className='bg-white border-2 w-[310px] h-full right-0 top-0 flex flex-col items-center fixed z-50' style={{ height: "100lvh" }}>
            <button className="lg:hidden p-3 absolute right-12 top-4" aria-label="Open Menu" onClick={() => setShowSidebar(!showSidebar)}>
                <FaBars className="text-2xl" />
            </button>
            <Image src={Logo} width={200} height={100} className='w-16 mt-[5%]' alt='Dermatologist' />
            <ul className='w-full flex flex-col p-2 mt-6 gap-y-1'>
                {MenuItemsMobileSidebar.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleMobileMenuButtonClick(item)}
                        className={`flex w-full rounded-[7px] h-14 text-lg font-medium hover:bg-[#a376ff] hover:text-white items-center cursor-pointer ${activeItem === item.name ? "bg-[#a376ff] text-white" : ""}`}
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
    )
};

export default MobileNavbar;