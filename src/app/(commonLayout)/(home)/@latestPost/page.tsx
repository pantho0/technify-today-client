import PostCard from "@/src/components/home/PostCard";
import getLatestPosts from "@/src/services/latestPosts";

const LatestPost = async () => {
  const { data: posts } = await getLatestPosts();

  return (
    <div className="py-10">
      <div className="border-l-5 border-primary pl-2">
        <h1 className="text-2xl font-semibold ">Latest Post</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.result?.map((post) => <PostCard key={post?._id} post={post} />)}
      </div>
    </div>
  );
};

export default LatestPost;
