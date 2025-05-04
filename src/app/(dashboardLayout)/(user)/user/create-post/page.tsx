"use client";

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
import { Divider } from "@heroui/divider";

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

  useEffect(() => {
    if (!content) return;

    const timer = setTimeout(() => {
      saveContentToLocalStorage(content);
    }, 5000);

    return () => clearTimeout(timer);
  }, [content, saveContentToLocalStorage]);

  useEffect(() => {
    if (isSuccess && !isPending) {
      // Clear localStorage after successful post
      localStorage.removeItem("post");
      router.push("/feeds");
    }
  }, [isSuccess, isPending, router]);

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

  const onSubmit = async (postInfo: any) => {
    try {
      // Validate image file
      if (!imageFile) {
        toast.error("Please select a featured image");
        return;
      }

      // Validate required fields
      if (!postInfo.title || !content) {
        toast.error("Title and content are required");
        return;
      }

      const formData = new FormData();
      postInfo.isPremium = postInfo?.isPremium === "true";

      const postData = {
        ...postInfo,
        details: content,
        user: user?.userId,
      };

      formData.append("data", JSON.stringify(postData));
      formData.append("file", imageFile);

      handleCreatePost(formData);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error creating post");
    }
  };

  return (
    <div className="max-w-7xl p-2  md:p-4  m-3 rounded-3xl border">
      <div>
        <h2 className="text-2xl font-semibold leading-snug text-center mb-4">
          Create Post
        </h2>
      </div>
      <Divider className="my-6" />
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
          <div className="w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed text-gray-400 cursor-pointer hover:bg-primary/10 transition-all overflow-hidden">
              {imagePreview ? (
                <img
                  alt="Preview Image"
                  src={imagePreview}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-lg font-semibold text-primary">
                  Click to upload image
                </span>
              )}
              <input
                type="file"
                name="image"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          <div className="w-full mx-auto p-2">
            <Button
              className="w-full rounded-none bg-primary-300"
              size="lg"
              type="submit"
            >
              Create
            </Button>
          </div>
        </div>
      </TTForm>
    </div>
  );
};

export default CreatePostPage;
