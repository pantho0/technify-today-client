import React from "react";

const PostDetailsPage = ({ params }: { params: { postId: string } }) => {
  return <p> Post details of {params.postId}</p>;
};

export default PostDetailsPage;
