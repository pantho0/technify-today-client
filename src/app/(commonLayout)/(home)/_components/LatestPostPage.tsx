"use client";

import PostCard from "@/src/components/home/PostCard";
import PostSkeleton from "@/src/components/ui/PostSkeleton";
import { useLatestPost } from "@/src/hooks/post.hooks";
import { IPost } from "@/src/types";
import { Pagination } from "@heroui/pagination";
import { useEffect, useRef, useState } from "react";

const LatestPostPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaginate, setIspaginate] = useState(false);
  const {
    mutate: handleLoadPost,
    data,
    isPending,
    isSuccess,
  } = useLatestPost();

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleLoadPost(currentPage);
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    if (isSuccess && isPaginate && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIspaginate(false);
    }
  }, [isSuccess]);

  const posts = data?.data?.result;

  return (
    <div className="py-10 my-8">
      {isPending && !isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {[...Array(9)].map((_, idx) => (
            <PostSkeleton key={idx} />
          ))}
        </div>
      )}
      <div ref={topRef} className="border-l-5 border-primary pl-2">
        <h1 className="text-2xl font-semibold ">Latest Post</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {posts?.map((post: IPost) => <PostCard key={post._id} post={post} />)}
      </div>
      <div className="flex justify-center">
        <Pagination
          showControls
          onChange={(page: number) => {
            setCurrentPage(page), setIspaginate(true);
          }}
          initialPage={1}
          total={data?.data?.meta?.totalPage}
        />
      </div>
    </div>
  );
};

export default LatestPostPage;
