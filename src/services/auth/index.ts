"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      (await cookies()).set("accessToken", data.accessToken);
      (await cookies()).set("refreshToken", data.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
