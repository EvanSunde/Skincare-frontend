'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { useViewportScroll,useTransform,motion} from "framer-motion"

const Services = () => {
    const serviceRef = useRef<HTMLDivElement>(null);
    const [startAnimation, setStartAnimation] = useState<Boolean>(false);
    const { scrollYProgress } = useViewportScroll();
    const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  

    const handleScroll = () => {
        if (serviceRef.current) {
            const elementTop = serviceRef.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            setStartAnimation(elementTop < windowHeight);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
                // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    return ( 
        <div ref={serviceRef} 
        // initial={{ opacity: 0, y: 100 }} 
        // animate={{ opacity: startAnimation ? 1 : 0, y: startAnimation ? 0 : 100 }} 
        // transition={{ duration: 1 }}
         
        className="flex w-full justify-center items-center border-b-2 bg-white">
            <div className={`flex justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto `}>
                <div className="flex flex-col w-full justify-center items-center py-6 ">
                    <p className="text-[#a376ff] font-bold">Features</p>
                    <h1 className="text-3xl font-bold mt-1">Our Service Features</h1>
                    <div className="flex w-full flex-col lg:flex-row lg:gap-x-[5%] xl:gap-x-[7%] 2xl:gap-x-[10%] items-center justify-center mt-10">


                        <div
                        // style={{ opacity }} 
                        className="border border-[#a376ff] mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[300px] h-72 rounded-[10px] flex justify-center items-center flex-col transform transition-transform hover:scale-105 hover:bg-[#f8f4fe] hover:shadow-lg" data-aos="fade-up">
                            <div className="bg-[#f8f4fe] w-24 h-24 rounded-full flex items-center justify-center">
                                <i className="text-[#a376ff] text-4xl"><MdOutlineAttachMoney /></i>
                            </div>
                            <p className="text-2xl mt-4 font-bold">Affordable Price</p>
                            <p className="text-center mt-4 leading-5 text-gray-500">Book appointments with top-notch doctors at unbeatable prices.</p>
                        </div>


                        <div
                        // style={{ opacity }} 
                         className="border border-[#a376ff] mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[300px] h-72 rounded-[10px] flex justify-center items-center flex-col  transform transition-transform hover:scale-105 hover:bg-[#f8f4fe] hover:shadow-lg"data-aos="fade-up" data-aos-delay="300">
                            <div className="bg-[#f8f4fe] w-24 h-24 rounded-full flex items-center justify-center">
                                <i className="text-[#a376ff] text-4xl"><FaHeart /></i>
                            </div>
                            <p className="text-2xl mt-4 font-bold">Customer Support</p>
                            <p className="text-center mt-4 leading-5 text-gray-500">Experience exceptional care with our dedicated customer support.</p>
                        </div>


                        <div
                        // style={{ opacity }} 
                        className="border border-[#a376ff] mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[300px] h-72 rounded-[10px] flex justify-center items-center flex-col  transform transition-transform hover:scale-105 hover:bg-[#f8f4fe] hover:shadow-lg"data-aos="fade-up" data-aos-delay="600">
                            <div className="bg-[#f8f4fe] w-24 h-24 rounded-full flex items-center justify-center">
                                <i className="text-[#a376ff] text-4xl"><GrSchedules /></i>
                            </div>
                            <p className="text-2xl mt-4 font-bold">Flexible Scheduling</p>
                            <p className="text-center mt-4 leading-5 text-gray-500">Schedule appointments at your convenience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Services