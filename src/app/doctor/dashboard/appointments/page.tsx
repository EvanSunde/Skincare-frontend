"use client"
import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { Appointments } from '@/data/AppointmentData';
import AppointmentContainer from './components/AppointmentContainer';
import { useDashboardStore } from '@/stores/DashboardStore';
import Profile from '@/assets/beautiful-nurse.png'
import { useLogoutStore } from '@/stores/LogoutStore';
import { IoMdArrowDropdown } from 'react-icons/io';
import Image from 'next/image';
import { useLazyQuery } from '@apollo/client';
import { getCookie } from '@/components/utils/Cookie';
import ToastMessage from '@/components/utils/ToastMessage';
import { useDoctorStore } from '@/stores/DoctorStore';
import { useRouter } from 'next/navigation';
import { useLoadingStore } from '@/stores/LoadingStore';
import Loader from '@/components/Loader';
import { GET_DOCTOR_APPOINTMENTS, GET_DOCTOR_INFO_BY_TOKEN } from '@/apollo_client/Queries';
import { useDoctorArrayStore } from '@/stores/DoctorAppointmentArray';

interface PageProps {
    params: {
        id: string;
    };
}

const Page: NextPage<PageProps> = ({ params }) => {
    const [getDoctorInfoByToken] = useLazyQuery(GET_DOCTOR_INFO_BY_TOKEN, {
        fetchPolicy: "no-cache"
    });
    const [getAllAppointmentsForDoctor] = useLazyQuery(GET_DOCTOR_APPOINTMENTS, {
        fetchPolicy: "no-cache"
    });
    // const appointment = Appointments.find(appointment => appointment.appointment_id === params.id);
    const setAppointmentSelected = useDashboardStore((state) => state.setAppointmentSelected);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen)
    const setName = useDoctorStore((state) => state.setName);
    const setEmail = useDoctorStore((state) => state.setEmail);
    const doctorName = useDoctorStore((state) => state.name);
    const router = useRouter();
    const isLoading = useLoadingStore((state) => state.isLoading);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    const DoctorArray = useDoctorArrayStore((state) => state.DoctorArrayStore);
    const setDoctorArray = useDoctorArrayStore((state) => state.setDoctorArrayStore);
    const appointment = DoctorArray.find(appointment => appointment._id === params.id);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const getAppointments = async () => {
            try {
                if (DoctorArray.length === 0) {
                    const response = await getAllAppointmentsForDoctor();
                    const appointmentsFromResponse = response.data.getAllAppointmentsForDoctor.appointments;
                    setDoctorArray(appointmentsFromResponse);
                    console.log(response.data.getAllAppointmentsForDoctor.appointments, "response from get appointments");
                }
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            }
        };
        getAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        const cookieName = 'doctor-token';
        const cookiePath = '/';
        const domain = window.location.hostname;
        const existingCookie = document.cookie
          .split(';')
          .map((c) => c.trim())
          .find((cookie) => cookie.startsWith(`${cookieName}=`));
    
        if (existingCookie) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePath}; domain=${domain};`;
          ToastMessage('success', 'Logged out successfully');
          setIsLogoutModalOpen(false);
          setIsLoading(true);
          router.replace('/');
          window.location.reload();
        }
    };

    useEffect(() => {
        setIsLoading(true)
        const getDoctorInfo = async () => {
            const token = getCookie("doctor-token");
            const tokenParts = token.split(" ");

            if (token) {
                const response = await getDoctorInfoByToken({
                    variables: {
                        token: tokenParts[1] || ''
                    }
                });
                console.log(response, "from useeffect from landing")
                const { status, message, name, email } = response.data.getDoctorInfoByToken;
                if (name && email) {
                    setName(name);
                    setEmail(email)
                    setIsLoading(false);
                    return;
                }
                else {
                    ToastMessage(status, message)
                    router.replace("/")
                }
            }
            router.replace("/")
        }
        getDoctorInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
        setAppointmentSelected(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className='w-full h-auto min-h-screen flex flex-col  items-center bg-[#f6f8fc] relative'>
            {isLoading ?
                <div className='w-full h-screen grid items-center'><Loader /> </div> :
                <>
                    {/* ------------Top bar------------ */}
                    <div className='w-full min-h-20 lg:mt-4 xl:mt-0 2xl:min-h-24 flex items-center justify-between border-b-2'>
                        <div className='lg:ml-16 xl:ml-14'>
                            <p className='text-2xl lg:text-3xl font-semibold'>Dr. {doctorName}</p>
                            <p className='text-sm lg:text-base text-gray-700'>Welcome to Nephara Skincare!</p>
                        </div>
                        <div className="flex items-center justify-center mr-[10%] relative cursor-pointer" onClick={handleDropdownToggle} >
                            <Image src={Profile} alt='Profile' width={100} height={100} className='w-14 h-14 border rounded-full object-cover' placeholder='blur' blurDataURL={"data:image/jpeg;base64,/9j//gAQTGF2YzYwLjMxLjEwMgD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xABqAAEBAQEAAAAAAAAAAAAAAAAGBAMHAQEBAQAAAAAAAAAAAAAAAAAAAQIQAAEDAwIGAwEAAAAAAAAAAAIDBAEABRIhEUExFAdREyIyBqERAAMBAAIDAQAAAAAAAAAAAAABEQISITGBQQP/wAARCAAJABQDARIAAhIAAxIA/9oADAMBAAIRAxEAPwDg7SLfOfVm4DlgSAgfnfISkf4VYRzmgAFnbhv20Wv5j+oVUNl0xYA9VcMm8q5DkUq26FVfYmnlKKZYpmX2KNIknwrX5ZzraWtLKvbdk9GS5aVqvRCq7jbRur8bYoqbCHTiGRraKk2hQvSSkbR8pT2mdI14VJV1x5a4tvNcvmfCAH//2Q=="}/>
                            <p className='ml-3 font-semibold lg:text-lg'>Welcome {doctorName}</p>
                            <i className='text-2xl ml-3 cursor-pointer'><IoMdArrowDropdown /></i>
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-[80%] mt-2 bg-white border border-gray-200 shadow-xl z-40 p-1 rounded-[8px]" ref={dropdownRef}>
                                    <ul>
                                        {/* <li className="px-6 py-2 font-semibold rounded-[8px] hover:bg-[#743bfb] hover:text-white cursor-pointer" ></li> */}
                                        <li className="px-6 w-32 py-2 font-semibold rounded-[8px] hover:bg-[#743bfb] hover:text-white cursor-pointer" onClick={handleLogout}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <AppointmentContainer appointmentData={appointment} />
                </>}
        </main>
    );
}

export default Page;

