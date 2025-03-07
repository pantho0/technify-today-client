import { Button } from "@heroui/button";

import Image from "next/image";
import { Divider } from "@heroui/divider";
import { Heart, ThumbsDown } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";

import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import CommentCard from "@/src/components/ui/CommentCard";
import { PostComments } from "@/src/app/components/Post_Comments/PostComments";
import { Key } from "react";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { data } = await getSinglePost(params?.postId);

  console.log(data?.comments);

  const authorInfo = data?.user;
  const postData = data as IPost;

  return (
    <div className="container  px-4 py-8">
      <div className="space-y-8">
        <h2 className="text-4xl font-semibold leading-snug">
          {postData?.title}
        </h2>
        <Image
          alt={postData?.title}
          className="w-full h-[500px] object-cover rounded-lg"
          height={600}
          src={postData?.image}
          width={600}
        />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: postData?.details }}
        />

        <Divider className="my-4" />

        <div className="flex items-center gap-2 gap-2">
          <Tooltip className="rounded-full" content="Up vote">
            <Button className="rounded-full" color="primary" variant="flat">
              <Heart />
            </Button>
          </Tooltip>
          <Tooltip className="rounded-full" content="Down vote">
            <Button className="rounded-full" color="primary" variant="flat">
              <ThumbsDown />
            </Button>
          </Tooltip>
        </div>

        <div className="border-1 border-foreground/20 rounded-lg p-4">
          <div className="flex gap-4 border border-foreground/20 rounded-lg p-3">
            <div className="w-14 h-14">
              <Image
                alt="user"
                className="rounded-full"
                height={40}
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                width={40}
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <PostComments postId={data?._id} user={authorInfo?._id} />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4 h-[300px] overflow-y-auto">
            {data?.comments?.length > 0 ? (
              data?.comments?.map((comment: string) => (
                <CommentCard key={comment?._id} comment={comment} />
              ))
            ) : (
              <p>No body commented yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
