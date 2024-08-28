'use client'
import React from 'react';
import Nurse from '@/assets/WhoWeAre.png'
import Image from "next/image";
import { useScroll, useTransform, motion } from 'framer-motion';
import img64 from '@/data/base64';

const WhoWeAre = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

    return (
        <motion.div
            style={{ opacity }}
            className="flex w-full justify-center items-center border-b-2">
            <div className="flex flex-col lg:flex-row justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto py-4 sm:py-8  xl:h-[35rem] ">
                <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[40%] xl:w-[50%] h-full flex justify-center items-center">
                    <Image src={Nurse} width={400} height={600} className="w-[90%] bg-contain rounded-[8px] " alt="Nephara Information" loading='lazy' placeholder='blur' blurDataURL={img64}/>
                </div>
                <div className=" w-[95%] md:w-[90%] lg:w-[57%] xl:w-[50%] h-[95%] flex flex-col justify-center items-center lg:items-start">
                    <p className="text-2xl sm:text-3xl text-[#a376ff] font-semibold lg:ml-6 mt-2 lg:mt-0">WHO WE ARE</p>
                    <p className=" text-sm sm:text-base md:text-lg tracking-wide lg:w-[100%] xl:w-[90%] 2xl:w-[80%] flex flex-wrap lg:ml-6 text-justify mt-1 xl:mt-4">At Nephara, we understand the frustration of navigating the complex healthcare system, especially when it comes to skin concerns. Our mission is to bridge the gap by offering online skincare services connecting individuals directly with specialist doctors. <br />
                        &nbsp;
                        We&apos;ve personally encountered the challenge of receiving timely referrals and experiencing the financial strain of accessing expert care. Committed to making quality dermatological expertise accessible, we&apos;ve curated a platform that prioritizes affordability without compromising on the excellence of our Specialist doctors. <br />
                        <br />
                        &nbsp;
                        Say goodbye to long waits and exorbitant costs – experience a seamless journey towards healthier, radiant skin with Nephara.</p>
                </div>
            </div>
        </motion.div>)
};

export default WhoWeAre;