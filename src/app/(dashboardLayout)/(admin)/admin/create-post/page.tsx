"use client";
/* eslint-disable jsx-a11y/img-redundant-alt */

import { toast } from "sonner";
import { Button } from "@heroui/button";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import TTSelect from "@/src/components/form/TTSelect";
import { postCategories, postStatus } from "@/src/constants";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hooks";
import Loading from "@/src/components/ui/Loading";
import Tiptap from "@/src/app/components/form/Tiptap";

const CreatePostPage = () => {
  const [content, setContent] = useState<string>("");
  const { user } = useUser();
  const { mutate: handleCreatePost, isPending, isSuccess } = useCreatePost();
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("post");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Debounced save function
  const saveContentToLocalStorage = useCallback((value: string) => {
    localStorage.setItem("post", value);
    toast.success("Saved to drafts", {
      position: "bottom-right",
      duration: 2000,
    });
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // Auto-save every 5 seconds if content changes
  useEffect(() => {
    if (!content) return;

    const timer = setTimeout(() => {
      saveContentToLocalStorage(content);
    }, 5000);

    return () => clearTimeout(timer);
  }, [content, saveContentToLocalStorage]);

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

  const onSubmit = (postInfo: any) => {
    const formData = new FormData();

    postInfo.isPremium = postInfo?.isPremium === "true";

    const postData = {
      ...postInfo,
      details: content,
      user: user?.userId,
    };

    formData.append("data", JSON.stringify(postData));

    formData.append("file", imageFile!);

    console.log(formData.get("file"));
    console.log(formData.get("data"));

    // handleCreatePost(formData);

    // if (!isPending && isSuccess) {
    //   router.push("/");
    // }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      {isPending && <Loading />}
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

export default CreatePostPage;
