import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blockUser, deleteUser, getUsers } from "../services/user";

export const useGetUsers = () => {
  return useQuery<any, Error, any>({
    queryKey: ["USER"],
    queryFn: async () => await getUsers(),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (email: string) => await deleteUser(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (email: string) => await blockUser(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
  });
};
