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
import { useEffect, useState } from "react";
import { getMyPosts } from "@/src/services/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@heroui/spinner";

const ProfilePage = () => {
  const { data, isLoading } = useGetMe();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [isAllPostLoaded, setIsAllPostLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNum: number) => {
    try {
      const res = await getMyPosts(page);
      const newPosts = res?.data?.result;

      if (!newPosts || newPosts.length === 0) {
        setIsAllPostLoaded(true);
        setHasMore(false);
        return;
      }

      setPosts((prev) => {
        const existingPosts = new Set(prev.map((post) => post._id));
        const filteredNewPosts = newPosts.filter(
          (post: any) => !existingPosts.has(post._id)
        );
        return [...prev, ...filteredNewPosts];
      });

      setPage(pageNum + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  };

  const user = data?.data;

  useEffect(() => {
    setPage(1);
    setIsAllPostLoaded(false);
    setHasMore(true);
    setPosts([]);
    fetchPosts(1);
  }, []);

  return (
    <>
      {isLoading ? (
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
          <div>
            <InfiniteScroll
              dataLength={posts.length}
              next={() => fetchPosts(page)}
              hasMore={hasMore}
              refreshFunction={() => fetchPosts(page)}
              pullDownToRefreshThreshold={90}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8595; Pull down to refresh
                </h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8593; Release to refresh
                </h3>
              }
              loader={
                <div className="w-full flex justify-center py-4">
                  <Spinner />
                </div>
              }
              endMessage={
                <p className="text-center text-gray-500 my-4">
                  <b>No more data to load!!</b>
                </p>
              }
              scrollThreshold={0.7}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-6">
                {posts.map((post: IPost) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
