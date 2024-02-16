import React from 'react';
import Nurse from '@/assets/nurse-smile.jpg'
import Image from "next/image";
import { useViewportScroll, useTransform, motion } from 'framer-motion';

const WhoWeAre = () => {

    const { scrollYProgress } = useViewportScroll();
    const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  
    return (
        <motion.div 
        style={{ opacity }}
        // initial={{ opacity: 0 }} 
        // whileInView={{ opacity: 1 }}
        // viewport={{ once: false }}          
        className="flex w-full justify-center items-center border-b-2 bg-white">
            <div className="flex flex-col lg:flex-row justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto py-8 xl:h-[35rem] ">
                <div className="w-[80%] lg:w-[40%] xl:w-[50%] h-full flex justify-center items-center">
                    <Image src={Nurse} width={400} height={600} className="w-[90%] bg-contain rounded-[8px] " alt="Nurse" />
                </div>
                <div className=" w-[95%] md:w-[90%] lg:w-[57%] xl:w-[50%] h-full flex flex-col justify-center items-center lg:items-start">
                    <p className="text-3xl text-[#a376ff] font-semibold ml-6 mt-6 lg:mt-0">WHO WE ARE</p>
                    <p className="text-base md:text-lg tracking-wide lg:w-[100%] xl:w-[90%] 2xl:w-[80%] flex flex-wrap lg:ml-6 text-justify mt-2 xl:mt-4">We are a service-based company dedicated to bridging the gap in skin check-ups, especially for international students in first-world countries. Recognizing the challenges posed by high medical costs, we connect individuals with expert doctors from South Asia. <br /> Our mission is to make quality dermatological care accessible, ensuring that everyone, regardless of their location or financial constraints, can prioritize their skin health without the burden of exorbitant medical expenses.</p>
                </div>
            </div>
        </motion.div>)
}

export default WhoWeAre