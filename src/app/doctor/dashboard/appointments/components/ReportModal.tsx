'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { CREATE_REPORT } from "@/apollo_client/Mutation";

interface MyModalProps {
    appointmentId: string;
    isReportModalOpen: boolean;
    setIsReportModalOpen: (isOpen: boolean) => void;
}

const ReportModal: React.FC<MyModalProps> = ({ isReportModalOpen, setIsReportModalOpen, appointmentId }) => {
    const [prescriptions, setPrescriptions] = useState<string[]>(['']);
    const [complaints, setComplaints] = useState<string[]>(['']);
    const [medicalHistory, setMedicalHistory] = useState<string[]>(['']);
    const [followUpType, setFollowUpType] = useState<string>('');
    const [followUpDate, setFollowUpDate] = useState<string>("15-days");
    const [generateReportPdf] = useMutation(CREATE_REPORT);
    const [doctorFeedback, setDoctorFeedback] = useState<string>('');

    const handleAction = async () => {
        const response = await generateReportPdf(
            {
                variables:
                {
                    "appointmentId": appointmentId,
                    "prescriptions": { "prescriptions": prescriptions.map(prescription => `${prescription}`) },
                    "patientProblems": { "patientProblems": complaints.map((complaint) => `${complaint}`) }
                    // "prescriptions": { "prescriptions": [`${prescriptions[0]}`, `${prescriptions[1]}`] }
                    ,
                    "medicalHistory": { "medicalHistory": medicalHistory.map((history) => `${history}`) },
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

    const handleComplaintsChange = (index: number, value: string) => {
        const updatedComplaints = [...complaints];
        updatedComplaints[index] = value;
        setComplaints(updatedComplaints);
    };


    const handleAddComplaints = () => {
        setComplaints([...complaints, '']);
    };

    const handleRemoveComplaints = (index: number) => {
        const updatedComplaints = [...complaints];
        updatedComplaints.splice(index, 1);
        setComplaints(updatedComplaints);
    };

    const handleMedicalHistoryChange = (index: number, value: string) => {
        const updatedMedicalHistory = [...medicalHistory];
        updatedMedicalHistory[index] = value;
        setMedicalHistory(updatedMedicalHistory);
    };


    const handleAddMedicalHistory = () => {
        setMedicalHistory([...medicalHistory, '']);
    };

    const handleRemoveMedicalHistory = (index: number) => {
        const updatedMedicalHistory = [...medicalHistory];
        updatedMedicalHistory.splice(index, 1);
        setMedicalHistory(updatedMedicalHistory);
    };


    return (
        <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} size="3xl" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create Report</ModalHeader>
                        <ModalBody className="text-sm">
                            {/* Patient Complaints */}
                            <div className="mb-2">
                                <label htmlFor="prescriptions" className="block text-sm font-medium text-gray-700">
                                    Patient Problems
                                </label>
                                {complaints.map((complaint, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            id={`complaint-${index}`}
                                            name={`complaint-${index}`}
                                            value={complaint}
                                            onChange={(e) => handleComplaintsChange(index, e.target.value)}
                                            className="p-1 border border-gray-300 rounded-md flex-1"
                                            placeholder="Problems here..."
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="ml-2 p-1 bg-red-500 text-white rounded-md "
                                                onClick={() => handleRemoveComplaints(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="mt-2 p-1 bg-green-500 text-white rounded-md float-right hover:bg-green-600"
                                    onClick={handleAddComplaints}
                                >
                                    Add
                                </button>
                            </div>
                            {/* Medical History Section */}
                            <div className="mb-2">
                                <label htmlFor="prescriptions" className="block text-sm font-medium text-gray-700">
                                    Medical History
                                </label>
                                {medicalHistory.map((history, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            id={`prescription-${index}`}
                                            name={`prescription-${index}`}
                                            value={history}
                                            placeholder="Medical history here..."
                                            onChange={(e) => handleMedicalHistoryChange(index, e.target.value)}
                                            className="p-1 border border-gray-300 rounded-md flex-1"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="ml-2 p-1 bg-red-500 text-white rounded-md"
                                                onClick={() => handleRemoveMedicalHistory(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="mt-2 p-1 bg-green-500 text-white rounded-md float-right hover:bg-green-600"
                                    onClick={handleAddMedicalHistory}
                                >
                                    Add
                                </button>
                            </div>

                            {/* Prescriptions Section */}
                            <div className="mb-2">
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
                                            placeholder="Prescription here..."
                                            onChange={(e) => handlePrescriptionChange(index, e.target.value)}
                                            className="p-1 border border-gray-300 rounded-md flex-1"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="ml-2 p-1 bg-red-500 text-white rounded-md"
                                                onClick={() => handleRemovePrescription(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="mt-2 p-1 bg-green-500 text-white rounded-md float-right hover:bg-green-600"
                                    onClick={handleAddPrescription}
                                >
                                    Add
                                </button>
                            </div>

                            {/* Doctor's Feedback Input */}
                            <div className="mb-2">
                                <label htmlFor="doctorFeedback" className="block text-sm font-medium text-gray-700">
                                    Doctors Feedback
                                </label>
                                <input
                                    type="text"
                                    id="doctorFeedback"
                                    name="doctorFeedback"
                                    placeholder="Your feedback..."
                                    onChange={(e) => setDoctorFeedback(e.target.value)}
                                    className="mt-1 p-1 border border-gray-300 rounded-md w-full outline-none"
                                />
                            </div>

                            {/* Follow Up Select Option */}
                            <div className="mb-2">
                                <label htmlFor="followUp" className="block text-sm font-medium text-gray-700">
                                    Follow Up
                                </label>
                                <select
                                    id="followUp"
                                    name="followUp"
                                    className="mt-1 p-1 border bg-white border-gray-300 rounded-md w-full"
                                    onChange={(e) => setFollowUpDate(e.target.value)}
                                >
                                    <option value="15-days">15 Days</option>
                                    <option value="1-month">1 Month</option>
                                    <option value="2-months">2 Months</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Follow Up Reason</label>
                                <input
                                    type="text"
                                    value={followUpType}
                                    onChange={(e) => setFollowUpType(e.target.value)}
                                    placeholder="Write follow up resason..."
                                    className="p-1 border border-gray-300 rounded-md flex-1 w-full"
                                />
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