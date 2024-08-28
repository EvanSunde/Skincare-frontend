'use client'
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useToggleModalStore } from '@/stores/ToggleAppointmentStatus';
import { useMutation } from '@apollo/client';
import { UPDATE_APPOINTMENT_STATUS } from '@/apollo_client/Mutation';
import { getCookie } from '@/components/utils/Cookie';

interface ToggleAppointmentModalProps {
    appointmentId: string | undefined;
    completedStatus: boolean | undefined;
}

const ToggleAppointmentModal: React.FC<ToggleAppointmentModalProps> = ({ appointmentId, completedStatus }) => {
    const isToggleModalOpen = useToggleModalStore((state) => state.isToggleModalOpen);
    const setIsToggleModalOpen = useToggleModalStore((state) => state.setIsToggleModalOpen);
    const [status, setStatus] = useState<'completed' | 'incomplete'>(completedStatus ? 'completed' : 'incomplete');
    const [updateAppointmentByDoctorToken] = useMutation(UPDATE_APPOINTMENT_STATUS);

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as 'completed' | 'incomplete');
    };

    const handleToggle = async () => {
        if ((status === 'completed' && !completedStatus) || (status === 'incomplete' && completedStatus)) {
            const token = getCookie("doctor-token");
            const tokenParts = token.split(" ");

            const response = await updateAppointmentByDoctorToken({
                variables: {
                    "doctorToken": tokenParts[1],
                    appointmentId,
                    "completed": status === 'completed' ? true : false
                }
            });
            window.location.reload();
            console.log("response from mutation", response);
        }
        setIsToggleModalOpen(false);
    }

    return (
        <>
            <Modal isOpen={isToggleModalOpen} onClose={() => setIsToggleModalOpen(false)} isDismissable={false} size="sm">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Status Change</ModalHeader>
                            <ModalBody>
                                <div>
                                    <label htmlFor="status" className='text-lg'>Change the status of completion:</label>
                                    <div id="status" className='flex gap-x-1 mt-2'>
                                        <input
                                            type="radio"
                                            id="completed"
                                            name="status"
                                            value="completed"
                                            checked={status === 'completed'}
                                            onChange={handleStatusChange}
                                            className=''
                                        />
                                        <label htmlFor="completed">Completed</label>

                                        <input
                                            type="radio"
                                            id="incomplete"
                                            name="status"
                                            value="incomplete"
                                            checked={status === 'incomplete'}
                                            onChange={handleStatusChange}
                                            className='ml-8'
                                        />
                                        <label htmlFor="incomplete">Incomplete</label>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" className="font-medium" onPress={handleToggle}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>)
}

export default ToggleAppointmentModal



