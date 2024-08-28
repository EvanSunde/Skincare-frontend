const DoctorBlogNavigationBox = () => {

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='w-[20rem] min-h-60 p-4 border hidden lg:block lg:sticky top-10 mr-10'>
            <ul className='text-base font-medium flex flex-col gap-y-4 justify-center text-[#696969]'>
                <li className='cursor-pointer' onClick={() => scrollToSection('introduction')}>Introduction</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('education')}>Education</li>
                <li className='cursor-pointer' onClick={() => scrollToSection('testimonials')}>Patient Testimonials</li>
            </ul>
        </div>
    );
};

export default DoctorBlogNavigationBox;