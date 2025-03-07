import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createComment, createPost } from "../services/post";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post Created Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useCreateComment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["COMMENT"],
    mutationFn: async (comment) => await createComment(comment),
    onSuccess: () => {
      toast.success("Commented Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};
