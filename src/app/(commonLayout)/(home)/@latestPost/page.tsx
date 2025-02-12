import PostCard from "@/src/components/home/PostCard";
import getLatestPosts from "@/src/services/latestPosts";
import { Link } from "@heroui/link";

const LatestPost = async () => {
  const { data: posts } = await getLatestPosts();

  return (
    <div className="py-10 my-8">
      <div className="border-l-5 border-primary pl-2">
        <h1 className="text-2xl font-semibold ">Latest Post</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {posts?.result?.map((post) => (
          <Link href={`/posts/${post?._id}`} key={post?._id}>
            <PostCard key={post?._id} post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestPost;
