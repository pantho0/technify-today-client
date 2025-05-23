/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { User } from "@heroui/user";
import moment from "moment";

import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { Link } from "@heroui/link";
import PostSetttings from "../PostSetttings";

const PostCard = ({ post }: { post: IPost }) => {
  const { user } = useUser();
  return (
    <Card className="">
      <CardBody className="overflow-visible">
        <div className="space-y-4">
          <div className="w-full">
            <Link href={`/posts/${post._id}`}>
              <div className="w-full aspect-video overflow-hidden rounded-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </Link>
          </div>
          {user?.userId === post.user._id && (
            <div className="absolute top-0 right-4">
              <PostSetttings post={post?._id} />
            </div>
          )}
          <div className="bg-primary/30 inset-0 backdrop-blur-md inline-block px-2 py-1 rounded-md">
            <h3 className="inline-block text-primary font-semibold text-[12px] ">
              <Link href={`/category/${post.category}`}>
                {post.category.toUpperCase()}
              </Link>
            </h3>
          </div>

          <div>
            <Link href={`/posts/${post._id}`} className="text-decoration-none">
              <p className="font-semibold text-lg md:text-xl ">{post.title}</p>
            </Link>
          </div>
        </div>
      </CardBody>

      <CardFooter className="justify-between gap-1">
        <User
          className="avatarFontSize"
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
