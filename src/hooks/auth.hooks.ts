import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { loginUser, registerUser } from "../services/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: FieldValues) => await loginUser(userData),
    onSuccess: () => {
      alert("User Logged In");
    },
    onError: () => {
      alert("Something went wrong");
    },
  });
};

export const useUserRegistration = () => {
  return useMutation({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData: FieldValues) => await registerUser(userData),
    onSuccess: () => {
      alert("User Registered");
    },
    onError: (error: any) => {
      alert(error?.message);
    },
  });
};
