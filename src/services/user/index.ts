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

export const deleteUser = async () => {
  try {
    const { data } = await axiosInstance.put("/users/delete-user");
    return data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
