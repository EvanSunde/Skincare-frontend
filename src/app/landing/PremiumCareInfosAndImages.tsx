"use client"
import React from 'react';
import Image from "next/image";
import Skincare from '@/assets/girl-cream.png';
import Customer_Call from '@/assets/people-discussing-43100673.png';
import Doctor_Call from '@/assets/DoctorCall.png';

const PremiumCareInfosAndImages = () => {
  return (
    <section className='max-w-screen'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-4 md:py-8 ">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-6 md:pb-12">
            <div className="inline-flex text-base font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-2 md:mb-4">Premium care for your skin</div>
            <h2 className="h2 text-lg md:text-2xl lg:text-3xl font-medium">Reach Out to our Skin care Specialist now</h2>
          </div>

          {/* Items */}
          <div className="grid gap-10 md:gap-16">

            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image loading='lazy' className="max-w-full mx-auto md:max-w-none object-cover h-[20rem] lg:h-[25rem] rounded-[8px]" src={Skincare} width={540} height={405} alt="Features of Nephara" placeholder='blur' />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right" data-aos-delay="150">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl sm:text-3xl font-bold text-purple-600">Premium Service</div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-500 md:mb-4 text-justify">we prioritize excellence in dermatological care, offering personalized consultations and treatments that elevate your skin health journey. Our team of experienced professionals is dedicated to providing you with the highest standard of care, ensuring that every aspect of your experience is tailored to perfection. Experience the pinnacle of skin care with our premium service – because you deserve nothing but the best.
                  </p>
                </div>
              </div>
            </div>

            {/* 2nd item */}

            <div className="md:flex flex-row-reverse md:gap-6 items-center justify-center">
              {/* Image */}
              <div className="md:w-[50%] lg:max-w-xl md:max-w-none lg:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image loading='lazy' className="md:w-[20rem] lg:w-full mx-auto md:max-w-none  object-cover h-[20rem] md:h-[23rem] lg:h-[25rem]  rounded-[8px]" src={Doctor_Call} width={540} height={405} alt="Features of Nephara" placeholder='blur' />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right" data-aos-delay="150">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl sm:text-3xl font-bold text-purple-600">Comfort of your home</div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-500 md:mb-4 text-justify">At Nephara, we&apos;ve redefined skin check-ups for international students in first-world countries. Our platform connects you with top dermatologists from South Asia, offering convenient consultations from anywhere. Say goodbye to high medical costs and long wait times – with just a few clicks, you can access expert care and receive comprehensive reports via email. Prioritize your health without the hassle, with Nephara. </p>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image loading='lazy' className="max-w-full mx-auto md:max-w-none  object-cover h-[20rem] lg:h-[25rem]  rounded-[8px]" src={Customer_Call} width={540} height={405} alt="Features of Nephara" placeholder='blur' />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right" data-aos-delay="150">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl sm:text-3xl font-bold text-purple-600">Our Support</div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-500 md:mb-4 text-justify">Nephara prioritizes your convenience and happiness through Our Support. Enjoy the convenience of easy rescheduling to fit your busy schedule. Our email assistance is available 24 hours a day, seven days a week.  Furthermore, we embrace transparency; if you ever discover the need, our simple refund method is only an email away.
                    Your opinion is important to us; please share your views and experiences with us by email so that we may continually improve our service. </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
};

export default PremiumCareInfosAndImages;
