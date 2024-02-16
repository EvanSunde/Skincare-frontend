'use client'
import React, { useState } from 'react'
import TimeZoneSelector from './components/TimeZoneSelector';
import DatePickerDemo from '../book-appointment/components/DatePicker';
import { gql, useMutation } from '@apollo/client';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { UsePaymentContext } from '@/components/contexts/checkContext';
import ToastMessage from '@/components/utils/ToastMessage';
import { UseStripeStore } from '@/stores/StripeStore';

const CREATE_APPOINTMENT_AND_STRIPE_SESSION = gql`
mutation CreateAppointmentAndCheckoutSession($fullName: String!, $email: String!, $appointmentDate: String!, $appointmentTime: String!, $timezone: String!, $comment: String!, $reasonForVisit: String!, $allergies: String!, $checkoutSessionId: String, $productName: String!, $productPrice: Int!, $productImage: String!) {
    createAppointmentAndCheckoutSession(fullName: $fullName, email: $email, appointmentDate: $appointmentDate, appointmentTime: $appointmentTime, timezone: $timezone, comment: $comment, reasonForVisit: $reasonForVisit, allergies: $allergies, checkoutSessionId: $checkoutSessionId, productName: $productName, productPrice: $productPrice, productImage: $productImage)
  }
`;

const Page = () => {
    const [createAppointmentAndCheckoutSession] = useMutation(CREATE_APPOINTMENT_AND_STRIPE_SESSION);
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [allergies, setAllergies] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const { clientId, setClientId, paymentIntent, setPaymentIntent } = UsePaymentContext();
    const setStripeSessionId = UseStripeStore((state) => state.setStripeSessionId);

    const handleBookAppointment = async () => {
        try {
            if (!selectedDate || !selectedDoctor || !selectedTimeZone || !selectedTime || !allergies || !name || !reason) {
                ToastMessage("error", "Please fill all the boxes.")
                return;
            }
            const response = await createAppointmentAndCheckoutSession(
                {
                    variables: {
                        "fullName": name,
                        "email": "bhujelaman20@gmail.com",
                        "appointmentDate": selectedDate?.toDateString(),
                        "appointmentTime": selectedTime,
                        "timezone": selectedTimeZone,
                        "comment": comment,
                        "reasonForVisit": reason,
                        "allergies": allergies,
                        "productName": "Dr Uma Keyal",
                        "productPrice": 3999,
                        "productImage": "https://imgs.search.brave.com/90kY2ne8nXXveKJC7OTzLJS_GUxXKhZlhKfpXf71rrE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/aHlzaWNpYW4tcmV2/aWV3aW5nLWhpcy1u/b3Rlc18xMDk4LTU0/Mi5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
                    }
                }
            )

            const sessionId = response.data.createAppointmentAndCheckoutSession;
            setStripeSessionId(sessionId);
            const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

            if (!stripe) {
                console.error('Failed to load Stripe.');
                return;
            }

            await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

        } catch (error) {
            console.error('Error during the booking process:', error);
        }
    }

    return (
        <div className='w-full h-auto lg:h-full flex justify-center bg-white'>
            <div className='w-[95%] lg:w-[78rem] lg:min-w-[78rem] xl:w-[90rem] h-auto lg:h-[50rem] pb-12 sm:pb-8  xl:h-[49rem] mt-12 flex flex-col items-center p-0'>
                <h3 className='text-4xl md:text-5xl font-semibold text-[#0736bc]'>Make an appointment</h3>
                <p className='text-sm sm:text-base md:text-lg text-[#6e6e6e] font-medium mt-4 text-center'>By filling out the form, you automatically make an appointment with a doctor.</p>
                <p className='text-sm sm:text-base md:text-lg text-[#6e6e6e] font-medium text-center'>A reminder will be sent in the email.</p>
                <div className='w-full md:w-[80%]  h-auto lg:h-[48rem] mt-8 md:border md:shadow-xl flex  items-center lg:justify-around flex-col lg:flex-row'>

                    {/* ---------GENERAL INFORMATION------------- */}
                    <div className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[45%] h-full  md:pl-8 md:pt-10'>
                        <p className='text-[#0736bc] text-2xl sm:text-3xl font-medium'>General information</p>
                        <p className='font-medium mt-4 mb-2'>Select Timezone:</p>
                        <TimeZoneSelector onTimeZoneChange={setSelectedTimeZone} />
                        <div className='mt-4 flex flex-row gap-x-[5%]'>
                            <div className='flex flex-col w-[45%]'>
                                <label className='font-semibold mt-2 sm:mt-4 mb-2'>Date*</label>
                                <DatePickerDemo onDateChange={setSelectedDate} />
                            </div>
                            <div className='flex flex-col w-[45%] '>
                                <label className='font-medium mt-2 sm:mt-4 mb-2'>Time*</label>
                                <select
                                    className='w-[100%] sm:w-full h-10 border rounded-[6px] border-gray-500 px-3 outline-none  bg-white '
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                >
                                    <option>--Select Time</option>
                                    <option value='10:00 AM'>10:00 AM</option>
                                    <option value='11:00 AM'>11:00 AM</option>
                                    <option value='12:00 PM'>12:00 PM</option>
                                    <option value='1:00 PM'>1:00 PM</option>
                                    <option value='2:00 PM'>2:00 PM</option>
                                    <option value='3:00 PM'>3:00 PM</option>
                                    <option value='4:00 PM'>4:00 PM</option>
                                    <option value='5:00 PM'>5:00 PM</option>
                                </select>
                            </div>


                        </div>
                        <div className='mt-4 flex flex-col'>
                            <label className='font-medium sm:mb-2 mt-4'>Reason for appointment*</label>
                            <select
                                className='w-[100%] sm:w-[95%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none bg-white'
                                onChange={(e) => setReason(e.target.value)}
                            >
                                <option value="">---Select a reason---</option>
                                <option value="consultation">Consultation</option>
                                <option value="routine-exam">Routine Skin Examination</option>
                                <option value="suspicious-lesions">Suspicious Moles or Lesions</option>
                                <option value="allergy-irritations">Skin Allergies or Irritations</option>
                                <option value="sun-damage">Sun Damage Assessment</option>
                            </select>
                        </div>
                        <div className='mt-4 flex flex-col'>
                            <label className='font-medium sm:mb-2 mt-4'>Select Doctor*</label>
                            <select
                                className='w-[100%] sm:w-[95%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none bg-white'
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                            >
                                <option value="">---Select a doctor---</option>
                                <option value="Evan Sunde">Dr. Evan Sunde</option>
                                <option value="Sunde Evan">Dr Sunde Evan</option>
                            </select>
                        </div>
                    </div>

                    {/* ------PERSONAL INFORMATION---------- */}
                    <div className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[45%] h-full md:pl-8 pt-10 flex flex-col'>
                        <p className='text-[#0736bc] text-2xl sm:text-3xl font-medium'>Personal information</p>
                        <p className='font-medium mt-2 sm:mt-4 mb-2'>Patient Name:</p>
                        <input
                            type='text'
                            placeholder='Enter your Name...'
                            className='w-[100%] sm:w-[95%] lg:w-[90%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none mt-2 sm:mt-0'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className='font-medium mt-4'>Email*</p>
                        <input
                            type='text'
                            placeholder='Email Address'
                            className='w-[100%] sm:w-[95%] lg:w-[90%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none mt-2 sm:mt-0'
                            value={"bhujelaman20@gmail.com"}
                            readOnly
                        />
                        <p className='font-medium mt-8 mb-2'>Do you have allergies?</p>
                        <div className='flex gap-x-8 text-sm mt-0'>
                            <label>
                                <input type="radio" name="option" value="yes" onClick={() => setAllergies('yes')} />
                                <span className='ml-1'> Yes</span>
                            </label>
                            <label>
                                <input type="radio" name="option" value="no" onClick={() => setAllergies('no')} />
                                <span className='ml-1'> No</span>
                            </label>
                            <label>
                                <input type="radio" name="option" value="notSure" onClick={() => setAllergies('Not Sure')} />
                                <span className='ml-1'> Not Sure</span>
                            </label>

                        </div>
                        <p className='font-medium mt-4 mb-2'>Comment</p>
                        <textarea
                            placeholder='Something that doctor should know...'
                            className='w-[100%] sm:w-[95%] lg:w-[90%] h-24 pt-2 border rounded-[6px] border-gray-500 px-3 outline-none mt-2 sm:mt-0 text-sm'
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <label className='mt-4 text-sm'>
                            <input type="checkbox" />
                            <span className='ml-1'>
                                I have read and agree with <span className='text-blue-400 underline cursor-pointer'>Terms and Conditions</span>
                            </span>
                        </label>
                        <button className='text-white bg-[#0736bc] hover:bg-[#0737bcda] py-2 font-medium mt-4 w-40 rounded-[8px] mb-6 ' onClick={handleBookAppointment}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page