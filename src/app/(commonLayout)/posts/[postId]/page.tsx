import { Divider } from "@heroui/divider";

import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import CommentCard from "@/src/components/ui/CommentCard";
import { PostComments } from "@/src/app/components/Post/PostComments";
import { PostReaction } from "@/src/app/components/Post/PostReaction";
import { PostDetails } from "@/src/app/components/Post/PostDetails";
import PostCommentImageHolder from "@/src/app/components/Post/PostCommentImageHolder";
import { cookies } from "next/headers";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Info } from "lucide-react";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  const { data } = await getSinglePost(params?.postId);
  const postData = data as IPost;

  const isLoggedIn = Boolean(accessToken);

  return (
    <div className="container px-[2px]  md:px-4 py-8">
      <div className="space-y-8">
        <PostDetails postData={postData} />

        <Divider className="my-4" />

        <PostReaction postData={postData} />

        <div className="border-1 border-foreground/20 rounded-lg p-4">
          {isLoggedIn ? (
            <div className="flex gap-1 flex-row md:gap-4 border border-foreground/20 rounded-lg p-3">
              <div className="size-7 md:w-14 md:h-14">
                <PostCommentImageHolder />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <PostComments postId={data?._id} />
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-foreground/20 rounded-lg p-4 flex flex-row justify-center items-center gap-3 bg-background/50">
              <div className="flex items-center gap-2 text-foreground/70">
                <Info className="w-5 h-5 text-primary" />
                <p className="italic text-sm md:text-base text-center">
                  Please log in to comment on this post.
                </p>
              </div>
              <Link href={`/login?redirect=/posts/${params.postId}`}>
                <Button
                  variant="ghost"
                  className="w-full max-w-[200px] bg-primary"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}

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
