"use client";
import { useUser } from "@/src/context/user.provider";
import { useAddDownvote, useAddUpvote } from "@/src/hooks/post.hooks";
import { IPost } from "@/src/types";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Heart, ThumbsDown } from "lucide-react";

export const PostReaction = ({ postData }: { postData: IPost }) => {
  const { user } = useUser();
  const { mutate: addUpvote, isPending: isPendingUpvote } = useAddUpvote();
  const { mutate: addDownvote, isPending: isPendingDownvote } =
    useAddDownvote();

  const handleUpVote = () => {
    const upVoteData = {
      postId: postData?._id,
      userId: user?.userId,
    };

    addUpvote(upVoteData);
  };

  const handleDownVote = () => {
    const downVoteData = {
      postId: postData?._id,
      userId: user?.userId,
    };
    addDownvote(downVoteData);
  };
  return (
    <div className="flex items-center gap-2 ">
      <Tooltip className="rounded-full" content="Up vote">
        <Button
          onPress={handleUpVote}
          className="rounded-full"
          color="primary"
          variant="flat"
          isLoading={isPendingUpvote}
        >
          {postData?.upVote?.length}
          <Heart />
        </Button>
      </Tooltip>
      <Tooltip className="rounded-full" content="Down vote">
        <Button
          onPress={handleDownVote}
          className="rounded-full"
          color="primary"
          variant="flat"
          isLoading={isPendingDownvote}
        >
          {postData?.downVote?.length}
          <ThumbsDown />
        </Button>
      </Tooltip>
    </div>
  );
};
