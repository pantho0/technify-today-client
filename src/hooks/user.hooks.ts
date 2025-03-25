import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user";

export const useGetUsers = () => {
  return useQuery<any, Error, any>({
    queryKey: ["USER"],
    queryFn: async () => await getUsers(),
  });
};
