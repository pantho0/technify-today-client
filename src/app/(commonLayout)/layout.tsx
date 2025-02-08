import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <p>in the common</p>
      {children}
    </div>
  );
};

export default layout;
