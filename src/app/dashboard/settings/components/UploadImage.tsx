import React, { useState, ChangeEvent } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useUploadImageStore } from '@/stores/UploadImageStore';
import { useMutation } from '@apollo/client';
import ToastMessage from '@/components/utils/ToastMessage';
import { GET_AWS_UPDATE_LINK, UPDATE_USER_PHOTO_PATH } from '@/apollo_client/Mutation';
import Image from 'next/image';

const UploadImage: React.FC = () => {
  const [updateUserPhoto] = useMutation(GET_AWS_UPDATE_LINK);
  const [updateUserPhotoKeyAfterUpload] = useMutation(UPDATE_USER_PHOTO_PATH);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isUploadPhotoOpen = useUploadImageStore((state) => state.isUploadPhotoOpen);
  const setIsUploadPhotoOpen = useUploadImageStore((state) => state.setIsUploadPhotoOpen);

  // Function to handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleUploadButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image || '');

      const awsUpdateLinkResponse = await updateUserPhoto({
        variables: {
          "contentType": "image/png"
        }
      })

      const { url, status, message } = awsUpdateLinkResponse.data.updateUserPhoto

      // ----------PUTTING IN AWS S3 BUCKET BY URL------------
      if (status === "success") {
        const response = await fetch(`${url}`, {
          method: 'PUT',
          body: image,
          headers: {
            'Content-Type': 'multipart/form-data',
          },

        });

        if (!response.ok) {
          ToastMessage("error", "Error Occured! Please try again later!")
          setIsUploadPhotoOpen(false);
          return;
        }
        await updateUserPhotoKeyAfterUpload();
        ToastMessage("success", "Profile Updated Successfully!")
        setIsUploadPhotoOpen(false);
      }
      else {
        ToastMessage("error", "Error Occured! Please try again later!")
        setIsUploadPhotoOpen(false);
      }
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  return (
    <>
      <Modal isOpen={isUploadPhotoOpen} isDismissable={false} onClose={() => setIsUploadPhotoOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col items-center gap-1">Upload Picture</ModalHeader>
          <ModalBody>
            <div className='h-[30rem] border py-4'>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <Image src={preview} alt="Preview" width={400} height={400} className='w-full h-full object-cover' />}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsUploadPhotoOpen(false)}>
              Close
            </Button>
            <Button color="primary" className='bg-[#743bfb] text-white font-medium rounded-[5px]' onPress={handleUploadButtonClick}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadImage;
