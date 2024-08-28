'use client'
import { NODEMAILER_EMAIL } from "@/apollo_client/Mutation";
import ToastMessage from "@/components/utils/ToastMessage";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [emailSent, setEmailSent] = useState<Boolean>(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [nodemaileremail] = useMutation(NODEMAILER_EMAIL);

    const handleNextButtonClick = async () => {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setEmailError(null);

        try {
            const nodemailResponse = await nodemaileremail({
                variables: {
                    "email": email,
                }
            });
            const { status, message } = nodemailResponse.data.nodemaileremail;
            ToastMessage(status, message);
            if (status === "success") {
                setEmailSent(true);
            }
        } catch (error) {
            setEmailError("An error occurred. Please try again later.");
            ToastMessage('error', 'Internal Server Error')
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className='w-full lg:w-[50%] h-full  flex flex-col items-center '>
                {emailSent ?
                    (
                        <div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[75%] xl:w-[65%] 2xl:w-[50%] mt-[15%]'>
                            <p className='font-bold text-4xl mt-3'>Check Your Email</p>
                            <p className="text-sm text-gray-500 mt-4">
                                We have sent you an email with further instructions. Please check your inbox and click the provided link to proceed.
                            </p>
                            <Link href="/auth">
                                <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-10 w-full rounded-[7px] text-white'>
                                    Go to Login
                                </button>
                            </Link>
                        </div>
                    )
                    :
                    (<div className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-[75%] xl:w-[65%] 2xl:w-[50%] '>
                        <Link href="/auth">
                            <button className='text-4xl mt-4'><IoArrowBack /></button>
                        </Link>
                        <p className='font-bold text-4xl mt-[5%]'> Forgot Password? </p>
                        <p className="text-sm text-gray-500 mt-4">Please provide your email for verification.</p>
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
                        <button className='h-10 bg-[#8045f7] hover:bg-[#9768f3] mt-10 w-full rounded-[7px] text-white' onClick={handleNextButtonClick}>Next</button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Page;