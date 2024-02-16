"use client"
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Sidebar from '@/app/dashboard/components/sidebar';
import { Appointments } from '@/data/AppointmentData';
import { useDashboardStore } from '../../../stores/DashboardStore';
import AppointmentPageContainer from './components/AppointmentPageContainer';
import ToastMessage from '@/components/utils/ToastMessage';
import { gql, useLazyQuery } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useLoadingStore } from '@/stores/LoadingStore';
import Loader from '@/components/Loader';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { getCookie } from '@/components/utils/Cookie';

interface PageProps {
    params: {
        id: string;
    };
}
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


const Page: NextPage<PageProps> = ({ params }) => {
    const appointment = Appointments.find(appointment => appointment.appointment_id === params.id);
    const setAppointmentSelected = useDashboardStore((state) => state.setAppointmentSelected);
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: "no-cache"
    });

    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)
    const isLoading = useLoadingStore((state) => state.isLoading)
    const router = useRouter();
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);

    useEffect(() => {
        setAppointmentSelected(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        let isMounted = true; // Flag to track component mount state
        const token = getCookie("token");

        const getUserInfo = async () => {
            try {
                if (token) {
                    if (!isAuthorized) {

                        const response = await getUserInfoByToken();
                        console.log(response, "from useeffect from landing");

                        if (!isMounted) return; // Skip state updates if component is unmounted

                        const { status, message, user } = response.data.getUserInfoByToken;
                        if (user) {
                            setIsAuthorized(true)
                            setUserInfo({ email: user.email || '', name: user.name || '', photo: user.photo || '', gender: user.gender || '', age: user.age || 0, city: user.city || '', country: user.country || '', phoneNumber: user.phoneNumber || '' })
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
        <main className='w-full h-screen flex justify-center items-center bg-[#f6f8fc] relative'>
            { isLoading ? <Loader /> : 
                <>
                    <Sidebar />
                    <AppointmentPageContainer appointmentData={appointment} />
                </>}
        </main>
    );
}

export default Page;

