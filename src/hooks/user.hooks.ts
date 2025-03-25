import { useMutation } from "@tanstack/react-query";
import { getUsers } from "../services/user";

export const useGetUsers = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["USER"],
    mutationFn: async () => await getUsers(),
  });
};
