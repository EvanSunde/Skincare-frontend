'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react';
import Profile from '@/assets/Emma.png';
import Profile1 from '@/assets/profile1.jpg';
import Profile2 from '@/assets/profile2.jpg';
import { Navigation, Pagination, } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {motion} from 'framer-motion'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const feedbackData = [
  {
    text: "I really had an awesome experience. I could not even believe I would get the appointment at this much affordable price while residing in Australia.",
    name: "Emma Singh",
    location: "Australia",
    image: Profile,
  },
  {
    text: "Really good experience! The appointment was so fast, and I got the report on my email right away.",
    name: "Aman Bhujel",
    location: "London",
    image: Profile1,
  },
  {
    text: "I have been avoiding skin checkups for the last 3 months because of the cost, but this feels like a steal – so affordable and a seamless way for appointments.",
    name: "Evan Sunde",
    location: "USA",
    image: Profile2,
  },
];

const Feedback = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [startAnimation, setStartAnimation] = useState<Boolean>(false);

  const handleScroll = () => {
      if (feedbackRef.current ) {
        const elementTop = feedbackRef.current.getBoundingClientRect().top;
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

  }, []);

  return (
    <div ref={feedbackRef} className="flex w-full justify-center items-center border-b-2 bg-white">
      <div className={`flex justify-center items-center w-[100%] lg:w-[63rem] xl:w-[79rem] 2xl:w-[90rem] h-auto ${startAnimation ? "animatedFromBottom" : ""}`}>
        <div className="flex flex-col w-full justify-center items-center py-6 ">
          <p className="text-[#a376ff] font-bold">Testimonials</p>
          <h1 className="text-3xl font-bold mt-1">From Our Users</h1>

          {windowWidth && windowWidth > 1024 ? (
            <div className="hidden lg:flex w-full flex-col lg:flex-row lg:gap-x-[5%] xl:gap-x-[7%] items-center justify-center mt-10">
              {feedbackData.map((feedback, index) => (

                <motion.div 
                key={index} 
                className="shadow-2xl border mb-8 w-[80%] sm:w-[65%] md:w-[50%] lg:w-[330px] h-96 rounded-[6px] flex justify-center items-center flex-col bg-white user-select-none"
                whileHover={{ scale: 1.05 }}
                drag
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} >
                  <div className="h-[75%] w-full flex justify-center">
                    <p className="w-[95%] flex-wrap flex text-lg text-center tracking-wide font-medium leading-6 mt-10 user-select-none">
                      {feedback.text}
                    </p>
                  </div>
                  <div className="h-[25%] w-full bg-[#4a2b8a] rounded-[6px] relative flex justify-center items-center flex-col">
                    <div className="absolute left-1/2 translate-x-[-50%] top-[-50%] flex items-center justify-center flex-col text-white">
                      <Image src={feedback.image} width={100} height={100} className="w-20 h-20 border-2 border-white object-cover rounded-full " alt="Feedback" />
                      <p className="font-semibold text-lg leading-4 mt-2">{feedback.name}</p>
                      <p className="text-sm ">{feedback.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className='w-full  flex items-center justify-center mt-4'>
              <Swiper
                effect={"coverflow"}
                className='h-auto w-full'
                {...(windowWidth && windowWidth < 640 ? { navigation: true } : '')}
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={windowWidth && windowWidth < 640 ? 1 : 2}

                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
              >
                {feedbackData.map((feedback, index) => (
                  <SwiperSlide key={index} className="w-full flex justify-center items-center mb-3">
                    <div className="shadow-xl border mb-8 w-[300px] sm:w-[290px] md:w-[350px] ml-[50%] translate-x-[-50%] h-96 rounded-[6px] flex justify-center items-center flex-col">
                      <div className="h-[75%] w-full flex justify-center">
                        <p className="w-[95%] flex-wrap flex text-lg text-center tracking-wide font-medium leading-6 mt-10">
                          {feedback.text}
                        </p>
                      </div>
                      <div className="h-[25%] w-full bg-[#4a2b8a] rounded-[6px] relative flex justify-center items-center flex-col">
                        <div className="absolute left-1/2 translate-x-[-50%] top-[-50%] flex items-center justify-center flex-col text-white">
                          <Image src={feedback.image} width={100} height={100} className="w-20 h-20 border-2 border-white object-cover rounded-full " alt="Feedback" />
                          <p className="font-semibold text-base md:text-lg leading-4 mt-2">{feedback.name}</p>
                          <p className="text-sm ">{feedback.location}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
