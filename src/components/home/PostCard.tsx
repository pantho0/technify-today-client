/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
import { Card, CardBody, CardFooter } from "@heroui/card";
import { User } from "@heroui/user";
import moment from "moment";

import { IPost } from "@/src/types";

const PostCard = ({ post }: { post: IPost }) => {
  return (
    <Card className="py-4">
      <CardBody className="overflow-visible">
        <div className="space-y-6">
          <img
            className="rounded-md w-full h-[250px] object-cover"
            src={post.image}
            alt={post.title}
          />

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
