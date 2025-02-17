import { ReactNode } from "react";
import DashboardLayout from "./_components/layout/DashboardLayout";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default Layout;
