import ToastMessage from "@/components/utils/ToastMessage";
import { setCookie } from "@/components/utils/Cookie";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};

const LOGIN_USER = gql`
mutation LoginDoctor($email: String!, $password: String!) {
    loginDoctor(email: $email, password: $password) {
      status message name token
    }
  }
`
export const Signin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loginDoctor, { data: loginUserData, loading: loginUserLoading, error: loginUserError }] = useMutation(LOGIN_USER);
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
            const loginResponse = await loginDoctor({
                variables: {
                    "email": email,
                    "password": password
                }
            });
            const { status, message, token } = loginResponse.data.loginDoctor;
            ToastMessage(status, message);
            if (token) {
                setCookie(86400, "doctor-token", `Bearer ${token}`)
                router.push('/doctor/dashboard/appointments');
            }
        } catch (error) {
            ToastMessage('error', 'Internal Server Error')
        }
    };

    return (
        <div className='w-full lg:w-[50%] h-full  flex flex-col items-center'>
            <div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[75%] xl:w-[65%] 2xl:w-[50%] mt-[15%]'>
                <p className='text-4xl'>Sign in</p>
                <p className='font-semibold text-4xl mt-3'> 30-day free trial</p>
                <label htmlFor="email" className="block text-gray-700 text-sm mt-4 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full h-12 border rounded-[7px]  pl-2 outline-none border-gray-400 ${emailError ? "border-red-500" : ""
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
                    className={`w-full h-12  border rounded-[7px]  pl-2 outline-none border-gray-400 ${passwordError ? "border-red-500" : ""
                        }`}
                    placeholder="Your password"
                    required
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <Link href={'/auth/forgot-password'}>
                </Link>
                <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-10 w-full rounded-[7px] text-white' onClick={handleSignin}>Sign in</button>
            </div>
        </div>
    )
}
