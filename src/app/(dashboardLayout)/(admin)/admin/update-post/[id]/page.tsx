"use client";

import Tiptap from "@/src/app/components/form/Tiptap";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import TTSelect from "@/src/components/form/TTSelect";
import Loading from "@/src/components/ui/Loading";
import { postCategories, postStatus } from "@/src/constants";
import { useUser } from "@/src/context/user.provider";
import { useUpdatePost } from "@/src/hooks/post.hooks";
import { updatePostSchema } from "@/src/schemas/login.validation";
import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const UpdatePost = () => {
  const { user } = useUser();
  const { mutate: handleUpdatePost, isLoading, isSuccess } = useUpdatePost();
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(true); // Track loading state
  const { id } = useParams<any>();
  const [post, setPost] = useState<any>(null);
  const [defaultValues, setDefaultValues] = useState({
    title: "",
    category: "",
    isPremium: null,
    content: "",
    image: null,
  });

  const handleLoadPost = async () => {
    try {
      setLoading(true);
      const { data } = await getSinglePost(id);
      setDefaultValues({
        title: data.title || "",
        category: data.category || "",
        isPremium: data.isPremium || null,
        content: data.details || "",
        image: data.image || null,
      });
      setContent(data.details || "");
      setImagePreview(data.image || "");
    } catch (error) {
      console.error("Failed to load post:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteImage = () => {
    setImageFile(null);
    setImagePreview("");
    setDefaultValues({
      ...defaultValues,
      image: null,
    });
  };

  const onSubmit = async (postInfo: IPost) => {
    try {
      // Validate image file
      if (!imageFile) {
        toast.error("Please select a featured image");
        return;
      }

      // Validate required fields
      if (
        !postInfo.title ||
        !content ||
        !postInfo?.isPremium ||
        !postInfo?.category
      ) {
        toast.error("Title, content, isPremium, and category are required");
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

      handleUpdatePost([formData, id]);

      if (isSuccess) {
        router.push("/");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error updating post");
    }
  };

  useEffect(() => {
    handleLoadPost();
  }, [id]);

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl  p-10  mx-6 my-6 rounded-xl border-dotted border-2">
      <div>
        <h2 className="text-2xl font-semibold leading-snug text-center mb-4">
          Update Post
        </h2>
      </div>
      <Divider className="my-6" />

      <TTForm
        resolver={zodResolver(updatePostSchema)}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      >
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
                  <div className="absolute top-2 right-2">
                    <Button isIconOnly onPress={handleDeleteImage}>
                      <Trash />
                    </Button>
                  </div>
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
