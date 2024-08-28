import { useUserStore } from "@/stores/userStore";
import { TbCalendarUser } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";

const ProfileDetailsForLargeScreens = () => {
    const userInfo = useUserStore((state) => state.userInfo)

    return (
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
    )
};

export default ProfileDetailsForLargeScreens;