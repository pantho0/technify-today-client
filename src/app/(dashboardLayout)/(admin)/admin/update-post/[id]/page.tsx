"use client";

import Tiptap from "@/src/app/components/form/Tiptap";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import TTSelect from "@/src/components/form/TTSelect";
import { postCategories, postStatus } from "@/src/constants";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useParams } from "next/navigation";
import { useState } from "react";

export const UpdatePost = () => {
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { id } = useParams();
  console.log(id);
  const handleContentChange = (value: string) => {
    setContent(value);
  };

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

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="max-w-7xl  p-10  mx-6 my-6 rounded-xl border-dotted border-2">
      <div>
        <h2 className="text-2xl font-semibold leading-snug text-center mb-4">
          Update Post
        </h2>
      </div>
      <Divider className="my-6" />

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
          <Tiptap
            content={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
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

export default UpdatePost;
