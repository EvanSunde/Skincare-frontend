'use client'

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";


const FAQ = () => {
  const Q1 = "Can I provide feedback or ask additional questions?";
  const Ans1 = (<>Certainly, we welcome and value your feedback. For any inquiries, concerns, or constructive feedback, please feel free to{" "}<a href="mailto:evansunde2@gamil.com">Email us</a>.{" "}Your input is instrumental in maintaining and enhancing our commitment to excellence.</>);

  const Q2 = "Is my information kept confidential?";
  const Ans2 = "Rest assured, your privacy is paramount to us. We uphold the strictest confidentiality standards, ensuring that all your personal and medical information remains secure and confidential.";

  const Q3 = "How do I prepare for my online appointment?";
  const Ans3 = "Prior to your scheduled virtual consultation, we recommend ensuring a stable internet connection and selecting a well-lit, quiet environment. Prepare to discuss your specific skin concerns and relevant medical history with our professional, enabling a comprehensive and tailored consultation.";

  const Q4 = "What is the price for one appointment?";
  const Ans4 = "The fee for a single appointment is $40, reflective of the unparalleled quality of care and personalized attention delivered by our distinguished team of professional skin care specialists.";

  const Q5 = "I cannot attend the appointment; what should I do?";
  const Ans5 = ( <>In the event that you are unable to attend your scheduled appointment, we appreciate advance notice. Kindly{" "} <a href="evansunde2@gamil.com">email us</a>{" "}at your earliest convenience, and our dedicated team will assist you in rescheduling or exploring refund options with the utmost professionalism.</>);

  const Q6 = "What if the Doctor does not show up at the scheduled time?";
  const Ans6 = (<> While our practitioners are committed to punctuality, unforeseen circumstances may arise. If your assigned doctor is delayed, we kindly request your understanding for a brief waiting period of up to 5 minutes. In the rare event of a prolonged delay, promptly{" "}       <a href="evansunde2@gamil.com">email us</a>
  {" "} for expedited rescheduling.</>);

  const Q7 = "Are the Doctors Professionals?";
  const Ans7 = "Certainly, our esteemed doctors are eminent professionals in the field of dermatology, each possessing extensive expertise and a proven track record as skin care specialists.";

  const Q8 = "Can I request a specific doctor for my appointment?";
  const Ans8 = "While we cannot guarantee specific doctor requests, we strive to match you with the most suitable professional based on your needs. Each of our specialists is highly qualified and dedicated to providing exceptional care.";

  // Note: Your satisfaction and well-being are paramount. Should you have any further inquiries or require assistance, please do not hesitate to reach out to us via email.

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "75%" }}>    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="Accordion 1" title={Q7}>
        {Ans7}
      </AccordionItem>

      <AccordionItem key="2" aria-label="Accordion 2" title={Q2}>
        {Ans2}
      </AccordionItem>

      <AccordionItem key="3" aria-label="Accordion 3" title={Q3}>
        {Ans3}
      </AccordionItem>

      <AccordionItem key="4" aria-label="Accordion 4" title={Q4}>
        {Ans4}
      </AccordionItem>

      <AccordionItem key="5" aria-label="Accordion 5" title={Q5}>
        {Ans5}
      </AccordionItem>

      <AccordionItem key="6" aria-label="Accordion 6" title={Q6}>
        {Ans6}
      </AccordionItem>

      <AccordionItem key="7" aria-label="Accordion 7" title={Q1}>
        {Ans1}
      </AccordionItem>

      <AccordionItem key="8" aria-label="Accordion 8" title={Q8}>
        {Ans8}
      </AccordionItem>

    </Accordion>
    </div>
  );
}

export default FAQ