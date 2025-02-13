"use server";
import { envConfig } from "@/src/config/envConfig";

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
