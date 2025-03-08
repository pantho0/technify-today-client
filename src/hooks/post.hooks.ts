import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addDownVote,
  addUpvote,
  createComment,
  createPost,
} from "../services/post";

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

export const useAddUpvote = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["ADD_UPVOTE"],
    mutationFn: async (upvoteData) => await addUpvote(upvoteData),
    onSuccess: () => {
      toast.success("Upvote Added Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useAddDownvote = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["ADD_DOWNSVOTE"],
    mutationFn: async (downVoteData) => await addDownVote(downVoteData),
    onSuccess: () => {
      toast.success("Downvote Added Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};
