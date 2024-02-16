'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { gql, useMutation } from "@apollo/client";


interface MyModalProps {
    isReportModalOpen: boolean;
    setIsReportModalOpen: (isOpen: boolean) => void;
}

const CREATE_REPORT = gql`
  mutation GeneratePdf($appointmentId: String!, $prescriptions: PrescriptionArrayInput!, $followUp: FollowUpInput!, $doctorFeedback: String!) {
      generateReportPdf(appointmentId: $appointmentId, prescriptions: $prescriptions, followUp: $followUp, doctorFeedback: $doctorFeedback)
    }
  `;


const ReportModal: React.FC<MyModalProps> = ({ isReportModalOpen, setIsReportModalOpen }) => {
    const [prescriptions, setPrescriptions] = useState<string[]>(['']); // Initial state with one empty prescription input
    const [followUpType, setFollowUpType] = useState<string>(''); // State to store the selected follow-up type
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [followUpDate,setFollowUpDate]=useState<string>("");
    const [generateReportPdf] = useMutation(CREATE_REPORT);
    const [doctorFeedback,setDoctorFeedback]=useState<string>('');

    const handleFollowUpTypeChange = (value: string) => {
        setFollowUpType(value);
    };


    const handleAction = async () => {
        // Implement your action logic here
        const response = await generateReportPdf(
            {
                variables:
                {
                    "appointmentId": "appoint-11",
                    "prescriptions": { "prescriptions": [`${prescriptions[0]}`, `${prescriptions[1]}`] }
                    ,
                    "followUp": {
                        "date": `${followUpDate}`,
                        "description"
                            : `${followUpType}`
                    },
                    "doctorFeedback": doctorFeedback
                }
            }
        )

        console.log(response, "response create report")
        setDoctorFeedback("");
        setFollowUpDate("");
        setFollowUpType("");
        setPrescriptions(['']);
        setIsReportModalOpen(false);

    };

    const handleAddPrescription = () => {
        setPrescriptions([...prescriptions, '']);
    };

    const handleRemovePrescription = (index: number) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions.splice(index, 1);
        setPrescriptions(updatedPrescriptions);
    };

    const handlePrescriptionChange = (index: number, value: string) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions[index] = value;
        setPrescriptions(updatedPrescriptions);
    };

    return (
        <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} size="4xl" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create Report</ModalHeader>
                        <ModalBody>
                            {/* Prescriptions Section */}
                            <div className="mb-4">
                                <label htmlFor="prescriptions" className="block text-sm font-medium text-gray-700">
                                    Prescriptions
                                </label>
                                {prescriptions.map((prescription, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            id={`prescription-${index}`}
                                            name={`prescription-${index}`}
                                            value={prescription}
                                            onChange={(e) => handlePrescriptionChange(index, e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md flex-1"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="ml-2 p-2 bg-red-500 text-white rounded-md"
                                                onClick={() => handleRemovePrescription(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="mt-2 p-2 bg-green-500 text-white rounded-md float-right hover:bg-green-600"
                                    onClick={handleAddPrescription}
                                >
                                    Add Prescription
                                </button>
                            </div>

                            {/* Doctor's Feedback Input */}
                            <div className="mb-4">
                                <label htmlFor="doctorFeedback" className="block text-sm font-medium text-gray-700">
                                    Doctors Feedback
                                </label>
                                <input
                                    type="text"
                                    id="doctorFeedback"
                                    name="doctorFeedback"
                                    onChange={(e)=>setDoctorFeedback(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                                />
                            </div>

                            {/* Follow Up Select Option */}
                            <div className="mb-4">
                                <label htmlFor="followUp" className="block text-sm font-medium text-gray-700">
                                    Follow Up
                                </label>
                                <select
                                    id="followUp"
                                    name="followUp"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    onChange={(e)=>setFollowUpDate(e.target.value)}
                                >
                                    <option value="15-days">15 Days</option>
                                    <option value="1-month">1 Month</option>
                                    <option value="2-months">2 Months</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Follow Up Type</label>
                                <div>
                                    <label className="inline-flex items-center mt-2">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            value="Regular Checkup"
                                            checked={followUpType === 'Regular Checkup'}
                                            onChange={() => handleFollowUpTypeChange('Regular Checkup')}
                                        />
                                        <span className="ml-2">Regular Checkup</span>
                                    </label>
                                    <label className="inline-flex items-center mt-2">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            value="Follow Up Checkup"
                                            checked={followUpType === 'Follow Up Checkup'}
                                            onChange={() => handleFollowUpTypeChange('Follow Up Checkup')}
                                        />
                                        <span className="ml-2">Follow Up Checkup</span>
                                    </label>
                                    <label className="inline-flex items-center mt-2">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            value="Option 3"
                                            checked={followUpType === 'Option 3'}
                                            onChange={() => handleFollowUpTypeChange('Option 3')}
                                        />
                                        <span className="ml-2">Option 3</span>
                                    </label>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleAction}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
export default ReportModal;