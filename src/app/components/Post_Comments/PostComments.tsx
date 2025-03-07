"use client";
import TTForm from "@/src/components/form/TTForm";
import TTInput from "@/src/components/form/TTInput";
import { Button } from "@heroui/button";
import { Send } from "lucide-react";

export const PostComments = ({
  postId,
  user,
}: {
  postId: string;
  user: any;
}) => {
  const handleComment = async (comment: any) => {
    const commentData = {
      ...comment,
      postId,
      user,
    };
    console.log(commentData);
  };

  return (
    <div>
      <TTForm onSubmit={handleComment}>
        <div className="w-full">
          <TTInput name="comment" label="Add a comment" />
        </div>
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2  "
          color="primary"
          size="sm"
          type="submit"
          variant="ghost"
        >
          <Send />
        </Button>
      </TTForm>
    </div>
  );
};
