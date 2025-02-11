import getLatestPosts from "@/src/services/latestPosts";

const LatestPost = async () => {
  const { data: posts } = await getLatestPosts();
  console.log(posts.result);
  return (
    <div className="py-10">
      <div className="border-l-5 border-primary pl-2">
        <h1 className="text-2xl font-semibold ">Latest Post</h1>
      </div>
    </div>
  );
};

export default LatestPost;
