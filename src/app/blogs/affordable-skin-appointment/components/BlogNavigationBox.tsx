const BlogNavigationBox = () => {

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='w-[20rem] h-min p-4 border hidden lg:block lg:sticky top-10 mr-10'>
            <ul className='text-base font-medium flex flex-col gap-y-4 justify-center text-[#696969]'>
                <li className='cursor-pointer' onClick={() => scrollToSection('introduction')}>Introduction</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('affordable')}>How do we provide online skin appointment so affordable?</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('appointment')}>Streamlined Appointment Process</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('report')}>Accessing Your Medical Report</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('physical')}>Need for Physical Skin Check-ups</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('prescriptions')}>Prescriptions</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('refund')}>Refund and Rescheduling</li>
            </ul>
        </div>
    );
};

export default BlogNavigationBox;