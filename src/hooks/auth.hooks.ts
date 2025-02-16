import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { loginUser, registerUser } from "../services/auth";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
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

export const useUserRegistration = () => {
  return useMutation({
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
