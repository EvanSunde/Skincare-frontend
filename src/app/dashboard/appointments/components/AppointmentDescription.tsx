'use client'
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/DashboardStore";
import BackgroundAppointment from '@/assets/DoctorConsulting.png'
import { useLazyQuery } from "@apollo/client";
import { IoArrowBack, } from "react-icons/io5";
import Link from "next/link";
import { GET_APPOINTMENT_IMAGES_BY_ID, GET_REPORT } from "@/apollo_client/Queries";
import  {formatDate} from "./AppointmentTimer";

export interface Appointment {
    _id: string;
    completed: boolean;
    fullName: string;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
    timezone: string;
    comment: string;
    s3ImagesKey: string[];
    reasonForVisit: string;
    allergies: string;
    checkoutSessionId?: string;
}

interface AppointmentInfoProps {
    appointmentData: Appointment | undefined;
}
const AppointmentDescription: React.FC<AppointmentInfoProps> = ({ appointmentData }) => {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [getAppointmentImageById] = useLazyQuery(GET_APPOINTMENT_IMAGES_BY_ID, {
        fetchPolicy: "no-cache"
    });
    const [getReport] = useLazyQuery(GET_REPORT, {
        fetchPolicy: "no-cache"
    });

    const appointmentSelected = useDashboardStore((state) => state.appointmentSelected);
    const setAppointmentSelected = useDashboardStore((state) => state.setAppointmentSelected);

    const [imagesArray, setImagesArray] = useState([]);

    const getImagesUrl = async () => {
        const response = await getAppointmentImageById({
            variables: {
                appointmentId: appointmentData?._id
            }
        })
        setImagesArray(response.data.getAppointmentImageById.imagesUrl)
    }

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Function to handle image click
    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedImage(null);
    };


    const getLocalDate = (appointmentDate: string | undefined): Date => {
        const localDate = new Date(appointmentDate || "");
        return localDate;
    };

    const getLocalTime = (utcTime: string | undefined): string => {
        if (!utcTime) return "00:01 AM";
        const formatedDate = formatDate(appointmentData?.appointmentDate ?? "");
        const utcDate = new Date(`${formatedDate}T${utcTime}Z`);
        const formattedLocalTime = utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        return formattedLocalTime;
    };

    const handleSeeReportClick = async () => {
        try {
            const response = await getReport({
                variables: {
                    "appointmentId": appointmentData?._id
                }
            });

            const pdfData = response.data.getReport;

            // Convert base64 to Blob
            const byteCharacters = atob(pdfData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Create URL for the Blob
            const pdfUrl = URL.createObjectURL(blob);

            // Open the URL in a new tab
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error("Error fetching or opening the PDF:", error);
        }
    };

    useEffect(() => {
        if (appointmentData) {
            getImagesUrl();
            setAppointmentSelected(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        <div className={` lg:w-[65%]  xl:w-[60%] 2xl:w-[70%] w-full lg:flex lg:h-[600px] xl:h-[650px] overflow-auto rounded-[8px] ${appointmentSelected || windowWidth > 1024 ? "flex" : "hidden"} border-2 mb-24 lg:mb-0 h-screen bg-white`}>
            {appointmentData ?
                <div className='w-full'>
                    <div className='w-full h-40 min-h-40 rounded-[8px] relative' style={{ backgroundImage: `url(${BackgroundAppointment.src})`, backgroundSize: 'cover', backgroundPosition: 'center 15%' }}>
                        <div className='absolute w-full h-full bg-gradient-to-b from-[#743bfb] via-[#743bfb] to-[#8e75c9] opacity-70 z-10'></div>
                        <div className='z-20 absolute p-6 flex w-full justify-between h-full items-center'>
                            <div className=' flex flex-col'>
                                {windowWidth < 1024 &&
                                    <div className="flex text-white items-center ">
                                        <Link href={'/dashboard/appointments'}>
                                            <i className="text-white text-2xl md:text-3xl cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg"><IoArrowBack /></i>
                                        </Link>
                                    </div>}
                                <p className='bg-[#f2f2f9cb] px-2 py-1 text-sm sm:text-base md:px-3 md:py-1 w-min text-[#743bfb] rounded-[10px] font-medium sm:mb-2 '>{appointmentData?.completed ? "Past" : "Upcoming"}</p>
                                <p className='text-white font-bold text-2xl md:text-3xl xl:text-2xl 2xl:text-3xl'>{appointmentData?.fullName}</p>
                                <p className='text-white text-base md:text-lg xl:text-base 2xl:text-lg font-medium md:mt-1'>{appointmentData?.reasonForVisit}</p>
                            </div>
                            <div>
                                <p className='bg-[#ededf5e0] px-2 py-1 text-sm sm:text-base sm:px-3  text-[#743bfb] rounded-[10px] font-medium mb-2'>{appointmentData?.appointmentDate}</p>
                            </div>
                        </div>
                    </div>
                    {!appointmentData.completed ?
                        (<div className='bg-[#f1f1ff] mt-4 py-2 text-xl flex justify-between  items-center font-medium text-black px-4'>
                            {/* <AppointmentTimer
                                appointmentDate={getLocalDate(appointmentData?.appointmentDate)?.toString()} 
                                appointmentTime={getLocalTime(appointmentData?.appointmentTime)?.toString()}
                            /> */}

                            <a href={`https://call.nephara.com/join?room=${appointmentData._id}&name=${appointmentData.fullName}`} target="_blank" rel="noopener noreferrer">
                                <button className={`text-white px-4 py-1 md:px-8 md:py-2 bg-[#743bfb] hover:bg-[#753bfbde] rounded-[6px] font-bold text-lg mb-2  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg`} >Join Room now</button>
                            </a>
                        </div>) :
                        (<div className='bg-[#f1f1ff] mt-4 py-2 text-xl flex justify-between  items-center font-medium text-black px-4'>
                            <p className=' text-base sm:text-lg md:text-xl font-semibold text-[#575658]'>Watch your Report</p>

                            <button className={`text-white px-4 py-1 md:px-8 md:py-2 bg-[#743bfb] hover:bg-[#753bfbde] rounded-[6px] font-bold text-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg`} onClick={handleSeeReportClick}>See Report</button>
                        </div>)
                    }
                    {/* // Render the modal if an image is selected */}
                    {selectedImage && (
                        <div className="fixed top-0 left-0 w-full h-max-screen h-full object-contain bg-black bg-opacity-75 flex justify-center items-center z-50">
                            <div className="relative">
                                <button
                                    className="absolute top-3 right-3 m-4 text-red-400 font-medium text-xl"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                <img src={selectedImage} alt="Selected Image" width={400} height={400} className="w-[40rem] max-w-screen object-contain" />
                            </div>
                        </div>
                    )}

                    {/* // Map through images and render them */}
                    <div className="flex flex-wrap">
                        {imagesArray &&
                            imagesArray.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    width={400}
                                    height={600}
                                    alt={`Image ${index}`}
                                    className="w-24 h-24 cursor-pointer"
                                    onClick={() => handleImageClick(imageUrl)}
                                />
                            ))}
                    </div>
                    <div className='h-full px-2'>
                        <p className='bg-[#f1f1ff] mt-4 py-1 text-lg font-semibold text-[#a3a1a9] px-4'>Appointment Info</p>
                        <div className='px-4 '>
                            <p className='text-[#807c83] mt-2 sm:text-lg lg:text-base font-medium '>Appointment Id</p>
                            <p className='font-medium sm:text-lg lg:text-base mt-1 mb-1'>{appointmentData?._id}</p>

                            <p className='text-[#807c83] sm:text-lg lg:text-base mt-2 font-medium '>See Report</p>
                            {/* <p className='font-medium mt-1 sm:text-lg lg:text-base mb-1'>{appointmentData?.report_id}</p> */}

                            <p className='text-[#807c83] sm:text-lg lg:text-base mt-2 font-medium '>Appointment Date</p>
                            <p className='font-medium mt-1 sm:text-lg lg:text-base mb-1'>{getLocalDate(appointmentData?.appointmentDate)?.toDateString()} </p>
                        </div>
                        <p className='bg-[#f1f1ff] mt-4 py-1 sm:text-lg font-semibold text-[#a3a1a9] px-4'>Time Info</p>
                        <div className='px-4 '>
                            <p className='text-[#807c83] mt-2 sm:text-lg lg:text-base font-medium'>Timezone</p>
                            <p className='font-medium mt-1 sm:text-lg lg:text-base mb-1'> {appointmentData?.timezone}</p>
                            <p className='text-[#807c83] mt-2 font-medium'>Time</p>
                            <p className='sm:text-lg lg:text-base font-medium mt-1 mb-1'>{getLocalTime(appointmentData?.appointmentTime)}</p>
                        </div>
                        <p className='bg-[#f1f1ff] mt-4 py-1 text-lg font-semibold text-[#a3a1a9] px-4'>Other Info</p>
                        <div className='px-4'>
                            <p className='text-[#807c83] mt-2 sm:text-lg lg:text-base font-medium'>Do you have allergies?</p>
                            <p className='font-medium mt-1 sm:text-lg lg:text-base mb-1'> {appointmentData?.allergies}</p>
                            <p className='text-[#807c83] sm:text-lg lg:text-base mt-2 font-medium'>Your Comment</p>
                            <p className='font-medium mt-1 sm:text-lg lg:text-base mb-1'>{appointmentData?.comment}</p>
                        </div>
                    </div>
                </div> :
                (
                    windowWidth > 1024 ?
                        <p className={`flex items-center justify-center w-full h-full`}>Click Appointments to see more</p> : ""

                )
            }

        </div>
    )
}
export default AppointmentDescription;