const DoctorBlogContent = () => {
    return (
        <div className='w-[98%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto flex flex-col gap-y-6 lg:gap-y-10 '>
            <div id="introduction" className='w-full'>
                {/* <h6 className='text-xl sm:text-2xl xl:text-3xl font-medium  lg:mb-2'>Introduction</h6> */}
                <p className='text-[#666666] sm:text-lg xl:text-xl text-justify '>
                Sara Johnson&apos;s academic journey is marked by excellence and dedication. She completed her medical degree at Cambridge Medical University, United Kingdom, followed by advanced studies culminating in a master&apos;s and Ph.D. in Dermatology from Oxford Skin Disease Institute, affiliated with Oxford University, United Kingdom, in 2018. Armed with this extensive educational background, she possesses a deep understanding of dermatological science, empowering her to deliver holistic care and cutting-edge treatments to her patients.
                </p>
            </div>
            <div id="education" className='w-full'>
                <h6 className='text-xl sm:text-2xl xl:text-3xl font-medium  lg:mb-2'>Education</h6>
                <p className='text-[#666666] sm:text-lg xl:text-xl text-justify'>
                    Sara Johnson&apos;s academic journey is marked by excellence and dedication. She completed her medical degree at Cambridge Medical University, United Kingdom, followed by advanced studies culminating in a master&apos;s and Ph.D. in Dermatology from Oxford Skin Disease Institute, affiliated with Oxford University, United Kingdom, in 2018. Armed with this extensive educational background, she possesses a deep understanding of dermatological science, empowering her to deliver holistic care and cutting-edge treatments to her patients.
                </p>
                <p className="text-base sm:text-lg font-semibold text-[#666666] mt-2">-M.B.B.S. from Cambridge Medical University, United Kingdom</p>
                <p className="text-base sm:text-lg font-semibold text-[#666666]">-M.D. from Cambridge Medical University, United Kingdom</p>
            </div>
            <div id="testimonials" className='w-full'>
                <h6 className='text-xl sm:text-2xl xl:text-3xl font-medium  lg:mb-2'>Patient Testimonials</h6>
                <p className='text-[#666666] sm:text-lg xl:text-xl text-justify'>Before consulting with Dr. Sara, I struggled with persistent acne on my face and back, along with frustrating whiteheads on my nose. However, after seeking her expertise, she devised a simple yet effective skincare plan that targeted my specific concerns. I&apos;m delighted to say that her recommendations yielded fantastic results! My skin has never looked better, and I&apos;m grateful to Dr. Sara for her professional guidance and support.</p>
                <div className='text-[#000000] sm:text-lg xl:text-xl text-justify flex flex-col w-full justify-end items-end '>
                    <p className="text-sm sm:text-base font-semibold">-Aman Bhujel</p>
                    <p className="text-sm sm:text-base font-medium">Software Engineer</p>
                </div>
                {/* ----2nd testimonial------ */}
                <p className='text-[#666666] sm:text-lg xl:text-xl text-justify mt-4 sm:mt-6'>In the event of any unforeseen circumstances preventing you from attending your scheduled appointment, you have the option to request a refund via email. Refunds will be processed promptly within one week of your request. Alternatively, you may choose to reschedule your appointment for a more convenient date and time by contacting us at nephara@outlook.com.</p>
                <div className='text-[#000000] sm:text-lg xl:text-xl text-justify flex flex-col w-full justify-end items-end '>
                    <p className="text-sm sm:text-base font-semibold">-Evan Sunde</p>
                    <p className="text-sm sm:text-base font-medium">Student</p>
                </div>
            </div>
        </div>
    )
};

export default DoctorBlogContent;