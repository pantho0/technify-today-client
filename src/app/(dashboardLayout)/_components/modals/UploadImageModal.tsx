"use client";

import TTForm from "@/src/components/form/TTForm";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function UploadImageModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const onSubmit = (data: any) => {
    console.log("Image Upload Clicked", imageFile);
    // you can now handle the upload here
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Change Profile Picture
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Upload Profile Image
              </ModalHeader>
              <ModalBody>
                <TTForm onSubmit={onSubmit}>
                  <div className="w-full my-4">
                    <label className="flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed text-gray-400 cursor-pointer hover:bg-primary/10 transition-all overflow-hidden">
                      {imagePreview ? (
                        <img
                          alt="Profile Preview"
                          src={imagePreview}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-semibold text-primary">
                          Click to upload image
                        </span>
                      )}
                      <input
                        type="file"
                        name="profileImage"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" color="primary">
                      Upload Image
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
