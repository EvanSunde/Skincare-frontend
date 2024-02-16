'use client'
import Navbar from '@/components/Navbar'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import BlogImage from '@/assets/DoctorConsulting.png'

const page = () => {
    const router = useRouter();

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <main className='bg-white'>
            <Navbar />
            <div
                className="flex w-full justify-center items-center bg-white">
                <div className={`flex flex-col justify-center items-center w-[95%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto relative`}>
                    <div className='absolute top-4 left-4 flex items-center justify-center font-semibold cursor-pointer' onClick={() => router.back()}>
                        <i className='text-xl mr-2'><IoIosArrowBack /> </i>
                        <p className='text-lg'>Back</p>
                    </div>
                    <p className='bg-[#f6f6f6] mt-10 text-[#868585] px-3 rounded-[12px]'>About Us</p>
                    <p className='mt-4 text-2xl md:text-3xl font-medium w-[75%] xl:w-[50%] flex flex-wrap text-center '>How do we help you schedule an appointment on just 40$?</p>
                    <Image src={BlogImage} width={1200} height={700} alt='Skin-Appointment-Blog' className='w-[90%] border mt-4 rounded-[12px] h-[30rem] object-cover' />
                    <div className='w-full h-auto bg-red flex flex-col lg:flex-row items-center lg:items-start mt-10 mb-10 justify-center'>
                        <div className='w-[20rem] h-min p-4 border hidden lg:block lg:sticky top-10 mr-10'>
                            <ul className='text-sm font-medium flex flex-col gap-y-4 justify-center text-[#696969]'>
                                <li className='cursor-pointer' onClick={() => scrollToSection('introduction')}>Introduction</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('affordable')}>How do we provide online skin appointment so affordable?</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('appointment')}>Streamlined Appointment Process</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('report')}>Accessing Your Medical Report</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('physical')}>Need for Physical Skin Check-ups</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('prescriptions')}>Prescriptions</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('refund')}>Refund and Rescheduling</li>
                            </ul>
                        </div>
                        <div className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto flex flex-col gap-y-6 lg:gap-y-10'>
                            <div id="introduction" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>Introduction</h6>
                                <p className='text-[#666666] xl:text-lg'>Welcome to Nephara, your premier destination for comprehensive online dermatology healthcare. At Nephara, we are dedicated to revolutionizing the way individuals receive skin care by offering virtual consultations from the convenience of their homes. Our platform connects users with expert dermatologists who provide personalized assessments and treatment plans tailored to each individual's unique needs. With our commitment to excellence and innovation, Nephara aims to empower users to prioritize their skin health and achieve optimal results, all through seamless and accessible virtual appointments.</p>
                            </div>
                            <div id="affordable" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>How do we provide online skin appointment so affordable?</h6>
                                <p className='text-[#666666] xl:text-lg'>At Nephara, we've harnessed the power of globalization to deliver high-quality dermatological care at remarkably affordable rates. By leveraging the expertise of skilled dermatologists from South Asia, where the cost of living is comparatively lower than in first-world countries like Australia, we're able to offer our services at a fraction of the cost. Through our innovative online platform, we connect users with top-tier dermatologists from the region, ensuring that quality care is accessible to all, regardless of geographical barriers. This approach not only makes dermatological care more affordable but also expands access to expertise and promotes global collaboration in healthcare.</p>
                            </div>
                            <div id="appointment" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>Streamlined Appointment Process</h6>
                                <p className='text-[#666666] xl:text-lg'>Booking an appointment with Nephara is a seamless process designed to prioritize your convenience. Users initiate the process by selecting a suitable appointment slot and completing the payment transaction upfront. Within 15-30 minutes of booking, users receive a confirmation email detailing their appointment specifics. At the scheduled time, both the user and the dermatologist convene via a secure video call to discuss concerns and treatment options. During the session, the dermatologist conducts a thorough examination and formulates a personalized treatment plan. Following the consultation, users promptly receive a comprehensive report via email, typically within 15-30 minutes. Additionally, users can conveniently access and review past reports through their personalized dashboard on our platform.</p>
                            </div>
                            <div id="report" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>Accessing Your Medical Report</h6>
                                <p className='text-[#666666] xl:text-lg'>Upon completion of your consultation, our dermatologists will provide personalized advice and treatment plans tailored to your specific concerns. Following the appointment, your dedicated doctor will promptly prepare a comprehensive medical report outlining the discussed diagnosis and treatment recommendations. This detailed report will be promptly delivered to your email address, ensuring timely access to essential healthcare information. Additionally, for your convenience, you can securely access and download your medical report from your personalized dashboard on our platform, providing you with seamless access to your healthcare records.</p>
                            </div>
                            <div id="physical" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>Eliminating the Need for Physical Skin Check-ups</h6>
                                <p className='text-[#666666] xl:text-lg'>Contrary to traditional beliefs, physical presence is not always necessary for effective dermatological consultations. In nearly 50% of cases, our online platform facilitates comprehensive virtual appointments between doctors and patients, enabling personalized treatment plans tailored to individual needs. Should your condition necessitate further assessment, our dermatologists will guide you through the process, advising on the appropriate diagnostic tests or in-person evaluations, particularly in cases where there may be concerns about conditions such as skin cancer. Our priority is to ensure thorough and informed healthcare delivery, whether virtually or in-person, based on the specific requirements of each case.</p>
                            </div>
                            <div id="prescriptions" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>Prescriptions</h6>
                                <p className='text-[#666666] xl:text-lg'>Following your appointment, if our doctors determine the need for specific medications or topical treatments, they will provide personalized recommendations. You will receive detailed guidance on the usage of medical creams or medicines directly from our doctors. Additionally, you can conveniently obtain prescribed medications from any nearby pharmaceutical store that carries the recommended products.</p>
                            </div>
                            <div id="refund" className='w-full'>
                                <h6 className='text-2xl xl:text-3xl font-medium  lg:mb-2'>Refund and Rescheduling Policy</h6>
                                <p className='text-[#666666] xl:text-lg'>In the event of any unforeseen circumstances preventing you from attending your scheduled appointment, you have the option to request a refund via email. Refunds will be processed promptly within one week of your request. Alternatively, you may choose to reschedule your appointment for a more convenient date and time by contacting us at nephara@outlook.com.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page