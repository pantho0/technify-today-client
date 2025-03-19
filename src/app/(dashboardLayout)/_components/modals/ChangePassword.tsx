"use client";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import { useChangePassword } from "@/src/hooks/auth.hooks";
import { logoutUser } from "@/src/services/auth";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useRouter } from "next/navigation";

export default function ChangePasswordModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();
  const router = useRouter();

  const onSubmit = (data: any) => {
    if (data.oldPassword === data.newPassword) {
      alert("New password cannot be the same as old password");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    changePassword(passwordData);

    router.push("/");
  };

  if (isSuccess) {
    logoutUser();
  }

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Change Password
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Change Password
              </ModalHeader>
              <ModalBody>
                <TTForm onSubmit={onSubmit}>
                  <div className="my-2">
                    <TTInput
                      label="Current Password"
                      name="oldPassword"
                      type="password"
                    />
                  </div>
                  <div className="my-2">
                    <TTInput
                      label="New Password"
                      name="newPassword"
                      type="password"
                    />
                  </div>
                  <div className="my-2">
                    <TTInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                  </div>{" "}
                  <div className="flex justify-end">
                    <Button
                      isLoading={isPending && !isSuccess}
                      type="submit"
                      color="primary"
                    >
                      Change Password
                    </Button>
                  </div>
                </TTForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
