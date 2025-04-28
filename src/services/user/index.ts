"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.put("/users/delete-user", { email });
    return data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const blockUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.put("/users/block-user", { email });
    return data;
  } catch (error) {
    throw new Error("Failed to block user");
  }
};

export const uploadProfileImage = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.put(
      "/users/update-profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message);
  }
};
