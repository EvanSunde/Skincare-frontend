'use client'
import React, { useEffect, useState } from 'react'
import TimeZoneSelector from './components/TimeZoneSelector';
import DatePickerDemo from '@/app/appointment/components/DatePicker';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import ToastMessage from '@/components/utils/ToastMessage';
import { UseStripeStore } from '@/stores/StripeStore';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { CREATE_APPOINTMENT_AND_STRIPE_SESSION, UPDATE_IMAGES_AFTER_S3_UPLOAD } from '@/apollo_client/Mutation';
import Image from 'next/image';
import { useUserStore } from '@/stores/userStore';
import img64 from '@/data/base64';
import { DateTime } from 'luxon'
import { getUserInfo } from '@/components/utils/GetUserInfo';
import { useAuthorizedStore } from '@/stores/AuthorizedStore';
import { GET_USER_INFO } from '@/apollo_client/Queries';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/components/utils/Cookie';
import { useLoadingStore } from '@/stores/LoadingStore';

const Page = () => {
    const [createAppointmentAndCheckoutSession] = useMutation(CREATE_APPOINTMENT_AND_STRIPE_SESSION);
    const [updateAppointmentAfterS3Upload] = useMutation(UPDATE_IMAGES_AFTER_S3_UPLOAD);
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [allergies, setAllergies] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const setStripeSessionId = UseStripeStore((state) => state.setStripeSessionId);
    const userInfo = useUserStore((state) => state.userInfo);
    // --------for images---------
    const [images, setImages] = useState<File[]>([]);
    const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
    const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);
    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
        fetchPolicy: "no-cache"
    });
    const router = useRouter();
    const setIsLoading = useLoadingStore((state) => state.setIsLoading);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList | null = event.target.files;
        if (fileList) {
            const selectedImages: File[] = Array.from(fileList);
            setImages(prevImages => [...prevImages, ...selectedImages.slice(0, 3 - prevImages.length)]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleBookAppointment = async () => {
        try {
            if (!selectedDate || !selectedTimeZone || !selectedTime || !allergies || !reason) {
                ToastMessage("error", "Please fill all the boxes.")
                return;
            }
            const selectedDateTime = DateTime.fromFormat(selectedTime, 'h:mm a', { zone: selectedTimeZone.valueOf() });
            const utcAppointmentTime = selectedDateTime.toUTC().toFormat('HH:mm');

            const response = await createAppointmentAndCheckoutSession(
                {
                    variables: {
                        "fullName": userInfo[0]?.name,
                        "email": userInfo[0]?.email,
                        "appointmentDate": selectedDate?.toUTCString(),
                        "appointmentTime": utcAppointmentTime,
                        "timezone": selectedTimeZone,
                        "comment": comment,
                        "reasonForVisit": reason,
                        "allergies": allergies,
                        "productName": "Dr Sara",
                        "productPrice": 300,
                        "productImage": "https://imgs.search.brave.com/90kY2ne8nXXveKJC7OTzLJS_GUxXKhZlhKfpXf71rrE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/aHlzaWNpYW4tcmV2/aWV3aW5nLWhpcy1u/b3Rlc18xMDk4LTU0/Mi5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
                    }
                }
            )

            const { stripeSessionId, putImageS3BucketUrl, message, status, appointmentId } = response.data.createAppointmentAndCheckoutSession;

            let imageKey: string[] = [];

            await Promise.all(images.map(async (image, index) => {
                await fetch(`${putImageS3BucketUrl[index].url}`, {
                    method: 'PUT',
                    body: image,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                imageKey.push(putImageS3BucketUrl[index].key);
            }));

            // -----After images uploaded in s3 bucket , updating path in db-------
            await updateAppointmentAfterS3Upload(
                {
                    variables: {
                        imageKey,
                        appointmentId
                    }
                }
            )

            setStripeSessionId(stripeSessionId);
            const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

            if (!stripe) {
                console.error('Failed to load Stripe.');
                return;
            }

            await stripe.redirectToCheckout({
                sessionId: stripeSessionId,
            });

        } catch (error) {
            console.error('Error during the booking process:', error);
        }
    };

    useEffect(() => {
        const token = getCookie("token")
        let isMounted = true;

        const getUserInfo = async () => {
            try {
                if (token) {
                    if (!isAuthorized) {
                        const response = await getUserInfoByToken();

                        if (!isMounted) return;

                        if (response.data) {
                            const { status, message, user } = response.data.getUserInfoByToken;
                            if (user) {
                                setIsAuthorized(true)
                                setUserInfo({ email: user.email || '', name: user.name || '', photo: user.photo || '', gender: user.gender || '', age: user.age || 0, city: user.city || '', country: user.country || '', phoneNumber: user.phoneNumber || '' })
                                console.log("user info from profile", user)
                            }
                            if (status === 'error' && message === 'Unauthorized Token!') {
                                router.replace('/auth')
                                ToastMessage("error", "Authorization Denied")
                                return;
                            } else if (status === 'error' && message === 'Internal server error') {
                                ToastMessage(status, message)
                            }
                        }
                    }
                }
                else {
                    router.replace('/auth')
                    ToastMessage("error", "Log in required")
                    return;
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        if (isMounted) {
            getUserInfo();
        }
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full h-auto lg:h-screen flex justify-center bg-white'>
            <div className='w-[95%] lg:w-[78rem] lg:min-w-[78rem] xl:w-[90rem] h-auto lg:h-[50rem] pb-12 sm:pb-8  xl:h-[49rem] mt-12 flex flex-col items-center p-0'>
                <h3 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0736bc] text-center'>Make an appointment</h3>
                <p className='text-sm sm:text-base md:text-lg text-[#6e6e6e] font-medium mt-1 sm:mt-4 text-center'>Please provide accurate information for medical use and reporting.</p>
                {/* <p className='text-sm sm:text-base md:text-lg text-[#6e6e6e] font-medium text-center'></p> */}
                <div className='w-full md:w-[80%]  h-auto lg:h-[48rem] mt-8 md:border md:shadow-xl flex  items-center lg:justify-around flex-col lg:flex-row'>

                    {/* ---------GENERAL INFORMATION------------- */}
                    <div className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[45%] h-full  md:pl-8 md:pt-10'>
                        <p className='text-[#0736bc] text-2xl sm:text-3xl font-medium'>General information</p>
                        <p className='font-medium mt-2 mb-1'>Select Timezone:</p>
                        <TimeZoneSelector onTimeZoneChange={setSelectedTimeZone} />
                        <div className='mt-2 flex flex-row gap-x-[5%]'>
                            <div className='flex flex-col w-[45%]'>
                                <label className='font-semibold mt-2 mb-1'>Date*</label>
                                <DatePickerDemo onDateChange={setSelectedDate} />
                            </div>
                            <div className='flex flex-col w-[45%]'>
                                <label className='font-medium mt-2 mb-1'>Time*</label>
                                <select
                                    className='w-[100%] sm:w-full h-10 text-sm sm:text-base border rounded-[6px] border-gray-500 px-3 outline-none  bg-white '
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
                        <div className='mt-2 flex flex-col'>
                            <label className='font-medium sm:mb-1 mt-4'>Reason for appointment*</label>
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
                        {/* -------select doctor--------- */}
                        {/* <div className='mt-2 flex flex-col'>
                            <label className='font-medium sm:1 mt-4'>Select Doctor*</label>
                            <select
                                className='w-[100%] sm:w-[95%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none bg-white'
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                            >
                                <option value="">---Select a doctor---</option>
                                <option value="Evan Sunde">Dr. Uma Keyal</option>
                            </select>
                        </div> */}
                        <div className='mt-2 flex flex-col'>
                            <label className='font-medium sm:mb-1 mt-4'>Upload Images</label>
                            <div className='flex gap-x-2'>
                                {images.map((image, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={`Uploaded Image ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className='w-32 h-32 object-cover border'
                                            placeholder='blur'
                                            blurDataURL={img64}
                                        />
                                        <button
                                            className="absolute top-0 right-0 text-red-500 text-2xl rounded-full"
                                            onClick={() => removeImage(index)}
                                        >
                                            <AiOutlineCloseCircle />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 3 && (
                                    <label htmlFor="image-upload" className="w-32 h-32 object-cover text-gray-500 text-sm border border-dashed flex flex-col items-center font-medium justify-center cursor-pointer">
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                            className=''
                                            multiple
                                        />
                                        <span className=' text-2xl'> <IoAddCircleOutline /> </span>
                                        Add Image
                                    </label>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* ------PERSONAL INFORMATION---------- */}
                    <div className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[45%] h-full md:pl-8 pt-10 flex flex-col'>
                        <p className='text-[#0736bc] text-2xl sm:text-3xl font-medium'>Personal information</p>
                        <p className='font-medium mt-2 sm:mt-4 mb-2'>Patient Name:</p>
                        <input
                            type='text'
                            placeholder='Enter your Name...'
                            value={userInfo[0]?.name}
                            className='w-[100%] sm:w-[95%] lg:w-[90%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none mt-2 sm:mt-0'
                        />
                        <p className='font-medium mt-4'>Email*</p>
                        <input
                            type='text'
                            placeholder='Email Address'
                            className='w-[100%] sm:w-[95%] lg:w-[90%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none mt-2 sm:mt-0'
                            value={userInfo[0]?.email}
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