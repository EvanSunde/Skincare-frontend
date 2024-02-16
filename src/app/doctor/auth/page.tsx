'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import nurse from '@/assets/girl.jpg'
import { Signin } from './components/AuthFormComponent'

const Page = () => {
    return (
        <div className="flex w-full justify-center items-center bg-white">
            <div className="flex flex-col lg:flex-row justify-center w-full   xl:max-w-[95rem] 2xl:w-full 2xl:max-w-[120rem] 2xl:h-scrren 2xl:max-h-[83rem]  h-screen">
                <Signin  />
            </div>
        </div>
    )
}

export default Page;
