'use client'
import React from "react";
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import Image from "next/image";
import BlogImage from '@/assets/DoctorConsulting.png'
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar item="Blogs" />
            <div
                className="flex w-full justify-center items-center bg-[#f9fdff">
                <div className={`flex flex-col justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto relative`}>
                    <h1 className="font-bold text-3xl">Our Blogs</h1>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-10 w-full gap-x-16 min-h-[35rem] mt-5">
                        <div className="w-[100%] sm:w-[28rem] min-h-[19rem] rounded-[6px]  bg-[#f2f2f2e0] flex flex-col items-center  p-2" >
                            <Image src={BlogImage} width={600} height={600} className="w-[97%] h-[10rem] rounded-xl mt-2 object-cover" alt="Nephara-Blogs" />
                            <h2 className="w-full text-lg font-semibold mt-2">How do we help you schedule appointments?</h2>
                            <p className="text-sm">In this blog post , you will learn about how we provide you virtual appointment with top doctors.</p>
                            <div className="w-full">
                                <button className="text-blue-400 cursor-pointer mt-2" onClick={()=>router.push('/blogs/affordable-skin-appointment')}>Read article</button>
                            </div>
                        </div>
                        <div className="w-[100%] sm:w-[28rem] min-h-[19rem] rounded-[6px]  bg-[#f2f2f2e0] flex flex-col items-center  p-2 " >
                            <Image src={BlogImage} width={600} height={600} className="w-[97%] h-[10rem] rounded-xl mt-2 object-cover" alt="Nephara-Blogs" />
                            <h2 className="w-full text-lg font-semibold mt-2">More Information about our doctor</h2>
                            <p className="text-sm w-full">In this blog post , you will learn more about our doctor.</p>
                            <div className="w-full">
                                <button className="text-blue-400 cursor-pointer mt-2" onClick={()=>router.push('/blogs/doctor-sara')}>Read article</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default Page;