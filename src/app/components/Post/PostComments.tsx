"use client";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import { useUser } from "@/src/context/user.provider";

import { useCreateComment } from "@/src/hooks/post.hooks";
import { Button } from "@heroui/button";
import { Send } from "lucide-react";

export const PostComments = ({ postId }: { postId: string }) => {
  const { user } = useUser();

  const { mutate: postComment, isPending, isSuccess } = useCreateComment();

  const handleComment = async (comment: any) => {
    const commentData = {
      ...comment,
      postId,
      user: user?.userId,
    };
    postComment(commentData);
  };

  return (
    <div>
      <TTForm onSubmit={handleComment}>
        <div className="w-full">
          <TTInput name="comment" label="Add a comment" />
        </div>
        <div className="w-2">
          <Button
            className="absolute right-2 top-1/2 -translate-y-1/2"
            color="primary"
            isLoading={isPending}
            type="submit"
            variant="bordered"
            disabled={isPending}
          >
            <Send className="size-5" />
          </Button>
        </div>
      </TTForm>
    </div>
  );
};
