import Image from "next/image";
import { Divider } from "@heroui/divider";

import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import CommentCard from "@/src/components/ui/CommentCard";
import { PostComments } from "@/src/app/components/Post/PostComments";
import { PostReaction } from "@/src/app/components/Post/PostReaction";
import { PostDetails } from "@/src/app/components/Post/PostDetails";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { data } = await getSinglePost(params?.postId);

  const postData = data as IPost;

  return (
    <div className="container px-[2px]  md:px-4 py-8">
      <div className="space-y-8">
        <PostDetails postData={postData} />

        <Divider className="my-4" />

        <PostReaction postData={postData} />

        <div className="border-1 border-foreground/20 rounded-lg p-4">
          <div className="flex gap-1 flex-row md:gap-4 border border-foreground/20 rounded-lg p-3">
            <div className="size-7 md:w-14 md:h-14">
              <Image
                alt="user"
                className="rounded-full"
                height={40}
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                width={40}
              />
            </div>
            <div className="md:flex-1">
              <div className="relative">
                <PostComments postId={data?._id} />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4 h-[300px] overflow-y-auto">
            {data?.comments?.length > 0 ? (
              data?.comments?.map((comment: any) => (
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
