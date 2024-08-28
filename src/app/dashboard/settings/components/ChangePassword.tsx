import ToastMessage from "@/components/utils/ToastMessage";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

interface ChangePasswordProps {
    activeSettingButton: string;
    setActiveSettingButton: React.Dispatch<React.SetStateAction<string>>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ activeSettingButton, setActiveSettingButton }) => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const userInfo = useUserStore((state) => state.userInfo);
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

    return (

        <div className={`${activeSettingButton === "change-password" ? "flex" : "hidden"} bg-white w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] px-2 2xl:w-[65%] pt-4 lg:pt-0 pb-16 lg:pb-0 h-[90%] 2xl:h-[86%] border rounded-[10px] flex flex-col items-center shadow-xl relative`}>

            <p className='text-xl sm:text-3xl absolute top-2 left-2 lg:hidden cursor-pointer flex items-center justify-center'
                onClick={() => setActiveSettingButton("")}
            ><IoChevronBackOutline /><span className="text-sm sm:text-base">Back</span></p>
            <div className='flex flex-col w-full justify-center items-center mt-6'>
                <p className='text-2xl sm:text-[1.8rem] font-semibold text-[#743bfb] leading-7 tracking-wide'>Change Password</p>
                <p className="text-gray-600 text-sm font-medium">Securely update your account password</p>
            </div>
            <div className='flex flex-col mt-8 w-[95%] sm:w-[80%] md:w-[60%]'>
                <p className="text-gray-500 text-[12px] sm:text-sm font-medium">You are signed in as <strong> {userInfo[0]?.email} </strong></p>
                <label htmlFor="password" className="block text-gray-700 text-sm mb-1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='h-10 sm:h-12 border pl-2 w-[100%] text-sm sm:text-base outline-none rounded-[6px]'
                    placeholder="Your password"
                    required
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <div className='flex flex-col mt-4 sm:mt-6 w-[95%] sm:w-[80%] md:w-[60%]'>
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='h-10 sm:h-12 border pl-2 w-[100%] text-sm sm:text-base  outline-none rounded-[6px]'
                    placeholder="Confirm your password"
                    required
                />
                {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
            </div>
            <div className='flex flex-col mt-4 sm:mt-6 w-[95%] sm:w-[80%] md:w-[60%]'>
                <label htmlFor="confirmPassword" className="block text-sm sm:text-base  text-gray-700  mb-1">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='h-10 sm:h-12 border pl-2 w-[100%] text-sm sm:text-base  outline-none rounded-[6px]'
                    placeholder="Confirm your password"
                    required
                />
                {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
            </div>
            {/* Change Password Button */}
            <button
                className='h-10 bg-[#8045f7] hover:bg-[#9768f3] w-[95%] sm:w-[80%] md:w-[60%] mt-7 rounded-[7px] text-white mb-4'
                onClick={handleChangePassword}
            >
                Change Password
            </button>
        </div>
    )
};

export default ChangePassword;