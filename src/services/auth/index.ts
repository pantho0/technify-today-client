"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/AxiosInstance";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      (await cookies()).set("accessToken", data.data?.accessToken);
      (await cookies()).set("refreshToken", data.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logoutUser = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/create-user", userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }

  return {
    userId: decodedToken?.userId,
    role: decodedToken?.role,
    email: decodedToken?.email,
    iat: decodedToken?.iat,
    exp: decodedToken?.exp,
  };
};

export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changePassword = async (passwordData: any) => {
  try {
    const { data } = await axiosInstance.put(
      "/auth/change-password",
      passwordData
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error("Failed to get new access token");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", {
      email,
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPassword = async (passwordData: any) => {
  try {
    const { data } = await axiosInstance({
      url: "/auth/reset-password",
      method: "POST",
      data: passwordData,
      headers: {
        Authorization: `${passwordData.token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
