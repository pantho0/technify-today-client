"use server";
import { envConfig } from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

export const getAllPosts = async (page: Number = 1, filters: string[] = []) => {
  let queryParams = new URLSearchParams();
  queryParams.append("page", String(page));

  if (filters.length > 0) {
    filters.forEach((filter) => {
      queryParams.append("category", filter);
    });
  }

  let fetchOptions = {};
  fetchOptions = {
    next: {
      tags: ["refresh", "post"],
      revalidateTag: 60,
    },
  };

  const url = `${envConfig.backendUrl}/posts?${queryParams.toString() ? `${queryParams.toString()}` : ""}`;

  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error("Fetching failed");
  }
  return await res.json();
};

export const getMyPosts = async (page: number = 1) => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  queryParams.append("sort", "-createdAt");

  const res = await axiosInstance.get(
    `/posts/own-posts?${queryParams.toString()}`
  );
  return res.data;
};

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("post");
    revalidateTag("MY_POSTS");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message);
  }
};

export const updatePost = async (
  formData: FormData,
  id: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/update-post/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidateTag("post");
    revalidateTag("MY_POSTS");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to update post");
  }
};

export const deletePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.put(`/posts/delete-post/${id}`);
    revalidateTag("post");
    revalidateTag("MY_POSTS");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to delete post");
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
  console.log("inside", upvoteData);
  try {
    const { data } = await axiosInstance.put("/posts/upvote", upvoteData);
    revalidateTag("post");
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const addDownVote = async (downVoteData: IUpvote) => {
  try {
    const { data } = await axiosInstance.put("/posts/downvote", downVoteData);
    revalidateTag("post");
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const searchPost = async (searchTerm: string) => {
  try {
    const res = await axiosInstance.get(`/posts?searchTerm=${searchTerm}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to search posts");
  }
};
