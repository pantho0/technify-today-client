import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";
import { Divider } from "@heroui/divider";
import { Heart, ThumbsDown } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";

import SidebarCard from "@/src/components/ui/SidebarCard";
import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import CommentCard from "@/src/components/ui/CommentCard";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { data } = await getSinglePost(params?.postId);

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
          alt={postData?.title}
          className="w-full h-[400px] object-cover rounded-lg"
          height={600}
          src={postData?.image}
          width={600}
        />
        <p>{postData?.details}</p>

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
              <div className="flex relative">
                <Input placeholder="Add a comment" size="lg" type="text" />
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2  "
                  color="primary"
                  size="md"
                  type="submit"
                  variant="solid"
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
