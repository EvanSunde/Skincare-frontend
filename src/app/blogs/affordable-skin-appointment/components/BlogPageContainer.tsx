'use client'
import Navbar from "@/components/navbar/Navbar";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import BlogImage from '@/assets/DoctorConsulting.png'
import { useLazyQuery } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { useLoadingStore } from '@/stores/LoadingStore';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import Loader from '@/components/Loader';
import BlogNavigationBox from "@/app/blogs/affordable-skin-appointment/components/BlogNavigationBox";
import { getUserInfo } from "@/components/utils/GetUserInfo";
import BlogContent from "./BlogContent";
import { GET_USER_INFO } from "@/apollo_client/Queries";

const BlogPageContainer = () => {
    const router = useRouter();
    const isLoading = useLoadingStore((state) => state.isLoading);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: "no-cache"
    });
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    useEffect(() => {
        getUserInfo(isAuthorized, setIsAuthorized, getUserInfoByToken, setUserInfo);
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className='bg-[#f9fdff]'>
            {isLoading ?
                <div className='w-full h-screen flex items-center justify-center'>
                    <Loader />
                </div> :
                <>
                    <Navbar item="Blogs" />
                    <div
                        className="flex w-full justify-center items-center bg-[#f9fdff">
                        <div className={`flex flex-col justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto relative`}>
                            <div className='absolute top-4 left-4 flex items-center justify-center font-semibold cursor-pointer' onClick={() => router.back()}>
                                <i className='text-lg sm:text-xl sm:mr-2'><IoIosArrowBack /> </i>
                                <p className='text-base sm:text-lg'>Back</p>
                            </div>
                            <p className='bg-[#f6f6f6] mt-10 text-[#868585] px-3 rounded-[12px]'>About Us</p>
                            <p className='mt-4 text-2xl md:text-3xl font-medium w-full sm:w-[85%] md::w-[75%] xl:w-[50%] flex flex-wrap text-center '>How do we help you schedule an appointment with specialist?</p>
                            <Image src={BlogImage} width={1200} height={700} alt='Skin-Appointment-Blog' className='w-full sm:w-[90%] border mt-4 rounded-[12px] h-[20rem] md:h-[30rem] object-cover' />
                            <div className='w-full h-auto bg-red flex flex-col lg:flex-row items-center lg:items-start mt-10 mb-10 justify-center'>
                                <BlogNavigationBox />
                                <BlogContent />
                            </div>
                        </div>
                    </div>
                </>}
        </main>
    )
}

export default BlogPageContainer;
