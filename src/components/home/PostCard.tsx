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
import PostSetttings from "../PostSetttings";

const PostCard = ({ post }: { post: IPost }) => {
  const { user } = useUser();
  if (user?.userId === post.user._id) {
    console.log("my post");
  }
  return (
    <Card className="">
      <CardBody className="overflow-visible">
        <div className="space-y-6">
          <Link href={`/posts/${post._id}`}>
            <img
              className="rounded-md w-full h-[250px] object-cover"
              src={post.image}
              alt={post.title}
            />
          </Link>

          {user?.userId === post.user._id && (
            <div className="absolute top-0 right-4">
              <PostSetttings />
            </div>
          )}

          <div className="bg-primary/30 inset-0 backdrop-blur-md inline-block px-3 py-1 rounded-md">
            <h3 className="inline-block text-primary text-[14px] font-semibold">
              <Link href={`/category/${post.category}`}>{post.category}</Link>
            </h3>
          </div>

          <div>
            <Link href={`/posts/${post._id}`} className="text-decoration-none">
              <p className="text-2xl font-semibold">{post.title}</p>
            </Link>
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
