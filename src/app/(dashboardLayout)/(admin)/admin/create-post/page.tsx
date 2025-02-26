/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import TTSelect from "@/src/components/form/TTSelect";
import { postCategories, postStatus } from "@/src/constants";
import CkEditor from "@/src/components/form/CkEditor";
import { useUser } from "@/src/context/user.provider";

const CreatePostPage = () => {
  const { user } = useUser();

  const [editorData, setEditorData] = useState<string>("");
  const [data, setData] = useState<string>("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  console.log(imageFile);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleOnUpdate = (editor: string, field: string): void => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };

  const onSubmit = (postInfo: any) => {
    const formData = new FormData();

    postInfo.isPremium = postInfo?.isPremium === "true";

    const postData = {
      ...postInfo,
      user: user?.userId,
      details: data,
    };

    formData.append("data", JSON.stringify(postData));

    formData.append("file", imageFile!);

    console.log(formData.get("data"));
    console.log(formData.get("file"));
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <TTForm onSubmit={onSubmit}>
        <div className="space-y-4">
          <TTInput label="Title" name="title" />
          <div className="grid grid-cols-2 gap-4">
            <TTSelect
              label="Category"
              name="category"
              options={postCategories}
            />
            <TTSelect
              label="Is Premium"
              name="isPremium"
              options={postStatus}
            />
          </div>

          <CkEditor
            editorData={editorData}
            handleOnUpdate={handleOnUpdate}
            setEditorData={setEditorData}
          />

          <div
            dangerouslySetInnerHTML={{ __html: data }}
            className="text-black"
          />
          <div>
            {imagePreview && (
              <div>
                <div className="relative size-48 rounded-xl border-2 border-dashed p-2">
                  <img
                    alt="image"
                    className="w-full h-full object-cover rounded-xl"
                    src={imagePreview}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="flex h-14 w-full bg-primary text-white cursor-pointer items-center justify-center rounded-md border-2 border-default-100 shadow-sm  transition-all duration-100 hover:border-default-400">
              Upload Image:
              <input
                className="w-full hidden"
                name="image"
                type="file"
                onChange={handleImage}
              />
            </label>
          </div>

          <div className="w-1/2 mx-auto p-2">
            <Button className="w-full" size="lg" type="submit">
              Create
            </Button>
          </div>
        </div>
      </TTForm>
    </div>
  );
};

export default CreatePostPage;
