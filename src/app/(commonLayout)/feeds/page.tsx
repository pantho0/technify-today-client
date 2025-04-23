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

  console.log(posts);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    const res = await getAllPosts(page);
    const newPosts = res?.data?.result;

    if (!newPosts || newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prev) => [...prev, ...newPosts]);
    setPage((prev) => prev + 1);
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

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={
          <p className="text-center text-gray-500 my-4">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 w-2/4 mx-auto gap-10">
          {posts?.map((post: IPost, idx) => <PostCard key={idx} post={post} />)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FeedsPage;
