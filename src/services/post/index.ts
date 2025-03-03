"use server";
import { envConfig } from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";

export const getSinglePost = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.backendUrl}/posts/${id}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return await res.json();
};

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};
