import React from "react";

import PostSkeleton from "@/src/components/ui/PostSkeleton";

const loading = () => {
  return (
    <div className="grid grid-cols-1 w-2/4 mx-auto gap-10">
      {[...Array(8)].map((idx: any) => (
        <PostSkeleton key={idx} />
      ))}
    </div>
  );
};

export default loading;
