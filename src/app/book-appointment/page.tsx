import React, { FC } from 'react';
import nurse from '@/assets/beautiful-nurse1.png'
import Image from 'next/image';
import InputForm from './components/InputForm';

interface DoctorMeetingProps {

}

const DoctorMeeting: FC<DoctorMeetingProps> = () => {
  return (
    <div className='w-full flex justify-center items-center '>
      <div className='w-[95%] sm:w-[80rem]  h-auto py-8  lg:h-[48rem]  flex flex-col-reverse lg:flex-row justify-center items-center  '>
        <div className='md:w-[70%]  lg:w-[50%] h-[90%] hidden sm:flex justify-center items-center mt-8 lg:mt-0 '>
          <Image src={nurse} alt="Nurse" width={500} height={500} />
        </div>
        <InputForm />
      </div>
    </div>
  );
}

export default DoctorMeeting;
