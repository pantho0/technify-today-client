import { ReactNode } from "react";

import { DashboardWrapper } from "./_components/layout/DashboardWrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
};

export default Layout;
