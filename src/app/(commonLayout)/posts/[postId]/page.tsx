import SidebarCard from "@/src/components/ui/SidebarCard";
import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";
import { type } from "./../../../../types/index";
import CommentCard from "@/src/components/ui/CommentCard";
import { Divider } from "@heroui/divider";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { data } = await getSinglePost(params.postId);

  const authorInfo = data?.user;
  const postData = data as IPost;

  return (
    <div className="container flex  justify-between gap-14 mx-auto px-4 py-8">
      <div className="w-[350px]">
        <SidebarCard authorInfo={authorInfo} />
      </div>
      <div className="space-y-8 w-3/4">
        <h2 className="text-4xl font-semibold w-3/4 leading-snug">
          {postData?.title}
        </h2>
        <Image
          src={postData?.image}
          alt={postData?.title}
          width={600}
          height={600}
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <p>{postData?.details}</p>

        <Divider className="my-4" />

        <div className="border-1 border-foreground/20 rounded-lg p-4">
          <div className="flex gap-4 border border-foreground/20 rounded-lg p-3">
            <div className="w-14 h-14">
              <Image
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex relative">
                <Input size="lg" type="text" placeholder="Add a comment" />
                <Button
                  color="primary"
                  type="submit"
                  size="md"
                  variant="solid"
                  className="absolute right-2 top-1/2 -translate-y-1/2  "
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-4 h-[300px] overflow-y-auto">
            {[...Array(5)].map((_, index) => (
              <CommentCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
