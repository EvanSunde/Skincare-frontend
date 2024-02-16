'use client'
import React, { useState } from 'react';
import { NextPage } from 'next';
import { gql, useMutation } from '@apollo/client';
import ToastMessage from "@/components/utils/ToastMessage";
import Link from 'next/link';

interface PageProps {
    params: {
        token: string;
    };
}

const RESET_PASSWORD = gql`
    mutation ResetPassword($newPassword: String!, $sentToken: String!) {
        resetPassword(newPassword: $newPassword, sentToken: $sentToken) {
        message,status
    }
  }
`;
const Page: NextPage<PageProps> = ({ params }) => {
    const [password, setPassword] = useState<string>("");
    const [passwordChanged, setPasswordChanged] = useState<Boolean>(false);
    const [resetPassword, { data: resetPasswordData, loading: resetPasswordLoading, error: resetPasswordError }] = useMutation(RESET_PASSWORD);
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
            const resetPasswordResponse = await resetPassword({
                variables: {
                    newPassword: password,
                    sentToken: params.token,
                },
            });
            const { status, message } = resetPasswordResponse.data.resetPassword;
            ToastMessage(status, message);
            if (status === "success") {
                setPasswordChanged(true);
            }
            console.log(resetPasswordResponse)
        } catch (error) {
            ToastMessage('error', 'Internal Server Error')
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className='w-full lg:w-[50%] h-full  flex flex-col items-center '>
                {passwordChanged ?
                    (
                        <div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[75%] xl:w-[65%] 2xl:w-[50%] mt-[15%]'>
                        <p className='font-bold text-4xl mt-3'>Check Your Email</p>
                        <p className="text-sm text-gray-500 mt-4">
                            Password changed successfully.You can now login with your new password.
                        </p>
                        <Link href="/auth">
                            <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-10 w-full rounded-[7px] text-white'>
                                Go to Login
                            </button>
                        </Link>
                    </div>
                    )
                    :
                    (<div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[75%] xl:w-[65%] 2xl:w-[50%] mt-[15%]'>
                        <p className='font-bold text-4xl mt-3'> Forgot Password? </p>
                        <p className="text-sm text-gray-500 mt-4">Please provide your email for verification.</p>

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

                        {/* Change Password Button */}
                        <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-10 w-full rounded-[7px] text-white' onClick={handleChangePassword}>
                            Change Password
                        </button>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default Page;
