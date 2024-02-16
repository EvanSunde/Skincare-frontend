'use client'
import React, { useState } from 'react';
import DatePickerDemo from './DatePicker';
import TimeZoneSelector from './TimeZoneSelector';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { UsePaymentContext } from '@/components/contexts/checkContext';

const CREATE_STRIPE_SESSION = gql`
  mutation CreateStripeCheckoutSession($productName: String!, $productPrice: String!, $productImage: String!) {
    createStripeCheckoutSession(productName: $productName, productPrice: $productPrice, productImage: $productImage)
  }
`;

const CREATE_STRIPE_CLIENT_SECRET = gql`
 mutation Mutation {
  createStripeClientId
}
`;

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $fullName: String!,
    $email: String!,
    $appointmentDate: String!,
    $appointmentTime: String!,
    $timezone: String!
  ) {
    createAppointment(
      fullName: $fullName,
      email: $email,
      appointmentDate: $appointmentDate,
      appointmentTime: $appointmentTime,
      timezone: $timezone
    )
  }
`;

const InputForm = () => {
  const [createStripeClientId, { data: stripeClientSecretData, loading: stripeClientSecretLoading, error: stripeClientSecretError }] = useMutation(CREATE_STRIPE_CLIENT_SECRET)
  const [createStripeSession, { data: stripeSessionData, loading: stripeSessionLoading, error: stripeSessionError }] = useMutation(CREATE_STRIPE_SESSION);
  const [createAppointment, { data: appointmentData, loading: appointmentLoading, error: appointmentError }] = useMutation(CREATE_APPOINTMENT);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const router = useRouter();

  const { clientId, setClientId, paymentIntent, setPaymentIntent } = UsePaymentContext();


  if (stripeSessionData) {
    console.log("data from stripe", stripeSessionData)
  }
  if (appointmentData) {
    console.log('Mutation Result:', appointmentData);
  }

  if (appointmentError) {
    console.error('Error:', appointmentError);
  }

  const handleBooking = async () => {
    // if (!name || !email || !selectedDate || !selectedTime || !selectedTimeZone) {
    //   console.log('Please fill in all fields before booking.');
    //   return;
    // }

    try {
      // Step 1: Create Stripe Checkout Session
      const stripeSessionResponse = await createStripeSession({
        variables: {
          productName: "Aman Doctor",
          productPrice: '20000',
          productImage: "https://imgs.search.brave.com/90kY2ne8nXXveKJC7OTzLJS_GUxXKhZlhKfpXf71rrE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/aHlzaWNpYW4tcmV2/aWV3aW5nLWhpcy1u/b3Rlc18xMDk4LTU0/Mi5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
        }
      });

      const sessionId = stripeSessionResponse.data.createStripeCheckoutSession;

      // Step 2: Redirect to Stripe Checkout
      const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

      if (!stripe) {
        console.error('Failed to load Stripe.');
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      // Step 4: Get the client secret
      const clientSecretResponse = await createStripeClientId();
      const clientSecret = clientSecretResponse.data.createStripeClientId;
      setClientId(`client secret ${clientSecret}`);

      // Step 5: Confirm Card Payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret);
      setPaymentIntent([paymentIntent])
      console.log(paymentIntent)
      // Handle payment result
      if (error) {
        console.log(error)
        // Handle error here
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // createAppointment call it 

        createAppointment({
          variables: {
            fullName: name,
            email,
            appointmentDate: selectedDate?.toDateString(),
            appointmentTime: selectedTime,
            timezone: selectedTimeZone,
          },
        }).then(async (res) => {
          console.log(res)
          const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

          if (!stripe) {
            console.error('Failed to load Stripe.');
            return;
          }

          const { error } = await stripe.redirectToCheckout({
            sessionId: res.data.createAppointment,
          });
        }).catch((error) => console.log(error))
      }

    } catch (error) {
      console.error('Error during the booking process:', error);
    }
  };

  // const handleBooking = async () => {
  //   if (!name || !email || !selectedDate || !selectedTime || !selectedTimeZone) {
  //     console.log('Please fill in all fields before booking.');
  //     return;
  //   }
  //   await createStripeSession({
  //     variables: {
  //       productName: "Aman Doctor",
  //       productPrice: '20000',
  //       productImage: "https://imgs.search.brave.com/90kY2ne8nXXveKJC7OTzLJS_GUxXKhZlhKfpXf71rrE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/aHlzaWNpYW4tcmV2/aWV3aW5nLWhpcy1u/b3Rlc18xMDk4LTU0/Mi5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
  //     }
  //   }).then(async (res) => {
  //     const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

  //     if (!stripe) {
  //       console.error('Failed to load Stripe.');
  //       return;
  //     }

  //     await stripe.redirectToCheckout({
  //       sessionId: res.data.createStripeCheckoutSession,
  //     });

  //     await createStripeClientId().then(async(res) => {
  //       const clientSecret = res;
  //       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret);

  //     })
  //   })


  //   //Call checout session

  //   //after getting client token

  //   //createAppointment call it 

  //   // createAppointment({
  //   //   variables: {
  //   //     fullName: name,
  //   //     email,
  //   //     appointmentDate: selectedDate?.toDateString(),
  //   //     appointmentTime: selectedTime,
  //   //     timezone: selectedTimeZone,
  //   //   },
  //   // }).then(async (res) => {
  //   //   console.log(res)
  //   //   const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

  //   //   if (!stripe) {
  //   //     console.error('Failed to load Stripe.');
  //   //     return;
  //   //   }

  //   //   const { error } = await stripe.redirectToCheckout({
  //   //     sessionId: res.data.createAppointment,
  //   //   });
  //   // }).catch((error) => console.log(error))

  // };

  return (
    <div className='md:w-[70%] lg:w-[50%] lg:h-[90%] h-full'>
      <p className='text-4xl sm:text-5xl font-bold tracking-wide mt-12'>SCHEDULE AN</p>
      <p className='text-4xl sm:text-5xl font-bold text-[#a376ff] tracking-wide sm:mt-4'>APPOINTMENT</p>
      <p className='font-semibold text-gray-700 text-lg mt-6'>Can we know more about you?</p>

      <div className='w-full mt-2 flex flex-col sm:flex-row'>
        <input
          type='text'
          placeholder='Full name'
          className='w-[100%] sm:w-[45%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none'
          value={"Aman Bhujel"}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Email Address'
          className='w-[100%] sm:w-[45%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none sm:ml-[5%] mt-2 sm:mt-0'
          value={"bhujelaman20@gmail.com"}
          readOnly
        />
      </div>
      <p className='mt-4 text-gray-600 text-sm'>*Notifications & alerts for appointments will be sent to this email.</p>


      <p className='font-semibold text-gray-700 text-lg mt-6'>Reason for appointment?</p>

      <div className='w-full mt-2 flex flex-col sm:flex-row'>
        <select
          className='w-[100%] sm:w-full h-10 border rounded-[6px] border-gray-500 px-3 outline-none bg-white mt-4 sm:mt-0'
        >
          <option value="routine-exam">Routine Skin Examination</option>
          <option value="suspicious-lesions">Suspicious Moles or Lesions</option>
          <option value="allergy-irritations">Skin Allergies or Irritations</option>
          <option value="sun-damage">Sun Damage Assessment</option>
        </select>

      </div>

      <p className='font-semibold text-gray-700 text-lg mt-10'>Whats your preferred appointment?</p>
      <div className='mt-4 flex flex-col sm:flex-row'>
        <DatePickerDemo onDateChange={setSelectedDate} />
        <select
          className='w-[100%] sm:w-[45%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none sm:ml-[5%] bg-white mt-4 sm:mt-0'
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
      <div className='mt-6 flex flex-col sm:flex-row'>
        <TimeZoneSelector onTimeZoneChange={setSelectedTimeZone} />
        <button
          className='bg-[#a376ff] font-bold px-3 py-2 rounded-[6px] w-[100%] sm:w-[45%]  sm:ml-[5%]  text-white hover:bg-[#a986f0] mt-4 sm:mt-0'
          onClick={handleBooking}
        >
          Book now
        </button>
      </div>
      <p className='mt-4 text-red-600 text-sm'>*Refunds and Rescheduling are available.</p>
    </div>
  );
};

export default InputForm;
