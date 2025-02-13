import PostCard from "@/src/components/home/PostCard";
import getLatestPosts from "@/src/services/latestPosts";
import { Button } from "@heroui/button";

const FeedsPage = async () => {
  const { data: posts } = await getLatestPosts();

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <Button>Create Post</Button>
      </div>

      <div className="grid grid-cols-1 w-3/5 mx-auto gap-10">
        {posts?.result?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedsPage;
