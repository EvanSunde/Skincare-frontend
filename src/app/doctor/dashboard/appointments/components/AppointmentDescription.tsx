'use client'
import { useEffect, useState } from "react";
import BackgroundAppointment from '@/assets/DoctorConsulting.png'
import { useDashboardStore } from "@/stores/DashboardStore";
import { useLazyQuery, } from "@apollo/client";
import ReportModal from "./ReportModal";
import { GET_APPOINTMENT_IMAGES_BY_ID, GET_REPORT } from "@/apollo_client/Queries";
import { Appointment } from "./AppointmentContainer";
import ToggleAppointmentModal from "./ToggleAppointmentModal";
import { useToggleModalStore } from "@/stores/ToggleAppointmentStatus";
interface AppointmentInfoProps {
    appointmentData: Appointment | undefined;
}
const AppointmentDescription: React.FC<AppointmentInfoProps> = ({ appointmentData }) => {
    const [getAppointmentImageById] = useLazyQuery(GET_APPOINTMENT_IMAGES_BY_ID, {
        fetchPolicy: "no-cache"
    });
    const appointmentSelected = useDashboardStore((state) => state.appointmentSelected);
    const setAppointmentSelected = useDashboardStore((state) => state.setAppointmentSelected);
    const [imagesArray, setImagesArray] = useState([]);
    const [getReport] = useLazyQuery(GET_REPORT, {
        fetchPolicy: "no-cache"
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const setIsToggleModalOpen = useToggleModalStore((state) => state.setIsToggleModalOpen);

    // Function to handle image click
    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    const getImagesUrl = async () => {
        console.log("its runnong ")
        const response = await getAppointmentImageById({
            variables: {
                appointmentId: appointmentData?._id
            }
        })
        if (response.data) {
            setImagesArray(response.data.getAppointmentImageById.imagesUrl)
            console.log(response.data.getAppointmentImageById.imagesUrl, "rsponse imside if")
        }
    }

    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
    useEffect(() => {
        console.log("from image use effect")
        if (appointmentData) {
            getImagesUrl();
            setAppointmentSelected(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    const handleCreateReportClick = async () => {
        setIsReportModalOpen(true);

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
        <div className={` lg:w-[60%]  xl:w-[60%] 2xl:w-[70%] w-full lg:flex lg:h-[700px] xl:h-[750px]  2xl:h-[770px]  overflow-auto rounded-[8px] ${appointmentSelected || windowWidth > 1024 ? "flex" : "hidden"} border-2 bg-white pb-0 mb-6 lg:mb-0`}>
            <ReportModal isReportModalOpen={isReportModalOpen} setIsReportModalOpen={setIsReportModalOpen} appointmentId={appointmentData?._id || ""}/>
            <ToggleAppointmentModal appointmentId={appointmentData?._id} completedStatus={appointmentData?.completed} />

            {appointmentData ?
                <div className='w-full max-h-full'>
                    <div className='w-full h-40 min-h-40 rounded-[8px] relative' style={{ backgroundImage: `url(${BackgroundAppointment.src})`, backgroundSize: 'cover', backgroundPosition: 'center 15%' }}>
                        <div className='absolute w-full h-full bg-gradient-to-b from-[#743bfb] via-[#743bfb] to-[#8e75c9] opacity-70 z-10'></div>
                        <div className='z-20 absolute p-6 flex w-full justify-between h-full items-center'>
                            <div className=' flex flex-col'>
                                <p className='bg-[#f2f2f9cb] px-3 py-1 w-min text-[#743bfb] rounded-[10px] font-semibold mb-2'>{appointmentData?.completed ? "Past" : "Upcoming"}</p>
                                <p className='text-white font-bold text-3xl'>{appointmentData?.fullName}</p>
                                <p className='text-white text-lg font-medium mt-1'>{appointmentData?.reasonForVisit}</p>
                            </div>
                            <div>
                                <p className='bg-[#ededf5e0] px-3 py-1 text-[#743bfb] rounded-[10px] font-semibold mb-2'>{appointmentData?.appointmentDate}</p>
                            </div>
                        </div>
                    </div>
                    {!appointmentData.completed ?
                        (<div className='bg-[#f1f1ff] mt-4 py-4 text-xl flex justify-between  items-center font-medium text-black px-4'>
                            <p className='text-[#807c83]'>Time Remaining: 01:24:56</p>

                            <a href={`http://localhost:8080/join?room=${appointmentData._id}&name=${appointmentData.fullName}`} target="_blank" rel="noopener noreferrer">
                                <button className={`text-white px-8 py-2 bg-[#743bfb] rounded-[10px] font-bold text-lg mb-2`}>Join</button>
                            </a>
                        </div>) :
                        (<div className='bg-[#f1f1ff] mt-4 py-4 text-xl flex justify-between  items-center font-medium text-black px-4'>
                            <p className=''>Report</p>

                            <div>
                                <button className={`text-white px-6 py-2 bg-[#743bfb] rounded-[10px] font-bold text-lg mb-2`} onClick={handleSeeReportClick}>See Report</button>
                                <button className={`text-white px-6 ml-4 py-2 bg-[#743bfb] rounded-[10px] font-bold text-lg mb-2`} onClick={handleCreateReportClick}>Create Report</button>
                            </div>
                        </div>)
                    }

                    {/* type is completed or not */}
                    <div className='bg-[#f1f1ff] mt-4 py-4 text-xl flex justify-between  items-center font-medium text-black px-4'>
                        <p className='text-[#807c83] font-medium'>Completed : <span className="text-black">{appointmentData.completed ? "Completed" : "Upcoming"}</span></p>
                        <div>
                            <button className={`text-white px-6 ml-4 py-1 bg-[#7f56dd] rounded-xl  mb-2`} onClick={() => setIsToggleModalOpen(true)}>Toggle</button>
                        </div>
                    </div>




                    {/* a button where if doctor clicks will  give a modal where it will ask change the completed true or false */}

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
                                <img src={selectedImage} alt="Selected Image" className="w-[40rem] max-w-screen object-contain" />
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
                            <p className='text-[#807c83] mt-2 text-lg lg:text-base font-medium '>Appointment Id</p>
                            <p className='font-medium text-lg lg:text-base mt-1 mb-1'>{appointmentData?._id}</p>
                            <p className='text-[#807c83] text-lg lg:text-base mt-2 font-medium '>See Report</p>
                            {/* <p className='font-medium mt-1 text-lg lg:text-base mb-1'>{appointmentData?.report_id}</p> */}
                            <p className='text-[#807c83] text-lg lg:text-base mt-2 font-medium '>Appointment Date</p>
                            <p className='font-medium mt-1 text-lg lg:text-base mb-1'>{appointmentData?.appointmentDate}</p>
                        </div>
                        <p className='bg-[#f1f1ff] mt-4 py-1 text-lg font-semibold text-[#a3a1a9] px-4'>Time Info</p>
                        <div className='px-4 '>
                            <p className='text-[#807c83] mt-2 text-lg lg:text-base font-medium'>Timezone</p>
                            <p className='font-medium mt-1 text-lg lg:text-base mb-1'> {appointmentData?.timezone}</p>
                            <p className='text-[#807c83] mt-2 font-medium'>Time</p>
                            <p className='text-lg lg:text-base font-medium mt-1 mb-1'>{appointmentData?.appointmentTime}</p>
                            <p className='text-[#807c83] mt-2 font-medium'>Booked Date</p>
                            <p className='font-medium mt-1 mb-1'>{appointmentData?.appointmentDate}</p>
                        </div>
                        <p className='bg-[#f1f1ff] mt-4 py-1 text-lg font-semibold text-[#a3a1a9] px-4'>More Info</p>
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