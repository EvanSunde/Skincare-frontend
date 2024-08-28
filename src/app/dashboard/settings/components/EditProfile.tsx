import { UPDATE_USER } from "@/apollo_client/Mutation";
import { GET_USER_INFO } from "@/apollo_client/Queries";
import { getCookie } from "@/components/utils/Cookie";
import ToastMessage from "@/components/utils/ToastMessage";
import { useAuthorizedStore } from "@/stores/AuthorizedStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useUploadImageStore } from "@/stores/UploadImageStore";
import { useUserStore } from "@/stores/userStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { TbCameraPlus } from "react-icons/tb";
import img64 from "@/data/base64";

interface EditProfileProps {
    activeSettingButton: string;
    setActiveSettingButton: React.Dispatch<React.SetStateAction<string>>;
    windowWidth: number;
}

const EditProfile: React.FC<EditProfileProps> = ({ activeSettingButton, setActiveSettingButton, windowWidth }) => {
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO);
    const [updateUserDetails] = useMutation(UPDATE_USER);

    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const UserInfo = useUserStore((state) => state.userInfo);
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);

    const [fullName, setFullName] = useState(UserInfo[0]?.name ? UserInfo[0].name : '');
    const [phoneNumber, setPhoneNumber] = useState(UserInfo[0]?.phoneNumber ? UserInfo[0].phoneNumber : '');
    const [gender, setGender] = useState(UserInfo[0]?.gender ? UserInfo[0].gender : '');
    const [age, setAge] = useState(UserInfo[0]?.age ? UserInfo[0].age : '');
    const [city, setCity] = useState(UserInfo[0]?.city ? UserInfo[0].city : '');
    const [country, setCountry] = useState(UserInfo[0]?.country ? UserInfo[0].country : '');
    const setIsUploadPhotoOpen = useUploadImageStore((state) => state.setIsUploadPhotoOpen);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        const token = getCookie("token");

        const getUserInfo = async () => {
            try {
                if (token) {
                    if (!isAuthorized) {
                        if (!isMounted) return;
                        const response = await getUserInfoByToken();

                        const { user } = response.data.getUserInfoByToken;
                        if (user) {
                            setIsAuthorized(true)
                            setUserInfo({ email: user.email || '', name: user.name || '', photo: user.photo || '', gender: user.gender || '', age: user.age || 0, city: user.city || '', country: user.country || '', phoneNumber: user.phoneNumber || '' })
                            setFullName(user.name);
                            setGender(user.gender);
                            setAge(user.age);
                            setCity(user.city);
                            setCountry(user.country);
                            setPhoneNumber(user.phoneNumber)
                        }
                    }
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

    const handleUpdateUser = async () => {
        if (!fullName || !gender || !phoneNumber || !city || !country || +age < 5) {
            ToastMessage("error", "Please Fill all the fields correctly!")
            return;
        }
        const updateUserDetailsResponse = await updateUserDetails({
            variables: {
                "photo": "aman",
                "name": fullName,
                "age": +age,
                "gender": gender,
                "phoneNumber": phoneNumber,
                "city": city,
                "country": country
            }
        });
        if (updateUserDetailsResponse.data.updateUserDetails.name) {
            ToastMessage("success", "Profile Updated Successfully!")
            router.push('/dashboard/profile')
            window.location.reload();
        }
        else {
            ToastMessage("error", "Error Occured!Try again later!")
        }
    };

    return (

        <div className={`bg-white  ${windowWidth > 1024 && activeSettingButton !== "change-password" || activeSettingButton === "Edit" ? "flex" : "hidden"} w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] px-2 2xl:w-[65%] h-[90%] 2xl:h-[86%] border rounded-[10px] flex flex-col items-center shadow-xl relative`}>
            {/* --------Profile -------------- */}
            <p className='text-xl sm:text-3xl absolute top-2 left-2 lg:hidden cursor-pointer flex items-center justify-center'
                onClick={() => setActiveSettingButton("")}
            ><IoChevronBackOutline /><span className="text-sm sm:text-base">Back</span></p>
            <div className='flex w-full justify-center items-center mt-3 flex-col'>
                <p className='text-2xl sm:text-[1.8rem] mt-6 sm:mt-0 leading-6 font-semibold text-[#743bfb]  tracking-wide'>Edit Your Profile</p>
                <p className="text-gray-600 text-sm font-medium">Make sure your infos are correct.</p>
            </div>
            <div className='flex flex-col w-full justify-center items-center mt-3'>
                <Image src={UserInfo[0]?.photo ? UserInfo[0].photo : ''} width={200} height={200} alt='Profile Image' className='w-24 h-24 sm:w-32 sm:h-32 rounded-[8px] border object-cover' placeholder="blur" blurDataURL={img64} />
                <button className='flex items-center justify-center border-2 border-[#7e59e4] px-2 py-1 rounded-[8px] mt-2'>
                    <i className='text-xl'><TbCameraPlus /></i><p className='text-sm ml-2 font-medium' onClick={() => setIsUploadPhotoOpen(true)}>Change Avatar</p>
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-[6%] w-[95%] sm:w-[90%] md:w-[80%]">
                <div className='flex flex-col mt-3 md:mt-6 w-full sm:w-[47%]'>
                    <label className='text-gray-600 text-sm sm:text-base font-medium mb-1 '>
                        Full Name
                    </label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder='Enter your name...'
                        className='h-10 sm:h-12 text-sm sm:text-base border pl-2 w-[100%] outline-none rounded-[6px]'
                    />
                </div>
                <div className='flex flex-col mt-3 md:mt-6 w-full sm:w-[47%]'>
                    <label className='text-gray-600 text-sm sm:text-base font-medium mb-1 '>
                        Phone Number
                    </label>
                    <input
                        value={phoneNumber}
                        placeholder='Enter your number...'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className='h-10 sm:h-12 text-sm sm:text-base border pl-2 w-[100%] outline-none rounded-[6px]'
                    />
                </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-x-[6%] w-[95%] sm:w-[90%] md:w-[80%]'>
                <div className='flex flex-col mt-3 md:mt-6 w-full sm:w-[47%]'>
                    <label className='text-gray-600 text-sm sm:text-base font-medium mb-1 '>
                        Gender
                    </label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className='h-10 sm:h-12 text-sm sm:text-base border pl-2 w-[100%] outline-none rounded-[6px] bg-white'
                    >
                        <option value=''>
                            ----Select----
                        </option>
                        <option value="Male">
                            Male
                        </option>
                        <option value="Female">
                            Female
                        </option>
                        <option value="Others">
                            Others
                        </option>
                    </select>
                </div>
                <div className='flex flex-col mt-3 md:mt-6 w-full sm:w-[47%]'>
                    <label className='text-gray-600 text-sm sm:text-base font-medium mb-1 '>
                        Age
                    </label>
                    <input
                        value={age}
                        placeholder='Enter your age...'
                        onChange={(e) => setAge(e.target.value)}
                        className='h-10 sm:h-12 text-sm sm:text-base border pl-2 w-[100%] outline-none rounded-[6px] '
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-[6%] w-[95%] sm:w-[90%] md:w-[80%]">
                <div className='flex flex-col mt-3 md:mt-6 full sm:w-[47%]'>
                    <label className='text-gray-600 text-sm sm:text-base font-medium mb-1 '>
                        City
                    </label>
                    <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Enter your city...'
                        className='h-10 sm:h-12 text-sm sm:text-base border pl-2 w-[100%] outline-none rounded-[6px] '
                    />
                </div>
                <div className='flex flex-col mt-3 md:mt-6 w-full sm:w-[47%]'>
                    <label className='text-gray-600 text-sm sm:text-base font-medium mb-1 '>
                        Country
                    </label>
                    <input
                        value={country}
                        placeholder='Enter your country...'
                        onChange={(e) => setCountry(e.target.value)}
                        className='h-10 sm:h-12 text-sm sm:text-base border pl-2 w-[100%] outline-none rounded-[6px] '
                    />
                </div>
            </div>
            <button className={`w-[95%] sm:w-[90%] md:w-[80%] rounded-[8px] bg-[#7650e0] hover:bg-[#7e59e4] font-medium mt-4 sm:mt-8 text-lg py-2 text-white mb-24 lg:mb-0`} onClick={handleUpdateUser}>Save Changes</button>
        </div>
    )
};

export default EditProfile;