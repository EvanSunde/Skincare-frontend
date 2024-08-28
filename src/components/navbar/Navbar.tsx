'use client'
import React, { lazy, useRef, Suspense } from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo-navbar.png';
import { FaBars } from 'react-icons/fa6';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { useUserStore } from '@/stores/userStore';
import LogoutModal from '@/components/LogoutModal';
// import { GET_USER_INFO } from '@/apollo_client/Queries';
// import { useLazyQuery } from '@apollo/client';
// import { getUserInfo } from '../utils/GetUserInfo';
import img64 from '@/data/base64';

const LazyMobileNavbar = lazy(() => import('./MobileNavbar'));
const LargeNavbar = lazy(() => import('./LargeNavbar'));


const Navbar = ({ item }: { item: string }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [activeItem, setActiveItem] = useState(item);
    const [showSidebar, setShowSidebar] = useState(false);
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);

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



    return (
        <nav className="w-full flex justify-center items-center border-b-2 " >
            <LogoutModal />
            <div className='h-20 w-[95%] lg:w-[63rem] xl:w-[79rem] 2xl:w-[117rem] flex items-center justify-between lg:justify-start'>
                <Image src={Logo} width={200} height={100} alt="Nephara" className='w-32 sm:w-40 ml-6 sm:ml-16 xl:ml-20' loading='lazy' blurDataURL={img64} />

                {/* -----------Large Screen Navbar----------------- */}
                {windowWidth >= 1024 ?
                    <Suspense fallback={<div></div>}>
                        <LargeNavbar activeItem={activeItem} />
                    </Suspense> : ""}

                {/* Mobile Menu Button */}
                {windowWidth < 1024 && (
                    <button className="lg:hidden p-3 mr-6" aria-label="Open Menu" onClick={() => setShowSidebar(!showSidebar)}>
                        <FaBars className="text-2xl" />
                    </button>
                )}
                {windowWidth < 1024 && showSidebar && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyMobileNavbar activeItem={activeItem} setShowSidebar={setShowSidebar} showSidebar={showSidebar} isAuthorized={isAuthorized} />
                    </Suspense>
                )}
            </div>
        </nav>)
};

export default Navbar;
