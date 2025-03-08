"use server";
import { envConfig } from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getSinglePost = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ["comment", "post"],
    },
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

export const createComment = async (comment: any) => {
  try {
    const { data } = await axiosInstance.post("/comment", comment);
    revalidateTag("comment");
    return data;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
};

interface IUpvote {
  postId: string;
  userId: string;
}

export const addUpvote = async (upvoteData: IUpvote) => {
  try {
    const { data } = await axiosInstance.post("/posts/upvote", upvoteData);
    revalidateTag("post");
    return data;
  } catch (error) {
    throw new Error("Failed to add upvote");
  }
};

export const addDownVote = async (downVoteData: IUpvote) => {
  try {
    const { data } = await axiosInstance.post("/posts/downvote", downVoteData);
    revalidateTag("post");
    return data;
  } catch (error) {
    throw new Error("Failed to add downvote");
  }
};
