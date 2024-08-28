import { cn } from "@/utils/cn";
import React from "react";
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BentoGrid, BentoGridItem } from "../components/grid";
import { items } from "../components/blogsData";

const card = () => {
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar item="blog" />
            <div style={{ marginBottom: '40px' }}></div>
            <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[24rem]">
                {items.map((item, i) => (
                    <Link href={item.link || ''} key={i} >
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={item.className}
                            icon={item.icon}
                        />
                    </Link>
                ))}
            </BentoGrid>
            <div className="fixed bottom-0 left-0 right-0">
                <Footer />
            </div>
        </div>
    );
};


export default card;
