'use client'
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { useUserStore } from '@/stores/userStore';
import BackgroundAppointment from '@/assets/DoctorConsulting.png'
import Link from 'next/link';
import { useLoadingStore } from '@/stores/LoadingStore';
import Image from "next/image";

const AppointmentPageTopDiv = () => {
    const userInfo = useUserStore((state) => state.userInfo)
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);

    return (
        <div className={`bg-[#743bfb] w-full relative min-h-40 h-40 hidden  lg:flex justify-between items-center `} style={{ backgroundImage: `url(${BackgroundAppointment.src})`, backgroundSize: 'cover', backgroundPosition: 'center 15%' }}>
            <div className='absolute w-full h-full bg-gradient-to-b from-[#743bfb] via-[#743bfb] to-[#8e75c9] opacity-90 z-10'></div>

            <div className='flex text-white ml-[8%] items-center justify-center z-20'>
                <Image src={userInfo[0]?.photo ? userInfo[0].photo : ''} width={300} height={300} alt='Profile Image' className='w-32 h-32 object-cover rounded-[7px]' />
                <div className='ml-5 text-white'>
                    <p className='text-2xl font-bold tracking-wide'>{userInfo[0].name && userInfo[0]?.name || ""}</p>
                    <p className='text-sm tracking-wide mt-2 flex items-center '><span className='text-2xl mr-1'><CiLocationOn /></span> {userInfo[0].city && userInfo[0].city || ""}, {userInfo[0] && userInfo[0].country || ""}</p>
                </div>
            </div>u
            <div className='mr-[8%] text-white flex flex-col items-center justify-center z-20'>
                <p className='mb-1 tracking-wide font-medium flex items-center justify-center'>
                    APPOINTMENT<span className='ml-2 text-3xl'><RiArrowDropDownLine /></span>
                </p>
                <Link href={'/appointment'}>
                    <button className="text-[#743bfb] bg-white hover:bg-[#dfdede] py-2 px-6 md:py-2 md:px-10 font-semibold text-lg rounded-[8px] " onClick={() => setIsLoading(true)}>
                        Book now
                    </button>
                </Link>
                <p className='font-medium text-lg flex justify-center items-center mt-2'>$30 |<span className='text-sm ml-2'> per appointment </span></p>
            </div>
        </div>
    )
}

export default AppointmentPageTopDiv;