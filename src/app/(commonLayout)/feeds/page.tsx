"use client";

import { Link } from "@heroui/link";

import PostCard from "@/src/components/home/PostCard";

import { IPost } from "@/src/types";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/src/services/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@heroui/spinner";
import {
  ArrowUp,
  FilePen,
  RefreshCw,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { PostFilterDropDown } from "@/src/components/ui/PostFilterDropDown";
import { toast } from "sonner";

const FeedsPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [revalidatePosts, setRevalidatePosts] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isAllPostLoaded, setIsAllPostLoaded] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [selectedCategories, setSelectecCategories] = useState<string[]>([]);

  const fetchPosts = async (pageNum = page) => {
    if (isAllPostLoaded) return;
    const res = await getAllPosts(page, selectedCategories);
    const newPosts = res?.data?.result;

    if (!newPosts || newPosts.length === 0) {
      setIsAllPostLoaded(true);
      setHasMore(false);
      return;
    }

    setPosts((prev) => {
      if (page === 1) {
        return newPosts;
      }

      const existingPosts = new Set(prev.map((post) => post._id));
      const filteredNewPosts = newPosts.filter(
        (post: any) => !existingPosts.has(post._id)
      );
      return [...prev, ...filteredNewPosts];
    });
    setPage((prev) => prev + 1);
  };

  const refreshPosts = async () => {
    setRevalidatePosts(true);
    const res = await getAllPosts(1, selectedCategories);
    const freshPosts = res?.data?.result;

    if (!freshPosts || freshPosts.length === 0) {
      setPosts([]);
      setPage(2);
      setIsAllPostLoaded(true);
      setHasMore(false);
      setRevalidatePosts(false);
      return;
    }
    toast.success("Latest Post Loaded");
    setPosts(freshPosts);
    setPage(2);
    setIsAllPostLoaded(false);
    setHasMore(true);
    setRevalidatePosts(false);
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    const refreshPostAfterFilterChange = async () => {
      const res = await getAllPosts(1, selectedCategories);
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

    refreshPostAfterFilterChange();
  }, [selectedCategories]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex justify-end w-2/4 mx-auto gap-2 ">
        <div className="border-primary-50 border-2 rounded-lg p-2 flex gap-2">
          <Link href="/admin/create-post">
            <Tooltip content="Create Post">
              <FilePen />
            </Tooltip>
          </Link>

          <div className="cursor-pointer">
            <PostFilterDropDown
              onSelectionChange={(keys) => {
                setSelectecCategories(keys);
                setPage(1);
                setPosts([]);
                setIsAllPostLoaded(false);
                setHasMore(true);
              }}
            />
          </div>

          <button className="text-primary" onClick={refreshPosts}>
            <Tooltip content="Refresh Post">
              <RefreshCw />
            </Tooltip>
          </button>
        </div>
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
              <b>No more data to load!!</b>
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

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-primary text-white rounded-full p-2 animate-pulse  shadow-lg hover:bg-primary/80 transition"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
};

export default FeedsPage;
