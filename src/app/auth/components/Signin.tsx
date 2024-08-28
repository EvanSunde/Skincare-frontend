import ToastMessage from "@/components/utils/ToastMessage";
import { setCookie } from "@/components/utils/Cookie";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { validateEmail, validatePassword } from "./ValidateFunction";
import { LOGIN_USER } from "@/apollo_client/Mutation";

interface AuthProps {
    setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signin: React.FC<AuthProps> = ({ setIsSignUpOpen }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loginUser] = useMutation(LOGIN_USER);
    const router = useRouter();

    const handleSignin = async () => {
        try {
            setEmailError(null);
            setPasswordError(null);

            if (!validateEmail(email)) {
                setEmailError("Invalid email format");
                return;
            }
            if (!validatePassword(password)) {
                setPasswordError("Password must be at least 8 characters");
                return;
            }
            const loginResponse = await loginUser({
                variables: {
                    "email": email,
                    "password": password
                }
            });
            const { status, message, token } = loginResponse.data.loginUser;
            ToastMessage(status, message);
            if (token) {
                setCookie(604800, "token", `Bearer ${token}`)
                window.location.reload();
                router.replace('/dashboard/profile');
            }
        } catch (error) {
            ToastMessage('error', 'Internal Server Error');
        }
    };


    const handleSignInAsGuest = async () => {
        const loginResponse = await loginUser({
            variables: {
                "email": "bhujelaman20@gmail.com",
                "password": "amanamanaman"
            }
        });

        const { status, message, token } = loginResponse.data.loginUser;
        ToastMessage(status, message);
        if (token) {
            setCookie(604800, "token", `Bearer ${token}`)
            window.location.reload();
            router.replace('/dashboard/profile');
        }

    }

    return (
        <div className="w-full h-full flex items-start sm:items-center justify-start sm:justify-center" style={{ height: "100svh" }}>
            <div className="w-full lg:w-[50%] xl:w-[45%] 2xl:w-[40%] min-h-fit flex flex-col  lg:border rounded-[10px] lg:shadow-xl mt-10 sm:mt-0 justify-center items-center">
                <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[80%] xl:w-[80%] 2xl:w-[70%] ">
                    <p className='text-3xl sm:text-4xl mt-4 sm:mt-8'>Sign in</p>
                    <p className='font-semibold text-3xl sm:text-4xl mt-1 sm:mt-3'> 30-day free trial</p>
                    <button className='w-full  h-10 sm:h-12 text-sm sm:text-base  mt-6 sm:mt-10 md:mt-14 border rounded-[7px] flex items-center justify-center shadow-lg' onClick={handleSignInAsGuest}><i className='text-xl mr-4'><FcGoogle /></i>Sign in as Guest</button>
                    <p className='mt-3 sm:mt-6 mb-3 sm:mb-6 relative text-center'>
                        <span className="absolute left-0 top-1/2 w-[40%] bg-gray-300 h-px transform -translate-y-1/2"></span>
                        <span className="inline-block mx-4">OR</span>
                        <span className="absolute right-0 top-1/2 w-[40%] bg-gray-300 h-px transform -translate-y-1/2"></span>
                    </p>
                    <label htmlFor="email" className="block text-gray-700 text-sm mt-2 sm:mt-4 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full text-sm sm:text-base h-10 sm:h-12 border rounded-[7px]  pl-2 outline-none border-gray-400 ${emailError ? "border-red-500" : ""
                            }`}
                        placeholder="Enter your email"
                        required
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    <label htmlFor="password" className="block text-gray-700 text-sm mt-4 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full text-sm sm:text-base h-10 sm:h-12  border rounded-[7px]  pl-2 outline-none border-gray-400 ${passwordError ? "border-red-500" : ""
                            }`}
                        placeholder="Your password"
                        required
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <Link href={'/auth/forgot-password'}>
                        <p className='text-sm font-medium  text-blue-500 flex w-full mt-1 cursor-pointer hover:underline justify-end'>Forgot Password?</p>
                    </Link>
                    <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-4 sm:mt-6 w-full rounded-[7px] text-white' onClick={handleSignin}>Sign in</button>
                    <p className='flex items-center text-sm sm:text-base justify-center w-full mt-4 mb-8'>Dont have an account? <span className='text-blue-500 cursor-pointer ml-2 hover:underline' onClick={() => setIsSignUpOpen(true)}>Sign up </span></p>
                </div>
            </div>
        </div>
    )
}
