'use client'
import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import {  useLazyQuery } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import ToastMessage from '@/components/utils/ToastMessage';
import Loader from '@/components/Loader';
import { useLoadingStore } from '@/stores/LoadingStore';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { getCookie } from '@/components/utils/Cookie';
import ProfileBackground from '@/assets/ProfilePage.png'
import TopProfileBar from './components/TopProfileBar';
import FullProfileContainer from './components/FullProfileContainer';
import { GET_USER_INFO } from '@/apollo_client/Queries';

const Page = () => {
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: "no-cache"
    });
    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const router = useRouter();
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)
    const isLoading = useLoadingStore((state) => state.isLoading)
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);

    useEffect(() => {
        const token = getCookie("token")
        let isMounted = true;

        const getUserInfo = async () => {
            try {
                if (token) {
                    if (!isAuthorized) {
                        const response = await getUserInfoByToken();

                        if (!isMounted) return;

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
            }
        };
        if (isMounted) {
            getUserInfo();
        }
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className='w-full h-screen flex  items-center justify-center bg-[#f6f8fc] relative' style={{ height: "100dvh" }}>
            {isLoading ? <Loader /> :
                <>
                    <Sidebar />
                    <div className='w-full h-full flex max-h-screen justify-center xl:justify-start overflow-auto ' style={{ backgroundImage: `url(${ProfileBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'right 5%' }}>
                        <div className="w-[95%] lg:w-[63rem]  xl:w-[79rem] h-[50rem] xl:ml-1 2xl:ml-[3%] xl:mr-1 2xl:mr-4 ">
                            <TopProfileBar />
                            <FullProfileContainer />
                        </div>
                    </div>
                </>}
        </main>
    )
};

export default Page;
