import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useLogoutStore } from "@/stores/LogoutStore";
import { useRouter } from "next/navigation";
import ToastMessage from "./utils/ToastMessage";
import { useLoadingStore } from "@/stores/LoadingStore";

export default function LogoutModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isLogoutModalOpen = useLogoutStore((state) => state.isLogoutModalOpen);
  const setIsLogoutModalOpen = useLogoutStore((state) => state.setIsLogoutModalOpen);
  const router = useRouter();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading)

  const handleLogout = () => {
    const cookieName = 'token';
    const cookiePath = '/';
    const domain = window.location.hostname;
    const existingCookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((cookie) => cookie.startsWith(`${cookieName}=`));

    if (existingCookie) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePath}; domain=${domain};`;
      ToastMessage('success', 'Logged out successfully');
      setIsLogoutModalOpen(false);
      setIsLoading(true);
      router.replace('/');
      window.location.reload();
    }
  };

  return (
    <>
      <Modal isOpen={isLogoutModalOpen} onOpenChange={onOpenChange} onClose={() => setIsLogoutModalOpen(false)} isDismissable={false} size="xs">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p>
                  Do you want to log out?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" className="font-medium" onPress={handleLogout}>
                  Log out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
