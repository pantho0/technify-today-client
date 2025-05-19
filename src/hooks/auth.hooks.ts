import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  forgotPassword,
  getMe,
  loginUser,
  registerUser,
  resetPassword,
  socialLoginUser,
} from "../services/auth";

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: FieldValues) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User Logged In Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useSocialLogin = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["USER_SOCIAL_LOGIN"],
    mutationFn: async (userData: any) => await socialLoginUser(userData),
    onSuccess: () => {
      toast.success("User Logged In Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
      console.log(error?.message);
    },
  });
};

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData: FieldValues) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User Registered Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (passwordData: any) => await changePassword(passwordData),
    onSuccess: () => {
      toast.success("Password Changed Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useGetMe = () => {
  return useQuery<any, Error, any>({
    queryKey: ["USER_GET_ME"],
    queryFn: async () => await getMe(),
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (email: string) => await forgotPassword(email),
    onSuccess: () => {
      toast.success("Password Reset Link Sent Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (passwordData: any) => await resetPassword(passwordData),
    onSuccess: () => {
      toast.success("Password Reset Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};
