/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { User } from "@heroui/user";
import moment from "moment";

import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { Edit, EllipsisVertical } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

const PostCard = ({ post }: { post: IPost }) => {
  const { user } = useUser();
  if (user?.userId === post.user._id) {
    console.log("my post");
  }
  return (
    <Card className="">
      <CardBody className="overflow-visible">
        <div className="space-y-6">
          <img
            className="rounded-md w-full h-[250px] object-cover"
            src={post.image}
            alt={post.title}
          />

          {user?.userId === post.user._id && (
            <div className="absolute top-0 right-4">
              <Link href="/xyz">
                <Button
                  isIconOnly
                  variant="flat"
                  className=" text-white bg-primary px-2 py-1 rounded-md"
                >
                  <EllipsisVertical className="size-40" />
                </Button>
              </Link>
            </div>
          )}

          <div className="bg-primary/30 inset-0 backdrop-blur-md inline-block px-3 py-1 rounded-md">
            <h3 className="inline-block text-primary text-[14px] font-semibold">
              {post.category}
            </h3>
          </div>

          <div>
            <p className="text-2xl font-semibold">{post.title}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-between">
        <User
          avatarProps={{
            src: post.user.profileImage,
          }}
          name={post.user.fullName}
        />
        <p>{moment(post.createdAt).format("LL")}</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
