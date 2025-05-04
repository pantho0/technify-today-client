"use client";

import PostCard from "@/src/components/home/PostCard";
import Loading from "@/src/components/ui/Loading";
import { useGetMe } from "@/src/hooks/auth.hooks";
import { IPost } from "@/src/types";
import { Divider } from "@heroui/divider";

import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import ChangePasswordModal from "../../../_components/modals/ChangePassword";
import UploadImageModal from "../../../_components/modals/UploadImageModal";
import { useGetMyPosts } from "@/src/hooks/post.hooks";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@heroui/pagination";
import PostSkeleton from "@/src/components/ui/PostSkeleton";

const ProfilePage = () => {
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const {
    mutate: handleGetMyPosts,
    data: myPostsData,
    isPending: isMyPostsPending,
    isSuccess: isMyPostsSuccess,
  } = useGetMyPosts();

  useEffect(() => {
    handleGetMyPosts(currentPage);
  }, [currentPage]);

  const posts = myPostsData?.data?.result;

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  return (
    <div className="border m-3 rounded-3xl">
      {isLoading ? (
        <Loading />
      ) : (
        <div
          ref={topRef}
          className="max-w-7xl mx-2 p-2  md:p-6  md:mx-6 rounded-xl"
        >
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

          <Divider className="my-4" />
        </div>
      )}
      <div className="max-w-7xl mx-2 md:mx-6 rounded-xl ">
        {isMyPostsPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-4 gap-4 my-6">
            {[...Array(9)].map((_, idx) => (
              <PostSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-4">
              {posts?.map((post: any) => (
                <PostCard key={post?._id} post={post} />
              ))}
            </div>
            <div className="flex justify-center my-6">
              <Pagination
                showControls
                onChange={(page: number) => {
                  setCurrentPage(page);
                }}
                initialPage={currentPage}
                total={myPostsData?.data?.meta?.totalPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
