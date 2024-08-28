import { useUserStore } from "@/stores/userStore";
import MobileProfileDetails from "./MobileProfileDetails";
import ProfileDetailsForLargeScreens from "./ProfileDetailsForLargeScreens";
import Link from "next/link";
import Image from "next/image";
import img64 from "@/data/base64";

const FullProfileContainer = () => {
    const userInfo = useUserStore((state) => state.userInfo)
    return (
        <div className='w-full h-auto lg:h-[47rem] rounded-[10px] flex flex-col lg:flex-row items-center justify-center gap-x-[5%] py-5 lg:py-0 mb-24 lg:mb-0'
            style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)', backdropFilter: 'blur(5px)' }}>

            {/* -------Profile-------- */}
            <div className='bg-white w-[95%] sm:w-[90%] md:w-[85%] lg:w-[45%] 2xl:w-[43%] h-[90%] 2xl:h-[86%] border rounded-[10px] flex flex-col items-center shadow-xl' >
                <Image src={userInfo[0]?.photo ? userInfo[0].photo : ''} width={1200} height={1200} alt='profile' className='w-[11rem] h-[11rem] sm:w-[20rem] sm:h-[20rem] border object-cover rounded-[10px] mt-6' placeholder="blur" blurDataURL={img64}/>
                {/* <p className='text-2xl font-bold mt-6 w-full ml-[12%]'>My Profile</p> */}
                <p className='text-2xl sm:text-3xl font-medium mt-4 sm:mt-6'>{userInfo[0].name || ""}</p>
                <div className='flex w-full gap-x-[5%] justify-center mt-2 sm:mt-4'>
                    <p className='w-[40%] py-1 border-b-1 sm:text-lg'>{userInfo[0].name || ""}</p>
                    <p className='w-[40%] py-1 border-b-1 sm:text-lg'>{userInfo[0].phoneNumber || ""}</p>
                </div>
                <p className='w-[85%] py-1 border-b-1 sm:text-lg mt-4'>{userInfo[0].email || ""}</p>
                <Link href={'/dashboard/settings'}>
                    <button className='hidden lg:block bg-[#743bfb] text-white text-lg font-medium py-2 mt-12 rounded-3xl px-8'>Edit Profile</button>
                </Link>
                <MobileProfileDetails />
            </div>
            <ProfileDetailsForLargeScreens />
        </div>
    )
};

export default FullProfileContainer;