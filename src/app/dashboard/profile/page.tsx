'use client'
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/sidebar';
import Image from 'next/image';
import Profile from '@/assets/Emma.png'
import { gql, useLazyQuery } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import ToastMessage from '@/components/utils/ToastMessage';
import Loader from '@/components/Loader';
import { useLoadingStore } from '@/stores/LoadingStore';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { getCookie } from '@/components/utils/Cookie';
import ProfileBackground from '@/assets/ProfilePage.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { TbCalendarUser } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import Link from 'next/link';
import { useLogoutStore } from '@/stores/LogoutStore';


const GET_USER_INFO = gql`
  query GetUserInfoByToken {
    getUserInfoByToken {
    status
    message
    user {
      email
      phoneNumber
      photo
      country
      city
      name
      age
      gender
    }
  }
    }`

const Page = () => {
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: "no-cache"
    });

    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const userInfo = useUserStore((state) => state.userInfo)
    const router = useRouter();
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)
    const isLoading = useLoadingStore((state) => state.isLoading)
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);
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

    useEffect(() => {
        const token = getCookie("token")
        let isMounted = true; // Flag to track component mount state


        const getUserInfo = async () => {
            try {
                if (token) {
                    console.log(token, "asking token ")
                    if (!isAuthorized) {
                        const response = await getUserInfoByToken();

                        if (!isMounted) return; // Skip state updates if component is unmounted

                        if (response.data) {
                            const { status, message, user } = response.data.getUserInfoByToken;
                            if (user) {
                                setIsAuthorized(true)
                                setUserInfo({ email: user.email || '', name: user.name || '', photo: user.photo || '', gender: user.gender || '', age: user.age || 0, city: user.city || '', country: user.country || '', phoneNumber: user.phoneNumber || '' })
                                console.log("user info from profile", user)
                            }
                            if (status === 'error' && message === 'Unauthorized Token!') {
                                router.replace('/auth')
                                ToastMessage("error", "Authorization Denied")
                                return;
                            } else if (status === 'error' && message === 'Internal server error') {
                                ToastMessage(status, message)
                            }
                        }
                    }
                }
                else {
                    router.replace('/auth')
                    ToastMessage("error", "Authorization Denied")
                    return;
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user info:", error);
                // Handle any error or perform cleanup actions
            }
        };

        if (isMounted) {
            getUserInfo();
        }

        // Cleanup function
        return () => {
            isMounted = false; // Update flag to indicate component unmount
            // Perform cleanup actions here if needed
            // For example: Clear any timers or subscriptions
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        // <main className='w-full h-screen flex justify-center lg:justify-start bg-[#f6f8fc] relative'>

        <main className='w-full h-screen flex  items-center justify-center bg-[#f6f8fc] relative'>
            {isLoading ? <Loader /> :
                <>
                    <Sidebar />
                    <div className='w-full h-full flex max-h-screen justify-center xl:justify-start overflow-auto ' style={{ backgroundImage: `url(${ProfileBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'right 5%' }}>

                        <div className="w-[95%] lg:w-[63rem]  xl:w-[79rem] h-[50rem] xl:ml-1 2xl:ml-[3%] xl:mr-1 2xl:mr-4 ">
                            {/* -----------Top profile bar-------------- */}
                            <div className='w-full min-h-20 lg:mt-4 xl:mt-0 2xl:min-h-24 flex items-center justify-between'>
                                <div className='lg:ml-16 xl:ml-0'>
                                    <p className='text-2xl lg:text-3xl font-semibold'>Profile dashboard</p>
                                    <p className='text-sm lg:text-base text-gray-700'>Welcome to Nephara Skincare!</p>
                                </div>
                                <div className="flex items-center justify-center ml-[10%] relative cursor-pointer" onClick={handleDropdownToggle} >
                                    <Image src={Profile} alt='Profile' width={100} height={100} className='w-14 h-14 border rounded-full object-cover' />
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

                            <div className='w-full h-auto lg:h-[47rem] rounded-[10px] flex flex-col lg:flex-row items-center justify-center gap-x-[5%] py-5 lg:py-0 mb-24 lg:mb-0'
                                style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)', backdropFilter: 'blur(5px)' }}>

                                {/* -------Profile-------- */}
                                <div className='bg-white w-[90%] md:w-[85%] lg:w-[45%] 2xl:w-[43%] h-[90%] 2xl:h-[86%] border rounded-[10px] flex flex-col items-center shadow-xl' >
                                    <Image src={Profile} width={1200} height={1200} alt='profile' className='w-[20rem] h-[20rem] border object-cover rounded-[10px] mt-6' />
                                    {/* <p className='text-2xl font-bold mt-6 w-full ml-[12%]'>My Profile</p> */}
                                    <p className='text-3xl font-medium mt-6'>{userInfo[0].name || ""}</p>
                                    <div className='flex w-full gap-x-[5%] justify-center mt-4'>
                                        <p className='w-[40%] py-1 border-b-1 text-lg'>{userInfo[0].name || ""}</p>
                                        <p className='w-[40%] py-1 border-b-1 text-lg'>{userInfo[0].phoneNumber || ""}</p>

                                    </div>
                                    <p className='w-[85%] py-1 border-b-1 text-lg mt-4'>{userInfo[0].email || ""}</p>
                                    <Link href={'/dashboard/settings'}>
                                        <button className='hidden lg:block bg-[#743bfb] text-white text-lg font-medium py-2 mt-12 rounded-3xl px-8'>Edit Profile</button>
                                    </Link>

                                    {/* ---------------More detailed Info for mobiles-------------- */}
                                    <div className=' lg:hidden mt-6 w-[90%] bg-white flex flex-col items-center '>
                                        <div className='w-full h-12 md:h-16 border-b-1 flex items-center justify-between'>
                                            <p className='text-xl md:text-2xl font-semibold ml-10'>More Detailed Info</p>
                                            <p className='mr-16 text-2xl md:text-3xl text-[#743bfb]'><TbCalendarUser /></p>
                                        </div>
                                        {/* ------name-------- */}
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-600'>Full Name</p>
                                            <p className='w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].name || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Email</p>
                                            <p className='w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].email || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Phone</p>
                                            <p className='w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].phoneNumber || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className='font-semibold mt-2 w-24 text-gray-500'>Age</p>
                                            <p className='w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].age || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Gender</p>
                                            <p className=' w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].gender || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>City</p>
                                            <p className='w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].city || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 mb-8'>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Country</p>
                                            <p className=' w-[50%] border-b-1 text-base md:text-lg ml-6 sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].country || ""}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ----------ANother----------- */}
                                <div className='hidden lg:flex w-[45%] 2xl:w-[43%] h-[90%] 2xl:h-[86%]   flex-col lg:gap-y-[5%]'>

                                    <div className='w-full h-[52.5%] border bg-white rounded-[10px] flex flex-col items-center shadow-2xl'>
                                        <div className='w-full h-16 border-b-1 flex items-center justify-between'>
                                            <p className='text-2xl font-medium ml-16'>More Detailed Info</p>
                                            <p className='mr-16 text-4xl text-[#743bfb]'><TbCalendarUser /></p>
                                        </div>
                                        {/* ------name-------- */}
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Full Name</p>
                                            <p className='w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].name || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Email</p>
                                            <p className='w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].email || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Phone</p>
                                            <p className='w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].phoneNumber || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Age</p>
                                            <p className='w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].age || ""}</p>
                                        </div>
                                        <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>Gender</p>
                                            <p className=' w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].gender || ""}</p>
                                        </div>
                                    </div>

                                    <div className='w-full h-[42.5%] border bg-white rounded-[10px] flex flex-col items-center shadow-2xl'>
                                        <div className='w-full h-16 border-b-1 flex items-center justify-between'>
                                            <p className='text-2xl font-medium ml-16'>Location Info</p>
                                            <p className='mr-16 text-3xl text-[#743bfb]'><CiLocationOn /></p>
                                        </div>
                                        <div className='flex w-[75%] items-center mt-2 '>
                                            <p className=' font-semibold mt-2 w-24 text-gray-500'>City</p>
                                            <p className='w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].city || ""}</p>
                                        </div>
                                        <div className='flex w-[75%] items-center  mt-2'>
                                            <p className='font-semibold mt-2 w-24 text-gray-500'>Country</p>
                                            <p className=' w-[50%] border-b-1 text-base xl:ml-6 2xl:ml-10 min-h-7'>{userInfo[0].country || ""}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </>}
        </main>
    )
};

export default Page;


