import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addDownVote,
  addUpvote,
  createComment,
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  searchPost,
  updatePost,
} from "../services/post";

export const useLatestPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["LATEST_POSTS"],
    mutationFn: async (page: Number) => await getAllPosts(page),
  });
};

export const useGetMyPosts = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["MY_POSTS"],
    mutationFn: async (page: number) => await getMyPosts(page),
  });
};

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

export const useUpdatePost = () => {
  return useMutation<any, Error, [FormData, string]>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ([postData, id]) => await updatePost(postData, id),
    onSuccess: () => {
      toast.success("Post Updated Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (id) => await deletePost(id),
    onSuccess: () => {
      toast.success("Post Deleted Successfully");
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

export const useSearchPost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["SEARCH_POST"],
    mutationFn: async (searchTerm: string) => await searchPost(searchTerm),
  });
};
