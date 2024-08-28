'use client'
import React from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";

const Features = () => {
    return (
        <div
            className="flex w-full justify-center items-center border-b-2">
            <div className={`flex justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto `}>
                <div className="flex flex-col w-full justify-center items-center py-6 ">
                    <p className="text-[#a376ff] font-bold">Features</p>
                    <h2 className="text-2xl sm:text-3xl font-bold md:mt-1">Our Service Features</h2>

                    <div className="flex w-full flex-col lg:flex-row lg:gap-x-[5%] xl:gap-x-[7%] 2xl:gap-x-[10%] items-center justify-center mt-4 lg:mt-10">
                        <div
                            className="border border-[#a376ff] mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[300px] h-64 sm:h-72 rounded-[10px] flex justify-center items-center flex-col transform transition-transform hover:scale-105 hover:bg-[#f8f4fe] hover:shadow-lg" data-aos="fade-up">
                            <div className="bg-[#f8f4fe] w-24 h-24 rounded-full flex items-center justify-center">
                                <i className="text-[#a376ff] text-4xl"><MdOutlineAttachMoney /></i>
                            </div>
                            <p className="text-xl sm:text-2xl mt-4 font-bold">Affordable Price</p>
                            <p className="text-sm sm:text-base text-center mt-4 leading-5 text-gray-500">Book appointments with top-notch doctors at unbeatable prices.</p>
                        </div>
                        <div
                            className="border border-[#a376ff] mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[300px] h-64 sm:h-72 rounded-[10px] flex justify-center items-center flex-col  transform transition-transform hover:scale-105 hover:bg-[#f8f4fe] hover:shadow-lg" data-aos="fade-up" data-aos-delay="300">
                            <div className="bg-[#f8f4fe] w-24 h-24 rounded-full flex items-center justify-center">
                                <i className="text-[#a376ff] text-4xl"><FaHeart /></i>
                            </div>
                            <p className="text-xl sm:text-2xl mt-4 font-bold">Customer Support</p>
                            <p className="text-sm sm:text-base text-center mt-4 leading-5 text-gray-500">Experience exceptional care with our dedicated customer support.</p>
                        </div>
                        <div
                            className="border border-[#a376ff] mb-3 sm:mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[300px] h-64 sm:h-72 rounded-[10px] flex justify-center items-center flex-col  transform transition-transform hover:scale-105 hover:bg-[#f8f4fe] hover:shadow-lg" data-aos="fade-up" data-aos-delay="600">
                            <div className="bg-[#f8f4fe] w-24 h-24 rounded-full flex items-center justify-center">
                                <i className="text-[#a376ff] text-4xl"><GrSchedules /></i>
                            </div>
                            <p className="text-xl sm:text-2xl mt-4 font-bold">Flexible Scheduling</p>
                            <p className="text-sm sm:text-base text-center mt-4 leading-5 text-gray-500">Schedule appointments at your convenience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};

export default Features