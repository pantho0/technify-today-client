import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import PostCard from "@/src/components/home/PostCard";
import getLatestPosts from "@/src/services/latestPosts";
import { IPost } from "@/src/types";

const FeedsPage = async () => {
  const { data: posts } = await getLatestPosts();

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

      <div className="grid grid-cols-1 w-2/4 mx-auto gap-10">
        {posts?.result?.map((post: IPost) => <PostCard post={post} />)}
      </div>
    </div>
  );
};

export default FeedsPage;
