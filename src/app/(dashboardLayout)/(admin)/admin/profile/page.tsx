"use client";

import PostCard from "@/src/components/home/PostCard";
import Loading from "@/src/components/ui/Loading";
import { useGetMe } from "@/src/hooks/auth.hooks";
import { useGetMyPosts } from "@/src/hooks/post.hooks";
import { IPost } from "@/src/types";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import ChangePasswordModal from "../../../_components/modals/ChangePassword";
import UploadImageModal from "../../../_components/modals/UploadImageModal";

const ProfilePage = () => {
  const { data, isLoading } = useGetMe();
  const { data: posts, isLoading: isPostsLoading } = useGetMyPosts();

  const allPosts = posts?.data;

  const user = data?.data;

  return (
    <>
      {isLoading || isPostsLoading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-2 p-2  md:p-6  md:mx-6 my-6 rounded-xl border-dotted border-2">
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
            <ChangePasswordModal />
            <UploadImageModal />
          </div>

          <Divider className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-6">
            {[...allPosts].reverse().map((post: IPost) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
