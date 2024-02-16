'use client'
import React, { useEffect, useState } from 'react'
import { Signin, Signup } from './components/AuthFormComponent'
import { gql, useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import ToastMessage from '@/components/utils/ToastMessage'
import { useLoadingStore } from '@/stores/LoadingStore'
import Loader from '@/components/Loader'
import { useAuthorizedStore } from '@/stores/AuthorizedStore'
import { getCookie } from '@/components/utils/Cookie'


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
    const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(true)
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: "no-cache"
    });
    const isLoading = useLoadingStore((state) => state.isLoading);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const router = useRouter();
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);

    useEffect(() => {
        let isMounted = true; // Flag to track component mount state
        const token = getCookie("token");
        const getUserInfo = async () => {
            try {
                if (token) {
                    if (!isAuthorized) {
                        const response = await getUserInfoByToken();

                        if (!isMounted) return; // Skip state updates if component is unmounted

                        const { status, message, user } = response.data.getUserInfoByToken;
                        if (user) {
                            setUserInfo({ email: user.email, name: user.name, photo: user.photo, gender: user.gender, age: user.age, city: user.city, country: user.country,phoneNumber:user.phoneNumber })
                        }
                        if (status === 'success' && message === 'Authorized Token!') {
                            console.log("scucess auth")
                            router.replace('/dashboard/appointments')
                            ToastMessage("success", "Already Signed in!")
                            setIsAuthorized(true)
                            return

                        } else if (status === 'error' && message === 'Internal server error') {
                            console.log("unauth")
                            ToastMessage(status, message)
                        }
                    }
                }
                setIsLoading(false)
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
        <div className="flex w-full justify-center items-center bg-white">
            <div className="flex flex-col lg:flex-row justify-center items-center w-full xl:max-w-[95rem] 2xl:w-full 2xl:max-w-[120rem] 2xl:h-screen 2xl:max-h-[83rem]  h-screen">
                {isLoading ? <Loader /> : (
                    isSignUpOpen ? <Signup setIsSignUpOpen={setIsSignUpOpen} /> : <Signin setIsSignUpOpen={setIsSignUpOpen} />
                )}
            </div>
        </div>
    );
}

export default Page;
