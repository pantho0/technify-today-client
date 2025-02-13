import SidebarCard from "@/src/components/ui/SidebarCard";
import { getSinglePost } from "@/src/services/post";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { data: postData } = await getSinglePost(params.postId);

  const authorInfo = postData?.user;

  return (
    <div className="container flex gap-10 mx-auto px-4 py-8">
      <div>
        <SidebarCard authorInfo={authorInfo} />
      </div>
      <div>there will be the full post</div>
    </div>
  );
};

export default PostDetailsPage;
