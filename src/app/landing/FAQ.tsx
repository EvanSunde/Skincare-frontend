'use client'
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import faqs from "@/data/FaqData";

const FAQ = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="faq" className="flex w-full justify-center items-center border-b-2" >
      <div className={`flex justify-center items-center w-[100%] lg:w-[63rem]  xl:w-[79rem] 2xl:w-[90rem] h-auto `}>
        <div className="flex flex-col w-full justify-center items-center py-2 sm:py-6">
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">Frequently Asked Questions </h2>
          <div className="flex text-sm sm:text-base justify-center w-[95%] md:w-3/4 py-4 md:py-10" >
            <Accordion variant="splitted" >
              {faqs.map((faq, index) => (
                windowWidth > 640 ?
                  <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={faq.question}>
                    {faq.answer}
                  </AccordionItem>
                  :
                  <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} subtitle={faq.question}>
                    {faq.answer}
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ