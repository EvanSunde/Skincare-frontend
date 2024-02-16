'use client'
import React, { useEffect, useState } from 'react';
// import AppointmentInfo from '../appointments/components/AppointmentInfo';
import Sidebar from '../components/sidebar';
import { MdNavigateNext } from "react-icons/md";
import { SlLock, SlLogout } from "react-icons/sl";
import { LuUserSquare2 } from "react-icons/lu";
import { useLogoutStore } from '@/stores/LogoutStore';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import ToastMessage from '@/components/utils/ToastMessage';
import { useLoadingStore } from '@/stores/LoadingStore';
import Loader from '@/components/Loader';
import Image from 'next/image';
import Profile from '@/assets/Emma.png';
import { TbCameraPlus } from "react-icons/tb";
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { getCookie } from '@/components/utils/Cookie';
import { IoArrowBack } from "react-icons/io5";


const UPDATE_USER = gql`
mutation UpdateUserDetails($photo: String!, $name: String!, $age: Int!, $gender: String!, $phoneNumber: String!, $city: String!, $country: String!) {
    updateUserDetails(photo: $photo, name: $name, age: $age, gender: $gender, phoneNumber: $phoneNumber, city: $city, country: $country) {
      city,country,gender,phoneNumber,photo,name
    }
  }`;

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
    const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen);
    const [updateUserDetails] = useMutation(UPDATE_USER);
    const [activeSettingButton, setActiveSettingButton] = useState<string>('');
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO);
    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const UserInfo = useUserStore((state) => state.userInfo);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    const router = useRouter();

    const [fullName, setFullName] = useState(UserInfo[0]?.name ? UserInfo[0].name : '');
    const [phoneNumber, setPhoneNumber] = useState(UserInfo[0]?.phoneNumber ? UserInfo[0].phoneNumber : '');
    const [gender, setGender] = useState(UserInfo[0]?.gender ? UserInfo[0].gender : '');
    const [age, setAge] = useState(UserInfo[0]?.age ? UserInfo[0].age : '');
    const [city, setCity] = useState(UserInfo[0]?.city ? UserInfo[0].city : '');
    const [country, setCountry] = useState(UserInfo[0]?.country ? UserInfo[0].country : '');
    const isLoading = useLoadingStore((state) => state.isLoading)
    const setIsLoading = useLoadingStore((state) => state.setIsLoading)
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);


    // ------Chnage password---------
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const handleChangePassword = async () => {
        try {
            setPasswordError(null);
            setConfirmPasswordError(null);

            if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters");
                return;
            }

            if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
                return;
            }

        } catch (error) {
            ToastMessage('error', 'Internal Server Error')
        }
    };




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
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);

        };
        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            setFullName(user.name);
                            setGender(user.gender);
                            setAge(user.age);
                            setCity(user.city);
                            setCountry(user.country);
                            setPhoneNumber(user.phoneNumber)
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

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    }

    return (
        <main className='w-full h-screen flex justify-center lg:justify-start bg-[#f6f8fc] relative'>
            {
                isLoading ? <Loader /> :
                    <>
                        <Sidebar />
                        <div className={`${windowWidth > 1024 || activeSettingButton === "" ? "block" : "hidden"} ${activeSettingButton === 'Edit' ? "block" : ""} ${windowWidth > 1024 ? "" : "flex w-[85%] h-full pb-20 items-center flex-col overflow-auto"} lg:w-[20%]  lg:min-w-[20rem] lg:max-w-[25rem] lg:h-full px-2 lg:ml-8`}>
                            <p className={`text-3xl sm:text-4xl lg:text-3xl font-semibold lg:mt-20  tracking-wide xl:mt-10 ${windowWidth > 1024 ? "" : "text-[#743bfb]"}`}>Account Settings</p>
                            <ul className='w-full mt-12'>
                                <li className='border-b-2 font-medium h-16 flex justify-between items-center cursor-pointer' onClick={() => setActiveSettingButton("Edit")}>
                                    <p className='flex items-center text-lg ml-2'><span className='text-3xl mr-3'><LuUserSquare2 /></span>Edit Profile</p>
                                    <i className='text-3xl mr-2'><MdNavigateNext /></i>
                                </li>
                                <li className='border-b-2 font-medium h-16 flex justify-between items-center cursor-pointer' onClick={() => setActiveSettingButton("change-password")}>
                                    <p className='flex items-center text-lg ml-2'><span className='text-3xl mr-3'><SlLock /></span>Change Password</p>
                                    <i className='text-3xl mr-2'><MdNavigateNext /></i>
                                </li>
                                <li className='font-medium h-16 flex justify-between items-center cursor-pointer text-red-700' onClick={handleLogout}>
                                    <p className='flex items-center text-lg ml-2 '><span className='text-3xl mr-3 '><SlLogout /></span>Log Out</p>
                                    <i className='text-3xl mr-2'><MdNavigateNext /></i>
                                </li>
                            </ul>
                        </div>


                        <div className={` ${windowWidth > 1024 && activeSettingButton !== "change-password" || activeSettingButton === "Edit" ? "flex" : "hidden"} w-full h-auto   lg:w-[70%] xl:w-[50%] justify-center border lg:ml-[5%] bg-[#f6f8fc] overflow-auto max-h-screen `}>
                            <div className='w-[95%] md:w-[75%] xl:w-[70%] 2xl:w-[60%] relative'>
                                <p className='text-4xl absolute top-2 left-3 lg:hidden cursor-pointer' onClick={() => setActiveSettingButton("")}><IoArrowBack /></p>
                                <div className='flex w-full justify-center items-center mt-2 lg:mt-8'>
                                    <p className=' text-4xl font-semibold text-[#743bfb]  tracking-wide'>Edit Your Profile</p>
                                </div>
                                <div className='flex flex-col w-full justify-center items-center mt-3'>
                                    <Image src={Profile} width={200} height={200} alt='Profile Image' className='w-32 h-32 rounded-[8px] border' />
                                    <div className='flex items-center justify-center border-2 border-[#7e59e4] w-40 py-2 rounded-[8px] mt-2 cursor-pointer'>
                                        <i className='text-xl'><TbCameraPlus /></i><p className='text-sm ml-2 font-medium'>Change Avatar</p>
                                    </div>
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <label className='text-gray-600 font-medium mb-1 '>
                                        Full Name
                                    </label>
                                    <input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder='Enter your name...'
                                        className='h-12 border pl-2 w-[100%] outline-none rounded-[6px] text-lg'
                                    />
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <label className='text-gray-600 font-medium mb-1 '>
                                        Phone Number
                                    </label>
                                    <input
                                        value={phoneNumber}
                                        placeholder='Enter your number...'
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className='h-12 border pl-2 w-[100%] outline-none rounded-[6px] text-lg'
                                    />
                                </div>
                                <div className='flex gap-x-[6%] w-full'>
                                    <div className='flex flex-col mt-6 w-[47%]'>
                                        <label className='text-gray-600 font-medium mb-1 '>
                                            Gender
                                        </label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className='h-12 border pl-2 w-[100%] outline-none rounded-[6px] text-lg bg-white'
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
                                    <div className='flex flex-col mt-6 w-[47%]'>
                                        <label className='text-gray-600 font-medium mb-1 '>
                                            Age
                                        </label>
                                        <input
                                            value={age}
                                            placeholder='Enter your age...'
                                            onChange={(e) => setAge(e.target.value)}
                                            className='h-12 border pl-2 w-[100%] outline-none rounded-[6px] text-lg'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <label className='text-gray-600 font-medium mb-1 '>
                                        City
                                    </label>
                                    <input
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder='Enter your city...'
                                        className='h-12 border pl-2 w-[100%] outline-none rounded-[6px] text-lg'
                                    />
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <label className='text-gray-600 font-medium mb-1 '>
                                        Country
                                    </label>
                                    <input
                                        value={country}
                                        placeholder='Enter your country...'
                                        onChange={(e) => setCountry(e.target.value)}
                                        className='h-12 border pl-2 w-[100%] outline-none rounded-[6px] text-lg'
                                    />
                                </div>
                                <button className={`w-full rounded-[8px] bg-[#7650e0] hover:bg-[#7e59e4] font-medium mt-8 text-lg py-2 text-white mb-24 lg:mb-0`} onClick={handleUpdateUser}>Save Changes</button>
                            </div>
                        </div>



                        {/* -------change password------- */}
                        <div className={`${activeSettingButton === "change-password" ? "flex" : "hidden"} w-full h-auto   lg:w-[70%] xl:w-[50%] justify-center border lg:ml-[5%] bg-[#f6f8fc] overflow-auto max-h-screen `}>
                            <div className='w-[95%] md:w-[75%] xl:w-[70%] 2xl:w-[50%] relative'>
                                <p className='text-4xl absolute top-2 left-3 lg:hidden cursor-pointer' onClick={() => setActiveSettingButton("")}><IoArrowBack /></p>
                                <div className='flex w-full justify-center items-center'>
                                    <p className='mt-2 lg:mt-8 text-4xl font-semibold text-[#743bfb]  tracking-wide'>Change Password</p>
                                </div>

                                <div className='flex flex-col mt-6'>
                                    <label htmlFor="password" className="block text-gray-700 text-sm mt-4 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full h-12  border rounded-[7px]  pl-2 outline-none border-gray-400 ${passwordError ? "border-red-500" : ""
                                            }`}
                                        placeholder="Your password"
                                        required
                                    />
                                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mt-4 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full h-12  border rounded-[7px]  pl-2 outline-none border-gray-400 ${confirmPasswordError ? "border-red-500" : ""
                                            }`}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                                </div>
                                {/* Change Password Button */}
                                <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-10 w-full rounded-[7px] text-white' onClick={handleChangePassword}>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </>
            }

            {/* <AppointmentInfo/> */}
        </main>
    )
};

export default Page;


