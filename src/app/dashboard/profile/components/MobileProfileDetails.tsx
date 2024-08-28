import { useUserStore } from "@/stores/userStore";
import { TbCalendarUser } from "react-icons/tb";

const MobileProfileDetails = () => {
    const userInfo = useUserStore((state) => state.userInfo)

    return (<>
        {/* ---------------More detailed Info for mobiles-------------- */}
        < div className=' lg:hidden mt-6 w-full sm:w-[90%] bg-white flex flex-col items-center ' >
            <div className='w-full h-12 md:h-16 border-b-1 flex items-center justify-between'>
                <p className='text-lg sm:text-xl md:text-2xl font-semibold ml-6 sm:ml-10'>More Detailed Info</p>
                <p className='mr-6 sm:mr-16 text-2xl md:text-3xl text-[#743bfb]'><TbCalendarUser /></p>
            </div>
            {/* ------name-------- */}
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                <p className=' font-semibold mt-2 w-20 sm:w-24 text-gray-600 text-sm sm:text-base'>Full Name</p>
                <p className='w-[50%] border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].name || ""}</p>
            </div>
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                <p className=' font-semibold mt-2 w-20 sm:w-24 text-gray-500 text-sm sm:text-base'>Email</p>
                <p className='min-w-min w-[50%]  border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].email || ""}</p>
            </div>
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                <p className=' font-semibold mt-2 w-20 sm:w-24 text-gray-500 text-sm sm:text-base'>Phone</p>
                <p className='w-[50%] border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].phoneNumber || ""}</p>
            </div>
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                <p className='font-semibold mt-2 w-20 sm:w-24 text-gray-500 text-sm sm:text-base'>Age</p>
                <p className='w-[50%] border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].age || ""}</p>
            </div>
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                <p className=' font-semibold mt-2 w-20 sm:w-24 text-gray-500 text-sm sm:text-base'>Gender</p>
                <p className=' w-[50%] border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].gender || ""}</p>
            </div>
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 '>
                <p className=' font-semibold mt-2 w-20 sm:w-24 text-gray-500 text-sm sm:text-base'>City</p>
                <p className='w-[50%] border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].city || ""}</p>
            </div>
            <div className='flex w-[85%] 2xl:w-[75%] items-center mt-3 mb-8'>
                <p className=' font-semibold mt-2 w-20 sm:w-24 text-gray-500 text-sm sm:text-base'>Country</p>
                <p className=' w-[50%] border-b-1 text-base md:text-lg sm:ml-10 md:ml-14 min-h-7'>{userInfo[0].country || ""}</p>
            </div>
        </div >
    </>

    )
};

export default MobileProfileDetails;