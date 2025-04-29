"use client";
import { useUser } from "@/src/context/user.provider";
import Image from "next/image";

const PostCommentImageHolder = () => {
  const { user } = useUser();
  return (
    <Image
      alt="user"
      className="rounded-full"
      height={40}
      src={user?.image}
      width={40}
    />
  );
};
export default PostCommentImageHolder;
