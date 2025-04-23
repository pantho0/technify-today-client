"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import PostCard from "@/src/components/home/PostCard";

import { IPost } from "@/src/types";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/src/services/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@heroui/spinner";

const FeedsPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isAllPostLoaded, setIsAllPostLoaded] = useState(false);

  const fetchPosts = async () => {
    if (isAllPostLoaded) return;
    const res = await getAllPosts(page);
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
    setPage((prev) => prev + 1);
  };

  const refreshPosts = async () => {
    const res = await getAllPosts(1);
    const freshPosts = res?.data?.result;

    if (!freshPosts || freshPosts.length === 0) {
      setPosts([]);
      setPage(2);
      setIsAllPostLoaded(true);
      setHasMore(false);
      return;
    }

    setPosts(freshPosts);
    setPage(2);
    setIsAllPostLoaded(false);
    setHasMore(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex justify-end w-2/4 mx-auto ">
        <Link href="/admin/create-post">
          <Button color="primary" radius="sm" size="md">
            Create Post
          </Button>
        </Link>
      </div>

      <div className="min-h-screen">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          refreshFunction={refreshPosts}
          pullDownToRefresh
          pullDownToRefreshThreshold={80}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
          loader={
            <div className="w-full flex justify-center py-4">
              <Spinner />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 my-4">
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={0.95}
        >
          <div className="grid grid-cols-1 w-2/4 mx-auto gap-10">
            {posts?.map((post: IPost) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default FeedsPage;
