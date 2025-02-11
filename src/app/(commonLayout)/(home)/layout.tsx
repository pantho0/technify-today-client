import React from "react";

const layout = ({
  children,
  latestPost,
}: {
  children: React.ReactNode;
  latestPost: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {latestPost}
    </>
  );
};

export default layout;
