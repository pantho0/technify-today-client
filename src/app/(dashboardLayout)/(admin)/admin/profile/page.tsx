"use client";

import PostCard from "@/src/components/home/PostCard";
import Loading from "@/src/components/ui/Loading";
import { useGetMe } from "@/src/hooks/auth.hooks";
import { useGetMyPosts } from "@/src/hooks/post.hooks";
import { IPost } from "@/src/types";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Verified, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import { use } from "react";

const ProfilePage = () => {
  const { data, isLoading } = useGetMe();
  const { data: posts, isLoading: isPostsLoading } = useGetMyPosts();

  const allPosts = posts?.data;

  console.log(allPosts);

  const user = data?.data;

  return (
    <>
      {isLoading || isPostsLoading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto p-10  mx-6 my-6 rounded-xl border-dotted border-2">
          <div className="flex items-center justify-center mb-4">
            <Image
              alt="user"
              className="rounded-full"
              height={120}
              src={user?.profileImage || null}
              width={120}
            />
          </div>
          <div>
            <p className="font-semibold text-2xl text-center">
              {user?.fullName}{" "}
              {user?.isPremium && (
                <VerifiedIcon className="inline text-blue-400" />
              )}
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <Button size="sm">Change Password</Button>
            <Button size="sm">Change Profile Picture</Button>
          </div>

          <Divider className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            {allPosts?.map((post: IPost) => (
              <Link key={post?._id} href={`/posts/${post?._id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
