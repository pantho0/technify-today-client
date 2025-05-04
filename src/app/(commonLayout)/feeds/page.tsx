"use client";

import { Link } from "@heroui/link";
import { motion, useInView } from "framer-motion";

import PostCard from "@/src/components/home/PostCard";

import { IPost } from "@/src/types";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/src/services/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@heroui/spinner";
import { ArrowUp, FilePen, RefreshCw } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (pageNum = page) => {
    if (isAllPostLoaded || isLoading) return;

    setIsLoading(true);
    try {
      const res = await getAllPosts(pageNum, selectedCategories);
      const newPosts = res?.data?.result;

      if (!newPosts || newPosts.length === 0) {
        setIsAllPostLoaded(true);
        setHasMore(false);
        return;
      }

      setPosts((prev) => {
        if (pageNum === 1) {
          return newPosts;
        }

        const existingPosts = new Set(prev.map((post) => post._id));
        const filteredNewPosts = newPosts.filter(
          (post: any) => !existingPosts.has(post._id)
        );
        return [...prev, ...filteredNewPosts];
      });
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load more posts");
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex justify-end w-full mx-auto gap-2 ">
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
          pullDownToRefreshThreshold={90}
          pullDownToRefreshContent={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3>↓ Pull down to refresh</h3>
            </motion.div>
          }
          releaseToRefreshContent={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3>↑ Release to refresh</h3>
            </motion.div>
          }
          loader={
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center py-4"
            >
              <Spinner />
            </motion.div>
          }
          endMessage={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-gray-500 my-4"
            >
              <p><b>No more data to load!!</b></p>
            </motion.div>
          }
          scrollThreshold={0.8}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 max-w-2xl mx-auto gap-6"
          >
            {posts?.map((post: IPost, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="w-full"
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </InfiniteScroll>
      </div>

      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
          className="fixed bottom-10 right-10 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/80 transition"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </div>
  );
};

export default FeedsPage;
