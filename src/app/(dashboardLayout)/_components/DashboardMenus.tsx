import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ReactNode } from "react";
import SidebarOptions from "./SidebarOptions";
import { userMenus } from "../constants/constants";

const DashboardMenus = () => {
  return (
    <div className="flex flex-col gap-2 p-5">
      <SidebarOptions links={userMenus} />
    </div>
  );
};

export default DashboardMenus;
