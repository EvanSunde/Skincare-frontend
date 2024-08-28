import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const TermsAndConditions = () => {
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar item=""/>
            <main className='bg-white flex justify-center text-sm sm:text-base'>
                <div className='w-[98%] sm:w-[90%] md:w-[75%] lg:w-[65%] xl:w-[50%] px-4 sm:px-0 mb-8'>
                    <div className='mt-8'><h2 className='text-3xl font-bold text-center'>Terms and Conditions</h2>
                    </div>
                    <h1 className='text-2xl font-bold mt-3 mb-1'>Welcome to Nephara!</h1>
                    <p>These terms and conditions outline the rules and regulations for the use of Nephara&apos;s Website, located at www.nephara.com.</p>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Nephara if you do not agree to take all of the terms and conditions stated on this page.</p><br />

                    <p> The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                    <h2 className='mt-4'><strong>Cookies</strong></h2>
                    <p>We employ the use of cookies. By accessing Nephara, you agreed to use cookies in agreement with the Nephara&aposs Privacy Policy.</p>

                    <h2 className='mt-4'><strong>Data Collection and Use</strong></h2>
                    <p>We collect personal information such as your name, email address, and certain personal details to facilitate appointment bookings and provide our services effectively.</p>
                    <p>Your personal information may be used to:</p>
                    <ul>
                        <li>Schedule and manage appointments with dermatologists.</li>
                        <li>Communicate important updates, appointment reminders, and service-related notifications.</li>
                        <li>Customize your experience and improve our services.</li>
                    </ul>
                    <p>By using our platform, you consent to the collection, storage, and use of your personal information in accordance with our privacy policy.</p>

                    <h2 className='mt-4'><strong>Data Sharing</strong></h2>
                    <p>We do not sell or share your personal information with third parties for marketing purposes without your consent.</p>
                    <p>Your personal information may be shared with dermatologists and service providers solely for the purpose of fulfilling appointment bookings and delivering services.</p>

                    <h2 className='mt-4'><strong>Updates to Terms and Conditions</strong></h2>
                    <p>We reserve the right to update or modify these terms and conditions, including our privacy policy, at any time. Any changes will be effective upon posting the revised documents on our platform.</p>

                    <h2 className='mt-4'><strong>Rescheduling Policy:</strong></h2>
                    <p>In the event that we are unable to honor a scheduled appointment due to unforeseen circumstances, we will contact you via email to reschedule at a time convenient for you.</p>

                    <h2 className='mt-4'><strong>Professional Guidance:</strong></h2>
                    <p>Our platform provides access to experienced dermatologists who offer guidance and advice for improving skin health through online consultations.</p>

                    <h2 className='mt-4'><strong>Limitation of Liability:</strong></h2>
                    <p>While our doctors strive to provide accurate and beneficial recommendations, it&apos;s important to understand that the information provided during online consultations is for educational and informational purposes only.</p>

                    <h2 className='mt-4'><strong>No Medical Diagnosis:</strong></h2>
                    <p>Online consultations do not replace traditional in-person medical examinations. Our doctors cannot provide a definitive diagnosis without physically examining the patient.</p>

                    <h2 className='mt-4'><strong>Personal Responsibility:</strong></h2>
                    <p>Users are solely responsible for implementing the advice and recommendations provided by our doctors. Any decisions made based on the information received during consultations are at the user&apos;s own risk.</p>

                    <h2 className='mt-4'><strong>Consultation Results:</strong></h2>
                    <p>Results from online consultations may vary depending on individual circumstances and adherence to recommendations. We do not guarantee specific outcomes or results.</p>

                    <h2 className='mt-4'><strong>No Liability for Physical Harm:</strong></h2>
                    <p>While our doctors offer guidance for improving skin health, we do not assume responsibility for any physical harm, adverse reactions, or complications that may arise from implementing the advice provided during consultations.</p>

                    <h2 className='mt-4'><strong>Seeking Medical Attention:</strong></h2>
                    <p>In cases of medical emergencies or severe skin conditions, users should seek immediate medical attention from a qualified healthcare professional or visit a healthcare facility.</p>

                    <h2 className='mt-4'><strong>Continued Care:</strong></h2>
                    <p>Online consultations should complement, not replace, regular visits to a primary care physician or dermatologist for comprehensive medical care and monitoring.</p>

                    <h2 className='mt-4'><strong>Consultation Agreement:</strong></h2>
                    <p>By engaging in online consultations with our platform, users acknowledge and agree to the terms outlined in this medical disclaimer.</p>

                    <h2 className='mt-4'><strong>Refund Policy:</strong></h2>
                    <p>We understand that circumstances may arise that prevent you from attending your scheduled appointment. Our refund policy is designed to provide flexibility and support in such situations.</p>

                    <h2 className='mt-4'><strong>Refund Eligibility:</strong></h2>
                    <p>If you are unable to attend your appointment for any reason, you may request a refund by contacting us at nephara@outlook.com within a reasonable timeframe before the scheduled appointment time.</p>

                    <h2 className='mt-4'><strong>Refund Process:</strong></h2>
                    <p>To request a refund, please email us at the provided email address with your appointment details and reason for cancellation.</p>
                    <p>Refunds will be issued promptly and processed through the original payment method used for the booking.</p>

                    <h2 className='mt-4'><strong>Rescheduling Option:</strong></h2>
                    <p>Alternatively, if you prefer to reschedule your appointment rather than requesting a refund, please inform us of your preferred date and time, and we will accommodate your request to the best of our ability.</p>

                    <h2 className='mt-4'><strong>Contact Information:</strong></h2>
                    <p>For any inquiries or assistance regarding refunds, rescheduling, or appointment-related matters, please reach out to us at <Link href="mailto:nephara@outlook.com">nephara@outlook.com</Link>. Our team is here to assist you and ensure your satisfaction with our services.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;