import SidebarCard from "@/src/components/ui/SidebarCard";
import { getSinglePost } from "@/src/services/post";
import { IPost } from "@/src/types";
import Image from "next/image";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const { data } = await getSinglePost(params.postId);

  const authorInfo = data?.user;
  const postData = data as IPost;

  return (
    <div className="container flex  justify-between gap-14 mx-auto px-4 py-8">
      <div className="w-[350px]">
        <SidebarCard authorInfo={authorInfo} />
      </div>
      <div className="space-y-8 w-3/4">
        <h2 className="text-4xl font-semibold w-3/4 leading-snug">
          {postData?.title}
        </h2>
        <Image
          src={postData?.image}
          alt={postData?.title}
          width={600}
          height={600}
          className="w-full h-[400px] object-cover rounded-lg"
        />

        <p>{postData?.details}</p>
      </div>
    </div>
  );
};

export default PostDetailsPage;
